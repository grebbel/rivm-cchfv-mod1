/**
 * Enhanced SCORM Wrapper for Moodle
 * Supports SCORM 1.2 and SCORM 2004 (4th Edition)
 * Enhanced with better error handling, logging, and Moodle-specific optimizations
 * @version 2.1.1 - Fixed with recordInteraction function
 */

const SCORM = {
    // Core properties
    version: null,
    initialized: false,
    api: null,
    sessionStartTime: null,
    lastError: null,
    debugMode: false,
    
    // Configuration
    config: {
        maxAPISearchAttempts: 500,
        autoCommitInterval: 30000, // 30 seconds
        enableDebugLogging: true,
        strictErrorChecking: true,
        moodleCompatibilityMode: true
    },

    // Initialize SCORM connection
    init(enableDebug = false) {
        try {
            this.debugMode = enableDebug;
            this.log('🚀 Initializing SCORM wrapper...');
            
            // Find SCORM API
            this.api = this.findAPI(window);
            
            if (!this.api) {
                this.logError('SCORM API not found after exhaustive search');
                return false;
            }

            // Determine SCORM version and initialize
            if (this.api.Initialize) {
                // Try SCORM 2004 first
                if (this.api.Initialize('')) {
                    this.version = '2004';
                    this.initialized = true;
                    this.log('✅ SCORM 2004 API initialized successfully');
                } else if (this.api.LMSInitialize && this.api.LMSInitialize('')) {
                    // Fallback to SCORM 1.2
                    this.version = '1.2';
                    this.initialized = true;
                    this.log('✅ SCORM 1.2 API initialized successfully');
                }
            } else if (this.api.LMSInitialize && this.api.LMSInitialize('')) {
                // Direct SCORM 1.2 initialization
                this.version = '1.2';
                this.initialized = true;
                this.log('✅ SCORM 1.2 API initialized successfully');
            }

            if (this.initialized) {
                this.sessionStartTime = new Date();
                this.setupAutoCommit();
                this.setupUnloadHandlers();
                this.logSystemInfo();
                return true;
            } else {
                this.logError('Failed to initialize SCORM API');
                return false;
            }

        } catch (error) {
            this.logError('Exception during SCORM initialization:', error);
            return false;
        }
    },

    // Enhanced API finding with better cross-frame support
    findAPI(win) {
        let findAttempts = 0;
        const maxAttempts = this.config.maxAPISearchAttempts;
        
        this.log(`🔍 Searching for SCORM API (max attempts: ${maxAttempts})...`);
        
        // Search current window and parent frames
        while (findAttempts < maxAttempts) {
            findAttempts++;
            
            // Check for SCORM 2004 API first
            if (win.API_1484_11) {
                this.log(`✅ Found SCORM 2004 API in window after ${findAttempts} attempts`);
                return win.API_1484_11;
            }
            
            // Check for SCORM 1.2 API
            if (win.API) {
                this.log(`✅ Found SCORM 1.2 API in window after ${findAttempts} attempts`);
                return win.API;
            }
            
            // Move to parent window if available
            if (win.parent && win.parent !== win) {
                win = win.parent;
            } else {
                // Try searching in opener window (for popup scenarios)
                if (win.opener && findAttempts < 10) {
                    win = win.opener;
                } else {
                    break;
                }
            }
        }

        // Extended search in Moodle-specific locations
        if (this.config.moodleCompatibilityMode) {
            return this.findMoodleAPI(window);
        }

        this.log(`❌ SCORM API not found after ${findAttempts} attempts`);
        return null;
    },

    // Moodle-specific API search
    findMoodleAPI(win) {
        this.log('🔍 Searching for Moodle-specific SCORM API locations...');
        
        const moodlePaths = [
            'parent.API_1484_11',
            'parent.API',
            'top.API_1484_11', 
            'top.API',
            'opener.API_1484_11',
            'opener.API'
        ];

        for (const path of moodlePaths) {
            try {
                const api = this.getNestedProperty(win, path);
                if (api) {
                    this.log(`✅ Found SCORM API at ${path}`);
                    return api;
                }
            } catch (e) {
                // Silently continue - cross-frame access might be blocked
            }
        }

        return null;
    },

    // Helper function to get nested properties safely
    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, prop) => {
            return current && current[prop] ? current[prop] : null;
        }, obj);
    },

    // Enhanced getValue with error checking
    getValue(parameter) {
        if (!this.initialized || !this.api) {
            this.logError('Cannot get value - SCORM not initialized');
            return '';
        }

        try {
            let value = '';
            
            if (this.version === '2004') {
                value = this.api.GetValue(parameter);
                this.checkForError('GetValue');
            } else if (this.version === '1.2') {
                value = this.api.LMSGetValue(parameter);
                this.checkForError('LMSGetValue');
            }

            this.log(`📖 Get: ${parameter} = "${value}"`);
            return value || '';
            
        } catch (error) {
            this.logError(`Exception getting value for ${parameter}:`, error);
            return '';
        }
    },

    // Enhanced setValue with validation and error checking
    setValue(parameter, value, autoCommit = true) {
        if (!this.initialized || !this.api) {
            this.logError('Cannot set value - SCORM not initialized');
            return false;
        }

        try {
            // Validate parameter and value
            if (!this.validateParameter(parameter, value)) {
                return false;
            }

            let success = false;
            
            if (this.version === '2004') {
                success = this.api.SetValue(parameter, value.toString());
                this.checkForError('SetValue');
            } else if (this.version === '1.2') {
                success = this.api.LMSSetValue(parameter, value.toString());
                this.checkForError('LMSSetValue');
            }

            if (success && autoCommit) {
                this.commit();
            }

            this.log(`✏️ Set: ${parameter} = "${value}" (Success: ${success})`);
            return success;
            
        } catch (error) {
            this.logError(`Exception setting value for ${parameter}:`, error);
            return false;
        }
    },

    // Validate SCORM parameters
    validateParameter(parameter, value) {
        if (!parameter || typeof parameter !== 'string') {
            this.logError('Invalid parameter name');
            return false;
        }

        // Check parameter length limits
        if (this.version === '1.2') {
            if (parameter === 'cmi.suspend_data' && value.length > 4096) {
                this.logError('Suspend data exceeds SCORM 1.2 limit of 4096 characters');
                return false;
            }
        } else if (this.version === '2004') {
            if (parameter === 'cmi.suspend_data' && value.length > 64000) {
                this.logError('Suspend data exceeds SCORM 2004 limit of 64000 characters');
                return false;
            }
        }

        return true;
    },

    // Commit data to LMS
    commit() {
        if (!this.initialized || !this.api) {
            this.logError('Cannot commit - SCORM not initialized');
            return false;
        }

        try {
            let success = false;
            
            if (this.version === '2004') {
                success = this.api.Commit('');
                this.checkForError('Commit');
            } else if (this.version === '1.2') {
                success = this.api.LMSCommit('');
                this.checkForError('LMSCommit');
            }

            this.log(`💾 Commit: ${success ? 'Success' : 'Failed'}`);
            return success;
            
        } catch (error) {
            this.logError('Exception during commit:', error);
            return false;
        }
    },

    // Check for SCORM API errors
    checkForError(functionName) {
        if (!this.api) return;

        let errorCode = '';
        let errorMessage = '';

        try {
            if (this.version === '2004') {
                errorCode = this.api.GetLastError();
                if (errorCode && errorCode !== '0') {
                    errorMessage = this.api.GetErrorString(errorCode);
                    const diagnostics = this.api.GetDiagnostic(errorCode);
                    this.lastError = { code: errorCode, message: errorMessage, diagnostics };
                    this.logError(`SCORM Error in ${functionName}: ${errorCode} - ${errorMessage} (${diagnostics})`);
                }
            } else if (this.version === '1.2') {
                errorCode = this.api.LMSGetLastError();
                if (errorCode && errorCode !== '0') {
                    errorMessage = this.api.LMSGetErrorString(errorCode);
                    const diagnostics = this.api.LMSGetDiagnostic(errorCode);
                    this.lastError = { code: errorCode, message: errorMessage, diagnostics };
                    this.logError(`SCORM Error in ${functionName}: ${errorCode} - ${errorMessage} (${diagnostics})`);
                }
            }
        } catch (e) {
            this.logError(`Exception checking for errors after ${functionName}:`, e);
        }
    },

    // Record interaction for SCORM tracking
    recordInteraction(id, type, response, result, correctResponse) {
        if (!this.initialized) {
            this.log('Cannot record interaction - SCORM not initialized');
            return false;
        }

        try {
            const timestamp = new Date().toISOString();
            
            if (this.version === '2004') {
                // Find next available interaction index
                let interactionIndex = 0;
                while (this.getValue(`cmi.interactions.${interactionIndex}.id`)) {
                    interactionIndex++;
                }
                
                // Record interaction data
                this.setValue(`cmi.interactions.${interactionIndex}.id`, id, false);
                this.setValue(`cmi.interactions.${interactionIndex}.type`, type, false);
                this.setValue(`cmi.interactions.${interactionIndex}.learner_response`, response, false);
                this.setValue(`cmi.interactions.${interactionIndex}.result`, result, false);
                this.setValue(`cmi.interactions.${interactionIndex}.timestamp`, timestamp, false);
                
                if (correctResponse) {
                    this.setValue(`cmi.interactions.${interactionIndex}.correct_responses.0.pattern`, correctResponse, false);
                }
                
                // Commit all interaction data at once
                this.commit();
                
                this.log(`📝 Recorded interaction: ${id} = ${result}`);
                return true;
            } else {
                // SCORM 1.2 has limited interaction support
                this.log(`📝 Interaction logged: ${id} = ${result} (SCORM 1.2 - limited tracking)`);
                return true;
            }
        } catch (error) {
            this.logError('Error recording interaction:', error);
            return false;
        }
    },

    // High-level function to set completion status
    setCompletionStatus(status) {
        const validStatuses = {
            '1.2': ['completed', 'incomplete', 'failed', 'passed', 'browsed', 'not attempted'],
            '2004': ['completed', 'incomplete', 'not attempted', 'unknown']
        };

        if (!validStatuses[this.version].includes(status)) {
            this.logError(`Invalid completion status: ${status} for SCORM ${this.version}`);
            return false;
        }

        if (this.version === '1.2') {
            return this.setValue('cmi.core.lesson_status', status);
        } else {
            return this.setValue('cmi.completion_status', status);
        }
    },

    // Set success status (SCORM 2004 only)
    setSuccessStatus(status) {
        if (this.version !== '2004') {
            this.log('Success status only available in SCORM 2004');
            return false;
        }

        const validStatuses = ['passed', 'failed', 'unknown'];
        if (!validStatuses.includes(status)) {
            this.logError(`Invalid success status: ${status}`);
            return false;
        }

        return this.setValue('cmi.success_status', status);
    },

    // Set score with proper scaling
    setScore(raw, min = 0, max = 100, scaled = null) {
        let success = true;

        if (this.version === '1.2') {
            success &= this.setValue('cmi.core.score.raw', raw.toString());
            success &= this.setValue('cmi.core.score.min', min.toString());
            success &= this.setValue('cmi.core.score.max', max.toString());
        } else {
            success &= this.setValue('cmi.score.raw', raw.toString());
            success &= this.setValue('cmi.score.min', min.toString());
            success &= this.setValue('cmi.score.max', max.toString());
            
            // Calculate scaled score if not provided
            if (scaled === null) {
                scaled = ((raw - min) / (max - min));
            }
            success &= this.setValue('cmi.score.scaled', scaled.toString());
        }

        return success;
    },

    // Set progress measure (SCORM 2004 only)
    setProgress(progress) {
        if (this.version !== '2004') {
            // For SCORM 1.2, store in lesson_location as a workaround
            return this.setValue('cmi.core.lesson_location', `progress:${progress}`);
        }

        if (progress < 0 || progress > 1) {
            this.logError('Progress must be between 0 and 1');
            return false;
        }

        return this.setValue('cmi.progress_measure', progress.toString());
    },

    // Set session time
    setSessionTime(seconds) {
        if (!seconds || seconds < 0) return false;

        let timeString = '';
        
        if (this.version === '1.2') {
            // SCORM 1.2 uses HHHH:MM:SS.SS format
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            timeString = `${hours.toString().padStart(4, '0')}:${minutes.toString().padStart(2, '0')}:${Math.floor(secs).toString().padStart(2, '0')}.${Math.floor((secs % 1) * 100).toString().padStart(2, '0')}`;
        } else {
            // SCORM 2004 uses ISO 8601 duration format PT[n]H[n]M[n]S
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.round(seconds % 60);
            timeString = `PT${hours}H${minutes}M${secs}S`;
        }

        return this.setValue(this.version === '1.2' ? 'cmi.core.session_time' : 'cmi.session_time', timeString);
    },

    // Get/Set suspend data for course state persistence
    setSuspendData(data) {
        const jsonData = typeof data === 'object' ? JSON.stringify(data) : data.toString();
        return this.setValue(this.version === '1.2' ? 'cmi.suspend_data' : 'cmi.suspend_data', jsonData);
    },

    getSuspendData() {
        const data = this.getValue(this.version === '1.2' ? 'cmi.suspend_data' : 'cmi.suspend_data');
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    },

    // Set exit reason
    setExit(reason = 'normal') {
        const validReasons = {
            '1.2': ['time-out', 'suspend', 'logout', ''],
            '2004': ['timeout', 'suspend', 'logout', 'normal']
        };

        if (!validReasons[this.version].includes(reason)) {
            this.logError(`Invalid exit reason: ${reason} for SCORM ${this.version}`);
            return false;
        }

        return this.setValue(this.version === '1.2' ? 'cmi.core.exit' : 'cmi.exit', reason);
    },

    // Terminate SCORM session
    terminate(exit = 'normal') {
        if (!this.initialized || !this.api) {
            this.log('SCORM not initialized - nothing to terminate');
            return false;
        }

        try {
            // Update session time
            if (this.sessionStartTime) {
                const sessionSeconds = (new Date() - this.sessionStartTime) / 1000;
                this.setSessionTime(sessionSeconds);
            }

            // Set exit reason
            this.setExit(exit);

            // Final commit
            this.commit();

            // Terminate session
            let success = false;
            if (this.version === '2004') {
                success = this.api.Terminate('');
            } else if (this.version === '1.2') {
                success = this.api.LMSFinish('');
            }

            this.initialized = false;
            this.log(`🏁 SCORM session terminated: ${success ? 'Success' : 'Failed'}`);
            return success;

        } catch (error) {
            this.logError('Exception during termination:', error);
            return false;
        }
    },

    // Setup automatic commit interval
    setupAutoCommit() {
        if (this.config.autoCommitInterval > 0) {
            setInterval(() => {
                if (this.initialized) {
                    this.commit();
                    this.log('🔄 Auto-commit executed');
                }
            }, this.config.autoCommitInterval);
        }
    },

    // Setup event handlers for page unload
    setupUnloadHandlers() {
        const handleUnload = () => {
            this.terminate('normal');
        };

        window.addEventListener('beforeunload', handleUnload);
        window.addEventListener('unload', handleUnload);
        
        // Handle page hide for mobile devices
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.commit();
                this.setSuspendData({
                    lastActivity: new Date().toISOString(),
                    pageVisibility: 'hidden'
                });
            }
        });
    },

    // Log system information for debugging
    logSystemInfo() {
        this.log(`📊 SCORM System Info:
            Version: ${this.version}
            User Agent: ${navigator.userAgent}
            LMS: ${this.getValue(this.version === '1.2' ? 'cmi.core.student_name' : 'cmi.learner_name') ? 'Connected' : 'Unknown'}
            Course: ${this.getValue(this.version === '1.2' ? 'cmi.core.lesson_title' : 'cmi.title') || 'Unknown'}
        `);
    },

    // Enhanced logging
    log(message, level = 'info') {
        if (!this.config.enableDebugLogging && !this.debugMode) return;
        
        const timestamp = new Date().toISOString();
        const prefix = `[SCORM ${this.version || 'Unknown'}]`;
        
        switch (level) {
            case 'error':
                console.error(`${prefix} ${timestamp}: ${message}`);
                break;
            case 'warn':
                console.warn(`${prefix} ${timestamp}: ${message}`);
                break;
            default:
                console.log(`${prefix} ${timestamp}: ${message}`);
        }
    },

    logError(message, error = null) {
        this.log(`❌ ${message}${error ? ' - ' + error.toString() : ''}`, 'error');
    },

    // Utility methods for common operations
    isScormAvailable() {
        return this.initialized && this.api !== null;
    },

    getLastError() {
        return this.lastError;
    },

    getVersion() {
        return this.version;
    },

    getStudentInfo() {
        if (!this.initialized) return null;

        const info = {
            name: this.getValue(this.version === '1.2' ? 'cmi.core.student_name' : 'cmi.learner_name'),
            id: this.getValue(this.version === '1.2' ? 'cmi.core.student_id' : 'cmi.learner_id')
        };

        return info;
    },

    // Debug utilities
    dumpAllData() {
        if (!this.initialized) {
            this.log('Cannot dump data - SCORM not initialized');
            return;
        }

        const commonElements = this.version === '1.2' ? [
            'cmi.core.student_name',
            'cmi.core.student_id',
            'cmi.core.lesson_title',
            'cmi.core.lesson_status',
            'cmi.core.score.raw',
            'cmi.core.score.max',
            'cmi.core.score.min',
            'cmi.core.session_time',
            'cmi.core.total_time',
            'cmi.suspend_data'
        ] : [
            'cmi.learner_name',
            'cmi.learner_id', 
            'cmi.title',
            'cmi.completion_status',
            'cmi.success_status',
            'cmi.score.raw',
            'cmi.score.max',
            'cmi.score.min',
            'cmi.score.scaled',
            'cmi.progress_measure',
            'cmi.session_time',
            'cmi.total_time',
            'cmi.suspend_data'
        ];

        this.log('📋 SCORM Data Dump:');
        commonElements.forEach(element => {
            const value = this.getValue(element);
            this.log(`  ${element}: "${value}"`);
        });
    }
};

// Global convenience functions for backward compatibility
window.scormAPI = SCORM;
window.scormInit = () => SCORM.init();
window.scormSetValue = (param, value) => SCORM.setValue(param, value);
window.scormGetValue = (param) => SCORM.getValue(param);
window.scormCommit = () => SCORM.commit();
window.scormTerminate = () => SCORM.terminate();
window.scormSetComplete = () => SCORM.setCompletionStatus('completed');
window.scormSetScore = (score, min, max) => SCORM.setScore(score, min, max);
window.scormSetProgress = (progress) => SCORM.setProgress(progress);

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all frames are loaded
    setTimeout(() => {
        const initialized = SCORM.init(true);
        
        if (initialized) {
            // Fire custom event for other scripts
            const event = new CustomEvent('scormReady', { 
                detail: { 
                    version: SCORM.getVersion(),
                    student: SCORM.getStudentInfo()
                }
            });
            window.dispatchEvent(event);
        }
    }, 100);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SCORM;
}

// Also handle immediate execution for some LMS environments
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => SCORM.init(true), 50);
}
