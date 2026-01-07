document.addEventListener('DOMContentLoaded', () => {

     // 🆕 ADD: SCORM Progress Tracking


let courseProgress = {
    chaptersVisited: new Set(),
    totalChapters: 5, // Updated to match actual chapter count after removing Epidemiology
    quizzesCompleted: { 
        quiz1: false, 
        rtExercise: false, 
        multiplexExercise: false,
        troubleshootingQuiz1: false,
        troubleshootingQuiz2: false
    },
    startTime: new Date(),
    interactions: [],
    bookmarks: [],
    sessionData: {
        loginTime: new Date().toISOString(),
        timeSpent: 0,
        pagesVisited: 0
    }
};
    // Initialize SCORM
    if (window.scormAPI && window.scormAPI.isScormAvailable()) {
        console.log('✅ SCORM tracking active');
        window.scormSetProgress(0);
    }

    // Chapter Navigation Logic
    const chapterItems = document.querySelectorAll('.chapter-item');
    const contentSections = document.querySelectorAll('.content-section');

    chapterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all chapters and sections
            chapterItems.forEach(chapter => chapter.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked chapter
            this.classList.add('active');
            
            // Get and show corresponding content section
            const tabId = this.dataset.tab;
            const targetSection = document.getElementById(tabId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Track chapter visits
                if (typeof courseProgress !== 'undefined') {
                    courseProgress.chaptersVisited.add(tabId);
                    if (typeof updateCourseProgress === 'function') {
                        updateCourseProgress();
                    }
                }
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });




        // PCR Interactive Slides
        const slides = document.querySelectorAll('#pcr-principle .slide');
        const totalSlides = slides.length;
        let currentSlide = 0;
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressFill = document.getElementById('progressFill');
        const stepCounter = document.getElementById('stepCounter');

        function updateSlide() {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');
            const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
            progressFill.style.width = progressPercent + '%';
            stepCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }

        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlide();
            }
        }

        function previousSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlide();
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', previousSlide);
        }

        document.addEventListener('keydown', (e) => {
            const activeChapter = document.querySelector('.chapter-item.active');
            if (activeChapter && activeChapter.dataset.tab === 'pcr-principle') {
                if (e.key === 'ArrowLeft') {
                    previousSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            }
        });

        if (slides.length > 0) {
            updateSlide();
        }

        // Real-time PCR Slides
        const rtpcrSlides = document.querySelectorAll('#realtime-pcr .slide');
        const rtpcrTotalSlides = rtpcrSlides.length;
        let rtpcrCurrentSlide = 0;
        const rtpcrPrevBtn = document.getElementById('rtpcrPrevBtn');
        const rtpcrNextBtn = document.getElementById('rtpcrNextBtn');
        const rtpcrProgressFill = document.getElementById('rtpcrProgressFill');
        const rtpcrStepCounter = document.getElementById('rtpcrStepCounter');

        function updateRtpcrSlide() {
            if (rtpcrSlides.length === 0) return;
            rtpcrSlides.forEach(slide => slide.classList.remove('active'));
            if (rtpcrSlides[rtpcrCurrentSlide]) {
                rtpcrSlides[rtpcrCurrentSlide].classList.add('active');
            }
            const progressPercent = ((rtpcrCurrentSlide + 1) / rtpcrTotalSlides) * 100;
            if (rtpcrProgressFill) {
                rtpcrProgressFill.style.width = progressPercent + '%';
            }
            if (rtpcrStepCounter) {
                rtpcrStepCounter.textContent = `${rtpcrCurrentSlide + 1} / ${rtpcrTotalSlides}`;
            }
            if (rtpcrPrevBtn) {
                rtpcrPrevBtn.disabled = rtpcrCurrentSlide === 0;
            }
            if (rtpcrNextBtn) {
                rtpcrNextBtn.disabled = rtpcrCurrentSlide === rtpcrTotalSlides - 1;
            }
        }

        function nextRtpcrSlide() {
            if (rtpcrCurrentSlide < rtpcrTotalSlides - 1) {
                rtpcrCurrentSlide++;
                updateRtpcrSlide();
            }
        }

        function previousRtpcrSlide() {
            if (rtpcrCurrentSlide > 0) {
                rtpcrCurrentSlide--;
                updateRtpcrSlide();
            }
        }

        if (rtpcrNextBtn) {
            rtpcrNextBtn.addEventListener('click', nextRtpcrSlide);
        }
        if (rtpcrPrevBtn) {
            rtpcrPrevBtn.addEventListener('click', previousRtpcrSlide);
        }

        document.addEventListener('keydown', (e) => {
            const activeChapter = document.querySelector('.chapter-item.active');
            if (activeChapter && activeChapter.dataset.tab === 'realtime-pcr') {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    previousRtpcrSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextRtpcrSlide();
                }
            }
        });

        if (rtpcrSlides.length > 0) {
            updateRtpcrSlide();
        }

        // TaqMan Slides
        const taqmanSlides = document.querySelectorAll('#taqman-probe .slide');
        const taqmanTotalSlides = taqmanSlides.length;
        let taqmanCurrentSlide = 0;
        const taqmanPrevBtn = document.getElementById('taqmanPrevBtn');
        const taqmanNextBtn = document.getElementById('taqmanNextBtn');
        const taqmanProgressFill = document.getElementById('taqmanProgressFill');
        const taqmanStepCounter = document.getElementById('taqmanStepCounter');

        function updateTaqmanSlide() {
            if (taqmanSlides.length === 0) return;
            taqmanSlides.forEach(slide => slide.classList.remove('active'));
            if (taqmanSlides[taqmanCurrentSlide]) {
                taqmanSlides[taqmanCurrentSlide].classList.add('active');
            }
            const progressPercent = ((taqmanCurrentSlide + 1) / taqmanTotalSlides) * 100;
            if (taqmanProgressFill) {
                taqmanProgressFill.style.width = progressPercent + '%';
            }
            if (taqmanStepCounter) {
                taqmanStepCounter.textContent = `${taqmanCurrentSlide + 1} / ${taqmanTotalSlides}`;
            }
            if (taqmanPrevBtn) {
                taqmanPrevBtn.disabled = taqmanCurrentSlide === 0;
            }
            if (taqmanNextBtn) {
                taqmanNextBtn.disabled = taqmanCurrentSlide === taqmanTotalSlides - 1;
            }
        }

        function nextTaqmanSlide() {
            if (taqmanCurrentSlide < taqmanTotalSlides - 1) {
                taqmanCurrentSlide++;
                updateTaqmanSlide();
            }
        }

        function previousTaqmanSlide() {
            if (taqmanCurrentSlide > 0) {
                taqmanCurrentSlide--;
                updateTaqmanSlide();
            }
        }

        if (taqmanNextBtn) {
            taqmanNextBtn.addEventListener('click', nextTaqmanSlide);
        }
        if (taqmanPrevBtn) {
            taqmanPrevBtn.addEventListener('click', previousTaqmanSlide);
        }

        document.addEventListener('keydown', (e) => {
            const activeChapter = document.querySelector('.chapter-item.active');
            if (activeChapter && activeChapter.dataset.tab === 'taqman-probe') {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    previousTaqmanSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextTaqmanSlide();
                }
            }
        });

        if (taqmanSlides.length > 0) {
            updateTaqmanSlide();
        }

        // Troubleshooting Dashboard Functionality
        const troubleshootingDashboardBtn = document.getElementById('troubleshootingDashboardBtn');
        const troubleshootingDashboard = document.getElementById('troubleshootingDashboard');

        if (troubleshootingDashboardBtn && troubleshootingDashboard) {
            troubleshootingDashboardBtn.addEventListener('click', function() {
                // Toggle dashboard visibility
                if (troubleshootingDashboard.classList.contains('active')) {
                    // Hide dashboard
                    troubleshootingDashboard.classList.remove('active');
                    troubleshootingDashboardBtn.textContent = 'Continue to troubleshooting dashboard';
                
                    // Scroll back to button
                    troubleshootingDashboardBtn.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                } else {
                    // Show dashboard
                    troubleshootingDashboard.classList.add('active');
                    troubleshootingDashboardBtn.textContent = 'Hide troubleshooting dashboard';
                
                    // Scroll to dashboard with slight delay to allow animation
                    setTimeout(() => {
                        troubleshootingDashboard.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 100);
                }
            });
        }

        // Quiz Functionality
        const quiz1Form = document.getElementById('quiz1Form');
        const quiz1Feedback = document.getElementById('quiz1Feedback');
        const quiz1Status = document.getElementById('quiz1Status');
        const quiz1Score = document.getElementById('quiz1Score');
        const submitBtn = document.getElementById('submitQuiz1');
        const retryBtn = document.getElementById('retryQuiz1');

        let quizData = {
            quiz1: {
                attempts: 0,
                completed: false,
                score: 0,
                correctAnswer: 'd',
                startTime: null,
                endTime: null
            }
        };

        function reportToLMS(quizId, score, completion) {
            if (typeof window.API !== 'undefined') {
                window.API.LMSSetValue('cmi.core.score.raw', score);
                window.API.LMSSetValue('cmi.core.lesson_status', completion ? 'completed' : 'incomplete');
                window.API.LMSCommit('');
            } else if (typeof window.API_1484_11 !== 'undefined') {
                window.API_1484_11.SetValue('cmi.score.raw', score);
                window.API_1484_11.SetValue('cmi.completion_status', completion ? 'completed' : 'incomplete');
                window.API_1484_11.Commit('');
            } else {
                const lmsData = {
                    quizId: quizId,
                    score: score,
                    completion: completion,
                    timestamp: new Date().toISOString()
                };
                try {
                    const existingData = JSON.parse(localStorage.getItem('pcr_course_data') || '[]');
                    existingData.push(lmsData);
                    localStorage.setItem('pcr_course_data', JSON.stringify(existingData));
                } catch (e) {
                    console.log('LMS data storage not available');
                }
            }
        }

    // REPLACE the Quiz 1 functionality section in script.js with this corrected version:

    if (quiz1Form) {
        quiz1Form.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedAnswer = document.querySelector('input[name="quiz1Answer"]:checked');
            if (!selectedAnswer) {
                alert('Please select an answer before submitting.');
                return;
            }
        
            // Increment attempts and store end time
            quizData.quiz1.attempts++;
            quizData.quiz1.endTime = new Date();
        
            // Check if this is a retry and reset previous visual states if needed
            // FIXED: Only target quiz1 options, not all quiz options
            const previousFeedback = quiz1Form.querySelectorAll('.quiz-option.correct, .quiz-option.incorrect');
            previousFeedback.forEach(option => {
                option.classList.remove('correct', 'incorrect');
                const indicator = option.querySelector('.option-indicator');
                if (indicator) {
                    indicator.textContent = '';
                }
            });
        
            const userAnswer = selectedAnswer.value;
            const isCorrect = userAnswer === quizData.quiz1.correctAnswer;
        
            // FIXED: Only target options within quiz1Form, not all options
            const allOptions = quiz1Form.querySelectorAll('.quiz-option');
            allOptions.forEach(option => {
                option.classList.add('disabled');
                const input = option.querySelector('input');
                input.disabled = true;
            
                const indicator = option.querySelector('.option-indicator');
                if (input.value === quizData.quiz1.correctAnswer) {
                    option.classList.add('correct');
                    indicator.textContent = '✓';
                } else if (input.checked && input.value !== quizData.quiz1.correctAnswer) {
                    option.classList.add('incorrect');
                    indicator.textContent = '✗';
                }
            });
        
            quiz1Feedback.style.display = 'block';
            const feedbackIcon = quiz1Feedback.querySelector('.feedback-icon');
            const feedbackTitle = quiz1Feedback.querySelector('.feedback-title');
        
            if (isCorrect) {
                feedbackIcon.classList.add('correct');
                feedbackIcon.textContent = '✓';
                feedbackTitle.textContent = 'Correct!';
                quiz1Status.textContent = 'Completed';
                quiz1Status.classList.add('completed');
                quizData.quiz1.score = 100;
                quizData.quiz1.completed = true;
                // ADD: SCORM tracking
                courseProgress.quizzesCompleted.quiz1 = true;
                addToScore(100); // Add points to overall course score
                if (window.scormAPI) {
                    window.scormAPI.recordInteraction('quiz1', 'choice', userAnswer, 'correct', quizData.quiz1.correctAnswer);
                }
                updateCourseProgress();
                addToScore(100);
                quiz1Score.style.display = 'block';
                quiz1Score.querySelector('.score-value').textContent = '100%';
            } else {
                feedbackIcon.classList.add('incorrect');
                feedbackIcon.textContent = '✗';
                feedbackTitle.textContent = 'Incorrect. The correct answer is highlighted above.';
                quiz1Status.textContent = 'Failed';
                quiz1Status.classList.add('failed');
                quizData.quiz1.score = 0;
                quiz1Score.style.display = 'block';
                quiz1Score.querySelector('.score-value').textContent = '0%';
                retryBtn.style.display = 'inline-block';
            }
        
            submitBtn.style.display = 'none';
            reportToLMS('quiz1', quizData.quiz1.score, quizData.quiz1.completed);
            quiz1Feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    if (retryBtn) {
        retryBtn.addEventListener('click', function() {
            // FIXED: Only target options within quiz1Form
            const allOptions = quiz1Form.querySelectorAll('.quiz-option');
            allOptions.forEach(option => {
                // Remove all state classes
                option.classList.remove('disabled', 'correct', 'incorrect', 'selected');
            
                // Reset input state
                const input = option.querySelector('input');
                if (input) {
                    input.disabled = false;
                    input.checked = false;
                }
            
                // Reset indicator
                const indicator = option.querySelector('.option-indicator');
                if (indicator) {
                    indicator.textContent = '';
                    indicator.style.display = 'none';
                }
            
                // Remove any custom styles
                option.style.backgroundColor = '';
                option.style.borderColor = '';
            });
        
            quiz1Feedback.style.display = 'none';
            quiz1Status.textContent = 'Not Started';
            quiz1Status.classList.remove('completed', 'failed');
            quiz1Score.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            retryBtn.style.display = 'none';
            quizData.quiz1.startTime = new Date();
            quiz1Form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }



        document.querySelectorAll('input[name="quiz1Answer"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (!quizData.quiz1.startTime) {
                    quizData.quiz1.startTime = new Date();
                    quiz1Status.textContent = 'In Progress';
                }
            });
        });

        // Reverse Transcriptase Exercise Functionality
        const rtExerciseForm = document.getElementById('rtExerciseForm');
        const rtExerciseFeedback = document.getElementById('rtExerciseFeedback');
        const rtExerciseStatus = document.getElementById('rtExerciseStatus');
        const rtExerciseScore = document.getElementById('rtExerciseScore');
        const submitRtExerciseBtn = document.getElementById('submitRtExercise');
        const retryRtExerciseBtn = document.getElementById('retryRtExercise');

        let rtExerciseData = {
            attempts: 0,
            completed: false,
            score: 0,
            correctAnswer: 'b',
            startTime: null,
            endTime: null
        };

    if (rtExerciseForm) {
        rtExerciseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedAnswer = document.querySelector('input[name="rtExerciseAnswer"]:checked');
            if (!selectedAnswer) {
                alert('Please select an answer before submitting.');
                return;
            }
            rtExerciseData.attempts++;
            rtExerciseData.endTime = new Date();
            const userAnswer = selectedAnswer.value;
            const isCorrect = userAnswer === rtExerciseData.correctAnswer;
        
            // FIXED: Only target inputs within rtExerciseForm
            const allRtInputs = rtExerciseForm.querySelectorAll('input[name="rtExerciseAnswer"]');
            allRtInputs.forEach(input => {
                const option = input.closest('.quiz-option');
                if (!option) return;
                option.classList.add('disabled');
                input.disabled = true;
                const indicator = option.querySelector('.option-indicator');
                if (!indicator) return;
                if (input.value === rtExerciseData.correctAnswer) {
                    option.classList.add('correct');
                    indicator.textContent = '✓';
                    indicator.style.display = 'flex';
                } else if (input.checked && input.value !== rtExerciseData.correctAnswer) {
                    option.classList.add('incorrect');
                    indicator.textContent = '✗';
                    indicator.style.display = 'flex';
                }
            });


                rtExerciseFeedback.style.display = 'block';
                const feedbackIcon = rtExerciseFeedback.querySelector('.feedback-icon');
                const feedbackTitle = rtExerciseFeedback.querySelector('.feedback-title');
                if (isCorrect) {
                    feedbackIcon.classList.add('correct');
                    feedbackIcon.textContent = '✓';
                    feedbackTitle.textContent = 'Correct!';
                    rtExerciseStatus.textContent = 'Completed';
                    rtExerciseStatus.classList.add('completed');
                    rtExerciseData.score = 100;
                    rtExerciseData.completed = true;
                    // 🆕 ADD: SCORM tracking
                    courseProgress.quizzesCompleted.rtExercise = true;
                    updateCourseProgress();
                    addToScore(100);
                    rtExerciseScore.style.display = 'block';
                    rtExerciseScore.querySelector('.score-value').textContent = '100%';
                } else {
                    feedbackIcon.classList.add('incorrect');
                    feedbackIcon.textContent = '✗';
                    feedbackTitle.textContent = 'Incorrect. The correct answer is highlighted above.';
                    rtExerciseStatus.textContent = 'Failed';
                    rtExerciseStatus.classList.add('failed');
                    rtExerciseData.score = 0;
                    rtExerciseScore.style.display = 'block';
                    rtExerciseScore.querySelector('.score-value').textContent = '0%';
                    retryRtExerciseBtn.style.display = 'inline-block';
                }
                submitRtExerciseBtn.style.display = 'none';
                reportToLMS('rtExercise', rtExerciseData.score, rtExerciseData.completed);
                rtExerciseFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        }
        if (retryRtExerciseBtn) {
            retryRtExerciseBtn.addEventListener('click', function() {

            const allRtInputs = rtExerciseForm.querySelectorAll('input[name="rtExerciseAnswer"]');
            allRtInputs.forEach(input => {
                const option = input.closest('.quiz-option');
                if (!option) return;
                option.classList.remove('disabled', 'correct', 'incorrect');
                input.disabled = false;
                input.checked = false;
                const indicator = option.querySelector('.option-indicator');
                if (indicator) {
                    indicator.textContent = '';
                    indicator.style.display = 'none';
                }
            });
                rtExerciseFeedback.style.display = 'none';
                rtExerciseStatus.textContent = 'Not Started';
                rtExerciseStatus.classList.remove('completed', 'failed');
                rtExerciseScore.style.display = 'none';
                submitRtExerciseBtn.style.display = 'inline-block';
                retryRtExerciseBtn.style.display = 'none';
                rtExerciseData.startTime = new Date();
                rtExerciseForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        document.querySelectorAll('input[name="rtExerciseAnswer"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (!rtExerciseData.startTime) {
                    rtExerciseData.startTime = new Date();
                    rtExerciseStatus.textContent = 'In Progress';
                }
            });
        });


    // ====================================
    // Fun Thermometer Score Tracking
    // ====================================
    let courseScore = 0;
    const maxScore = 540;

    const statusMessages = [
        { threshold: 0, message: "🌱 Just getting started!", color: "#ff6b6b" },
        { threshold: 10, message: "🚀 Off to a great start!", color: "#ff8a65" },
        { threshold: 25, message: "⭐ Making progress!", color: "#ffa726" },
        { threshold: 40, message: "🔥 You're on fire!", color: "#66bb6a" },
        { threshold: 60, message: "💪 Awesome work!", color: "#42a5f5" },
        { threshold: 80, message: "🏆 Almost there!", color: "#ab47bc" },
        { threshold: 95, message: "🎉 Perfect score!", color: "#9c27b0" }
    ];

    function updateThermometer() {
        const percentage = Math.round((courseScore / maxScore) * 100);
    
        // Update displays
        document.querySelector('.current-score').textContent = courseScore;
        document.getElementById('percentageDisplay').textContent = percentage + '%';
    
        // Update mercury fill
        const mercuryFill = document.getElementById('mercuryFill');
        const mercuryBulb = document.getElementById('mercuryBulb');
    
        mercuryFill.style.height = percentage + '%';
    
        // Update status message and colors
        let currentStatus = statusMessages[0];
        for (let status of statusMessages) {
            if (percentage >= status.threshold) {
                currentStatus = status;
            }
        }
    
        document.getElementById('statusMessage').textContent = currentStatus.message;
        mercuryBulb.style.backgroundColor = currentStatus.color;
    
        // Add bubble animation for scores above 50%
        if (percentage > 50) {
            mercuryBulb.classList.add('active');
        } else {
            mercuryBulb.classList.remove('active');
        }
    
        // Save score
        localStorage.setItem('courseScore', courseScore.toString());
    }

    function addToScore(points) {
        courseScore = Math.min(courseScore + points, maxScore); // Cap at max score
        updateThermometer();
    
        // Fun notification for score increases
        if (points > 0) {
            showScoreNotification(points);
        }
    }

    function showScoreNotification(points) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--rh-green) 0%, var(--rh-orange) 100%);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.5s ease, slideOut 0.5s ease 2s forwards;
        `;
        notification.textContent = `+${points} points! 🎉`;
    
        // Add animation keyframes if not already added
        if (!document.getElementById('score-animations')) {
            const style = document.createElement('style');
            style.id = 'score-animations';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Load saved score
    function loadSavedScore() {
        const saved = localStorage.getItem('courseScore');
        if (saved) {
            courseScore = parseInt(saved) || 0;
        }
        updateThermometer();
    }

    // Initialize thermometer
    loadSavedScore();


        // History Quiz Functionality
        const historyQuizQuestions = [
            {
                text: "1. Crimean‑Congo hemorrhagic fever (CCHF) is recognized as:",
                options: [
                    "A minor localized tick‑borne disease confined to Crimea",
                    "The most important tick‑borne viral disease affecting humans",
                    "A mosquito‑borne viral disease mainly in South America",
                    "A bacterial zoonosis limited to livestock"
                ],
                correctIndex: 1,
                feedback: "CCHF is described as the most important tick‑borne viral disease affecting humans, with a wide geographic range."
            },
            {
                text: "2. Which tick genus is most strongly associated with transmission of CCHFV?",
                options: [
                    "Ixodes",
                    "Amblyomma",
                    "Hyalomma",
                    "Rhipicephalus"
                ],
                correctIndex: 2,
                feedback: "Module 1 highlights Hyalomma ticks as both vector and reservoir in the tick‑vertebrate‑tick cycle."
            },
            {
                text: "3. Which statement best reflects the current global concern about CCHF?",
                options: [
                    "The virus has been eradicated in all endemic regions",
                    "CCHF is monitored globally, with concern about spread into new regions as climate change alters tick distribution",
                    "CCHF is now limited to a few islands in the Pacific",
                    "CCHF only occurs in hospital settings"
                ],
                correctIndex: 1,
                feedback: "The module mentions global monitoring and concern about CCHF appearing in new geographical regions, including potential spread into western Europe."
            }
        ];

        const historyQuizContainer = document.getElementById('historyQuizQuestions');
        const historyQuizForm = document.getElementById('historyQuizForm');
        const submitHistoryQuizBtn = document.getElementById('submitHistoryQuiz');
        const retryHistoryQuizBtn = document.getElementById('retryHistoryQuiz');
        const historyQuizFeedback = document.getElementById('historyQuizFeedback');

        // Render quiz questions
        if (historyQuizContainer) {
            historyQuizQuestions.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'quiz-question';
                questionDiv.innerHTML = `
                    <p><strong>${question.text}</strong></p>
                    <div class="quiz-options">
                        ${question.options.map((option, optIndex) => `
                            <label class="quiz-option">
                                <input type="radio" name="historyQ${index}" value="${optIndex}">
                                <span class="option-text">${option}</span>
                                <span class="option-indicator"></span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="question-feedback" style="display: none; margin-top: 10px; padding: 10px; border-radius: 5px; font-size: 0.9em;"></div>
                `;
                historyQuizContainer.appendChild(questionDiv);
            });
        }

        // Submit quiz
        if (submitHistoryQuizBtn) {
            submitHistoryQuizBtn.addEventListener('click', function() {
                let totalCorrect = 0;
                const totalQuestions = historyQuizQuestions.length;

                // Check if all questions are answered
                let allAnswered = true;
                historyQuizQuestions.forEach((_, index) => {
                    const selected = document.querySelector(`input[name="historyQ${index}"]:checked`);
                    if (!selected) allAnswered = false;
                });

                if (!allAnswered) {
                    alert('Please answer all questions before submitting.');
                    return;
                }

                // Grade each question
                historyQuizQuestions.forEach((question, index) => {
                    const selected = document.querySelector(`input[name="historyQ${index}"]:checked`);
                    const questionDiv = document.querySelectorAll('.quiz-question')[index];
                    const feedbackDiv = questionDiv.querySelector('.question-feedback');
                    const options = questionDiv.querySelectorAll('.quiz-option');

                    if (selected) {
                        const userAnswer = parseInt(selected.value);
                        const isCorrect = userAnswer === question.correctIndex;

                        if (isCorrect) {
                            totalCorrect++;
                        }

                        // Mark all options
                        options.forEach((option, optIndex) => {
                            const input = option.querySelector('input');
                            input.disabled = true;
                            const indicator = option.querySelector('.option-indicator');

                            if (optIndex === question.correctIndex) {
                                option.classList.add('correct');
                                indicator.textContent = '✓';
                                indicator.style.display = 'inline';
                            } else if (optIndex === userAnswer && !isCorrect) {
                                option.classList.add('incorrect');
                                indicator.textContent = '✗';
                                indicator.style.display = 'inline';
                            }
                        });

                        // Show feedback
                        feedbackDiv.style.display = 'block';
                        feedbackDiv.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
                        feedbackDiv.style.color = isCorrect ? '#155724' : '#721c24';
                        feedbackDiv.style.border = isCorrect ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
                        feedbackDiv.innerHTML = `<strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong> ${question.feedback}`;
                    }
                });

                // Calculate score (25 points per correct answer)
                const score = totalCorrect * 25;
                const maxScore = totalQuestions * 25;
                const percentage = (score / maxScore) * 100;

                // Show feedback
                historyQuizFeedback.style.display = 'block';
                historyQuizFeedback.innerHTML = `
                    <h4 style="color: ${percentage >= 75 ? '#28a745' : '#dc3545'};">
                        Quiz Complete!
                    </h4>
                    <p>You scored <strong>${score} out of ${maxScore} points</strong> (${totalCorrect} out of ${totalQuestions} correct)</p>
                `;

                // Hide submit, show retry
                submitHistoryQuizBtn.style.display = 'none';
                retryHistoryQuizBtn.style.display = 'inline-block';

                // Add to course score
                addToScore(score);
                
                // Report to LMS
                reportToLMS('historyQuiz', score, percentage >= 75);
            });
        }

        // Retry quiz
        if (retryHistoryQuizBtn) {
            retryHistoryQuizBtn.addEventListener('click', function() {
                // Reset all questions
                document.querySelectorAll('.quiz-question').forEach((questionDiv, index) => {
                    const options = questionDiv.querySelectorAll('.quiz-option');
                    const feedbackDiv = questionDiv.querySelector('.question-feedback');
                    
                    options.forEach(option => {
                        const input = option.querySelector('input');
                        input.disabled = false;
                        input.checked = false;
                        option.classList.remove('correct', 'incorrect');
                        const indicator = option.querySelector('.option-indicator');
                        indicator.textContent = '';
                        indicator.style.display = 'none';
                    });
                    
                    feedbackDiv.style.display = 'none';
                });

                // Reset UI
                historyQuizFeedback.style.display = 'none';
                submitHistoryQuizBtn.style.display = 'inline-block';
                retryHistoryQuizBtn.style.display = 'none';
                
                // Scroll to quiz
                historyQuizForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }


        // Pathology Quiz Functionality
        const pathologyQuizQuestions = [
            {
                text: "Which of the following best describes the key determinant of clinical outcome of a patient with CCHF?",
                options: [
                    "A. The specific tick species responsible for viral transmission",
                    "B. The intrinsic virulence of the infecting CCHFV strain only",
                    "C. The magnitude and regulation of the patient immune response to infection",
                    "D. The presence of co-infection with other arboviruses"
                ],
                correctIndex: 2,
                feedback: "The key determinant of outcome in CCHF is the patient's immune response (rather than the extent of viral replication alone)."
            }
        ];

        const pathologyQuizContainer = document.getElementById('pathologyQuizQuestions');
        const pathologyQuizForm = document.getElementById('pathologyQuizForm');
        const submitPathologyQuizBtn = document.getElementById('submitPathologyQuiz');
        const retryPathologyQuizBtn = document.getElementById('retryPathologyQuiz');
        const pathologyQuizFeedback = document.getElementById('pathologyQuizFeedback');

        // Render quiz questions
        if (pathologyQuizContainer) {
            pathologyQuizQuestions.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'quiz-question';
                questionDiv.innerHTML = `
                    <p><strong>${question.text}</strong></p>
                    <div class="quiz-options">
                        ${question.options.map((option, optIndex) => `
                            <label class="quiz-option">
                                <input type="radio" name="pathologyQ${index}" value="${optIndex}">
                                <span class="option-text">${option}</span>
                                <span class="option-indicator"></span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="question-feedback" style="display: none; margin-top: 10px; padding: 10px; border-radius: 5px; font-size: 0.9em;"></div>
                `;
                pathologyQuizContainer.appendChild(questionDiv);
            });
        }

        // Submit quiz
        if (submitPathologyQuizBtn) {
            submitPathologyQuizBtn.addEventListener('click', function() {
                let totalCorrect = 0;
                const totalQuestions = pathologyQuizQuestions.length;

                // Check if all questions are answered
                let allAnswered = true;
                pathologyQuizQuestions.forEach((_, index) => {
                    const selected = document.querySelector(`input[name="pathologyQ${index}"]:checked`);
                    if (!selected) allAnswered = false;
                });

                if (!allAnswered) {
                    alert('Please answer the question before submitting.');
                    return;
                }

                // Grade each question
                pathologyQuizQuestions.forEach((question, index) => {
                    const selected = document.querySelector(`input[name="pathologyQ${index}"]:checked`);
                    const questionDiv = document.querySelectorAll('#pathologyQuizQuestions .quiz-question')[index];
                    const feedbackDiv = questionDiv.querySelector('.question-feedback');
                    const options = questionDiv.querySelectorAll('.quiz-option');

                    if (selected) {
                        const userAnswer = parseInt(selected.value);
                        const isCorrect = userAnswer === question.correctIndex;

                        if (isCorrect) {
                            totalCorrect++;
                        }

                        // Mark all options
                        options.forEach((option, optIndex) => {
                            const input = option.querySelector('input');
                            input.disabled = true;
                            const indicator = option.querySelector('.option-indicator');

                            if (optIndex === question.correctIndex) {
                                option.classList.add('correct');
                                indicator.textContent = '✓';
                                indicator.style.display = 'inline';
                            } else if (optIndex === userAnswer && !isCorrect) {
                                option.classList.add('incorrect');
                                indicator.textContent = '✗';
                                indicator.style.display = 'inline';
                            }
                        });

                        // Show feedback
                        feedbackDiv.style.display = 'block';
                        feedbackDiv.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
                        feedbackDiv.style.color = isCorrect ? '#155724' : '#721c24';
                        feedbackDiv.style.border = isCorrect ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
                        feedbackDiv.innerHTML = `<strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong> ${question.feedback}`;
                    }
                });

                // Calculate score (25 points per correct answer)
                const score = totalCorrect * 25;
                const maxScore = totalQuestions * 25;
                const percentage = (score / maxScore) * 100;

                // Show feedback
                pathologyQuizFeedback.style.display = 'block';
                pathologyQuizFeedback.innerHTML = `
                    <h4 style="color: ${percentage >= 75 ? '#28a745' : '#dc3545'};">
                        Quiz Complete!
                    </h4>
                    <p>You scored <strong>${score} out of ${maxScore} points</strong> (${totalCorrect} out of ${totalQuestions} correct)</p>
                `;

                // Hide submit, show retry
                submitPathologyQuizBtn.style.display = 'none';
                retryPathologyQuizBtn.style.display = 'inline-block';

                // Add to course score
                addToScore(score);
                
                // Report to LMS
                reportToLMS('pathologyQuiz', score, percentage >= 75);
            });
        }

        // Retry quiz
        if (retryPathologyQuizBtn) {
            retryPathologyQuizBtn.addEventListener('click', function() {
                // Reset all questions
                document.querySelectorAll('#pathologyQuizQuestions .quiz-question').forEach((questionDiv, index) => {
                    const options = questionDiv.querySelectorAll('.quiz-option');
                    const feedbackDiv = questionDiv.querySelector('.question-feedback');
                    
                    options.forEach(option => {
                        const input = option.querySelector('input');
                        input.disabled = false;
                        input.checked = false;
                        option.classList.remove('correct', 'incorrect');
                        const indicator = option.querySelector('.option-indicator');
                        indicator.textContent = '';
                        indicator.style.display = 'none';
                    });
                    
                    feedbackDiv.style.display = 'none';
                });

                // Reset UI
                pathologyQuizFeedback.style.display = 'none';
                submitPathologyQuizBtn.style.display = 'inline-block';
                retryPathologyQuizBtn.style.display = 'none';
                
                // Scroll to quiz
                pathologyQuizForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }


        // Biology Drag & Drop Quiz Functionality
        const biologyDragDropContainer = document.getElementById('biologyDragDropContainer');
        const submitBiologyDragDropBtn = document.getElementById('submitBiologyDragDrop');
        const retryBiologyDragDropBtn = document.getElementById('retryBiologyDragDrop');
        const biologyDragDropFeedback = document.getElementById('biologyDragDropFeedback');
        
        if (biologyDragDropContainer) {
            // Card configurations
            const cards = [
                { id: 'card2', image: 'images/pic_14_card2.png', correctZone: 2 },
                { id: 'card3', image: 'images/pic_15_card3.png', correctZone: 3 },
                { id: 'card4', image: 'images/pic_16_card4.png', correctZone: 4 },
                { id: 'card5', image: 'images/pic_17_card5.png', correctZone: 5 },
                { id: 'card6', image: 'images/pic_18_card6.png', correctZone: 6 },
                { id: 'card7', image: 'images/pic_19_card7.png', correctZone: 7 }
            ];

            // Drop zone coordinates (percentage-based for responsiveness)
            // Background image: 610px × 800px
            // Cards: 160px × 182px
            const dropZones = {
                2: { x: 70.66, y: 13.13, width: 26.23, height: 22.75 },
                3: { x: 70.66, y: 43.25, width: 26.23, height: 22.75 },
                4: { x: 57.87, y: 73.75, width: 26.23, height: 22.75 },
                5: { x: 17.21, y: 73.75, width: 26.23, height: 22.75 },
                6: { x: 3.77, y: 43.38, width: 26.23, height: 22.75 },
                7: { x: 3.77, y: 13.13, width: 26.23, height: 22.75 }
            };
            
            const centerStack = { x: 36.07, y: 37.50, width: 26.23, height: 22.75 };
            
            let touchStartX = 0;
            let touchStartY = 0;

            // Initialize the game
            function initGame() {
                const cycleBackground = document.getElementById('cycleBackground');
                const cardStack = document.getElementById('cardStack');
                
                // Clear existing cards
                cardStack.innerHTML = '';
                cardPositions = {};
                
                // Wait for background image to load
                if (!cycleBackground.complete) {
                    cycleBackground.addEventListener('load', setupGame);
                } else {
                    setupGame();
                }

                function setupGame() {
                    // Ensure proper positioning context
                    const gameContainer = document.querySelector('.drag-drop-game');
                    gameContainer.style.position = 'relative';
                    
                    // Position drop zones
                    Object.keys(dropZones).forEach(zoneNum => {
                        const zone = document.getElementById(`dropZone${zoneNum}`);
                        if (!zone) return;
                        const coords = dropZones[zoneNum];
                        zone.style.position = 'absolute';
                        zone.style.left = coords.x + '%';
                        zone.style.top = coords.y + '%';
                        zone.style.width = coords.width + '%';
                        zone.style.height = coords.height + '%';
                    });

                    // Position card stack container
                    cardStack.style.position = 'absolute';
                    cardStack.style.left = centerStack.x + '%';
                    cardStack.style.top = centerStack.y + '%';
                    cardStack.style.width = centerStack.width + '%';
                    cardStack.style.height = centerStack.height + '%';

                    // Shuffle and create cards
                    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
                    shuffledCards.forEach((card, index) => {
                        createCard(card, index);
                    });

                    updateSubmitButton();
                }
            }

            function createCard(cardData, stackIndex) {
                const cardElement = document.createElement('div');
                cardElement.className = 'draggable-card';
                cardElement.dataset.cardId = cardData.id;
                cardElement.dataset.correctZone = cardData.correctZone;
                cardElement.draggable = true;

                const img = document.createElement('img');
                img.src = cardData.image;
                img.alt = `Card ${cardData.correctZone}`;
                cardElement.appendChild(img);

                // FIXED: Card size matches drop zones exactly
                const stackOffsetY = stackIndex * 2; // Reduced offset for better stacking
                cardElement.style.position = 'absolute';
                cardElement.style.left = '0';
                cardElement.style.top = stackOffsetY + '%';
                cardElement.style.width = '100%'; // 100% of card-stack container (which is 31.8%)
                cardElement.style.height = '100%'; // Match card-stack height (29.7%)
                cardElement.style.zIndex = 100 + stackIndex;
                cardElement.style.opacity = '1';
                cardElement.style.visibility = 'visible';

                // Add to card stack
                document.getElementById('cardStack').appendChild(cardElement);

                // Initialize position tracking
                cardPositions[cardData.id] = { zone: null, element: cardElement };

                // Desktop drag events
                cardElement.addEventListener('dragstart', handleDragStart);
                cardElement.addEventListener('dragend', handleDragEnd);

                // Touch events for mobile
                cardElement.addEventListener('touchstart', handleTouchStart, { passive: false });
                cardElement.addEventListener('touchmove', handleTouchMove, { passive: false });
                cardElement.addEventListener('touchend', handleTouchEnd, { passive: false });
            }

            // Desktop drag handlers
            function handleDragStart(e) {
                draggedCard = this;
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
            }

            function handleDragEnd(e) {
                this.classList.remove('dragging');
                document.querySelectorAll('.drop-zone').forEach(zone => {
                    zone.classList.remove('drag-over');
                });
            }

            // Touch handlers for mobile
            function handleTouchStart(e) {
                e.preventDefault();
                draggedCard = this;
                const touch = e.touches[0];
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                this.classList.add('dragging');
                this.style.zIndex = 1000;
            }

            function handleTouchMove(e) {
                e.preventDefault();
                if (!draggedCard) return;

                const touch = e.touches[0];
                
                draggedCard.style.position = 'fixed';
                draggedCard.style.left = (touch.clientX - draggedCard.offsetWidth / 2) + 'px';
                draggedCard.style.top = (touch.clientY - draggedCard.offsetHeight / 2) + 'px';
            }

            function handleTouchEnd(e) {
                e.preventDefault();
                if (!draggedCard) return;

                const touch = e.changedTouches[0];
                const dropZone = getDropZoneAtPosition(touch.clientX, touch.clientY);
                const stackZone = getStackAtPosition(touch.clientX, touch.clientY);
                
                if (dropZone) {
                    handleDrop(dropZone);
                } else if (stackZone) {
                    returnToStack(draggedCard);
                } else {
                    returnToStack(draggedCard);
                }

                draggedCard.classList.remove('dragging');
                draggedCard = null;
            }

            function getDropZoneAtPosition(x, y) {
                const zones = document.querySelectorAll('.drop-zone');
                for (let zone of zones) {
                    const rect = zone.getBoundingClientRect();
                    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                        return zone;
                    }
                }
                return null;
            }

            function getStackAtPosition(x, y) {
                const stack = document.getElementById('cardStack');
                if (stack) {
                    const rect = stack.getBoundingClientRect();
                    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                        return stack;
                    }
                }
                return null;
            }

            // Setup drop zones
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.addEventListener('dragover', handleDragOver);
                zone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDrop(e.currentTarget);
                });
                zone.addEventListener('dragleave', handleDragLeave);
            });

            // Setup card stack as a drop zone for returning cards
            const cardStack = document.getElementById('cardStack');
            if (cardStack) {
                cardStack.addEventListener('dragover', (e) => {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    cardStack.classList.add('drag-over');
                    e.dataTransfer.dropEffect = 'move';
                    return false;
                });
                
                cardStack.addEventListener('drop', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (draggedCard) {
                        returnToStack(draggedCard);
                        cardStack.classList.remove('drag-over');
                    }
                });
                
                cardStack.addEventListener('dragleave', () => {
                    cardStack.classList.remove('drag-over');
                });
            }

            function handleDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                this.classList.add('drag-over');
                e.dataTransfer.dropEffect = 'move';
                return false;
            }

            function handleDragLeave(e) {
                this.classList.remove('drag-over');
            }

            function handleDrop(dropZone) {
                if (!draggedCard) return;

                const zoneNum = parseInt(dropZone.dataset.zone);
                const cardId = draggedCard.dataset.cardId;

                // Check if zone already has a card
                const existingCard = findCardInZone(zoneNum);
                if (existingCard && existingCard !== draggedCard) {
                    // Swap: return existing card to stack
                    returnToStack(existingCard);
                }

                // Remove card from previous zone if any
                const previousZone = cardPositions[cardId].zone;
                if (previousZone !== null) {
                    const prevZoneElement = document.getElementById(`dropZone${previousZone}`);
                    if (prevZoneElement) {
                        prevZoneElement.classList.remove('has-card');
                    }
                }

                // FIXED: Place card in new zone with proper positioning
                placeCardInZone(draggedCard, dropZone, zoneNum);
                dropZone.classList.remove('drag-over');
                updateSubmitButton();
            }

            function placeCardInZone(card, zone, zoneNum) {
                card.classList.add('snapping', 'placed');
                
                // FIXED: Reset to absolute positioning relative to parent
                card.style.position = 'absolute';
                
                // Get zone coordinates from our dropZones object
                const coords = dropZones[zoneNum];
                
                // FIXED: Apply percentage-based positioning and sizing to match drop zones
                card.style.left = coords.x + '%';
                card.style.top = coords.y + '%';
                card.style.width = coords.width + '%';
                card.style.height = coords.height + '%';
                card.style.zIndex = 200 + zoneNum;
                
                // Ensure card remains draggable
                card.draggable = true;
                card.style.cursor = 'grab';

                // Update position tracking
                cardPositions[card.dataset.cardId].zone = zoneNum;
                zone.classList.add('has-card');

                // FIXED: Move card to main container (not card stack)
                const mainContainer = document.querySelector('.drag-drop-game');
                mainContainer.appendChild(card);

                setTimeout(() => card.classList.remove('snapping'), 300);
            }

            function returnToStack(card) {
                const cardId = card.dataset.cardId;
                const previousZone = cardPositions[cardId].zone;
                
                if (previousZone !== null) {
                    const prevZoneElement = document.getElementById(`dropZone${previousZone}`);
                    if (prevZoneElement) {
                        prevZoneElement.classList.remove('has-card');
                    }
                }

                card.classList.add('bouncing');
                card.style.position = 'absolute';
                
                // FIXED: Return to stack with proper positioning
                const cardStack = document.getElementById('cardStack');
                const stackIndex = Array.from(cardStack.children).length;
                
                card.style.left = '0';
                card.style.top = (stackIndex * 3) + '%';
                card.style.width = '100%';
                card.style.height = 'auto';
                card.style.zIndex = 100 + stackIndex;

                // Move back to card stack
                cardStack.appendChild(card);

                cardPositions[cardId].zone = null;
                card.classList.remove('placed');

                setTimeout(() => card.classList.remove('bouncing'), 500);
                updateSubmitButton();
            }

            function findCardInZone(zoneNum) {
                for (let cardId in cardPositions) {
                    if (cardPositions[cardId].zone === zoneNum) {
                        return cardPositions[cardId].element;
                    }
                }
                return null;
            }

            function updateSubmitButton() {
                // Check if all cards are placed
                const allPlaced = Object.values(cardPositions).every(pos => pos.zone !== null);
                submitBiologyDragDropBtn.disabled = !allPlaced;
            }

            // Submit handler
            if (submitBiologyDragDropBtn) {
                submitBiologyDragDropBtn.addEventListener('click', function() {
                    let correctCount = 0;
                    const totalCards = cards.length;

                    // Check each card placement
                    Object.keys(cardPositions).forEach(cardId => {
                        const card = cardPositions[cardId].element;
                        const placedZone = cardPositions[cardId].zone;
                        const correctZone = parseInt(card.dataset.correctZone);
                        const zone = document.getElementById(`dropZone${placedZone}`);

                        if (placedZone === correctZone) {
                            // Correct placement
                            correctCount++;
                            card.classList.add('correct-placement');
                            zone.classList.add('correct');
                        } else {
                            // Incorrect placement
                            card.classList.add('incorrect-placement');
                            zone.classList.add('incorrect');
                        }

                        // Disable dragging
                        card.draggable = false;
                        card.style.cursor = 'default';
                    });

                    // Calculate score
                    const baseScore = correctCount * 10;
                    const bonus = (correctCount === totalCards) ? 50 : 0;
                    const totalScore = baseScore + bonus;
                    const percentage = (correctCount / totalCards) * 100;

                    // Show feedback
                    biologyDragDropFeedback.style.display = 'block';
                    biologyDragDropFeedback.innerHTML = `
                        <h4 style="color: ${percentage === 100 ? '#28a745' : '#dc3545'};">
                            ${percentage === 100 ? 'Perfect! 🎉' : 'Quiz Complete!'}
                        </h4>
                        <p>You placed <strong>${correctCount} out of ${totalCards} cards</strong> correctly.</p>
                        <p>Score: <strong>${baseScore} points</strong>${bonus > 0 ? ` + <strong>${bonus} bonus points</strong>` : ''} = <strong>${totalScore} points</strong></p>
                    `;

                    // Hide submit, show retry
                    submitBiologyDragDropBtn.style.display = 'none';
                    retryBiologyDragDropBtn.style.display = 'inline-block';

                    // Add to course score
                    addToScore(totalScore);

                    // Report to LMS
                    reportToLMS('biologyDragDrop', totalScore, percentage === 100);
                });
            }

            // Retry handler
            if (retryBiologyDragDropBtn) {
                retryBiologyDragDropBtn.addEventListener('click', function() {
                    // Remove ALL cards from the DOM (both in zones and stack)
                    document.querySelectorAll('.draggable-card').forEach(card => {
                        card.remove();
                    });

                    // Reset drop zones completely
                    document.querySelectorAll('.drop-zone').forEach(zone => {
                        zone.classList.remove('has-card', 'correct', 'incorrect', 'drag-over');
                    });

                    // Remove any feedback styling from cards
                    document.querySelectorAll('.draggable-card').forEach(card => {
                        card.classList.remove('correct-placement', 'incorrect-placement', 'placed', 'dragging', 'snapping', 'bouncing');
                    });

                    // Reset feedback
                    biologyDragDropFeedback.style.display = 'none';
                    biologyDragDropFeedback.innerHTML = '';

                    // Re-initialize game (this will recreate cards in stack)
                    initGame();

                    // Reset buttons
                    submitBiologyDragDropBtn.style.display = 'inline-block';
                    submitBiologyDragDropBtn.disabled = true;
                    retryBiologyDragDropBtn.style.display = 'none';

                    // Scroll to quiz
                    biologyDragDropContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }

            // Initialize the game on page load
            initGame();
        } // Close biologyDragDropContainer if block

        // Troubleshooting Quiz 1 Functionality
        const troubleshootingQuiz1Form = document.getElementById('troubleshootingQuiz1Form');
        const troubleshootingQuiz1Feedback = document.getElementById('troubleshootingQuiz1Feedback');
        const troubleshootingQuiz1Status = document.getElementById('troubleshootingQuiz1Status');
        const troubleshootingQuiz1Score = document.getElementById('troubleshootingQuiz1Score');
        const submitTroubleshootingQuiz1Btn = document.getElementById('submitTroubleshootingQuiz1');
        const retryTroubleshootingQuiz1Btn = document.getElementById('retryTroubleshootingQuiz1');

        let troubleshootingQuiz1Data = {
            attempts: 0,
            completed: false,
            score: 0,
            correctAnswer: 'a', // Insufficient polymerase or dNTPs
            maxPoints: 100,
            startTime: null,
            endTime: null
        };

        if (troubleshootingQuiz1Form) {
            troubleshootingQuiz1Form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Check if quiz is already completed
                if (troubleshootingQuiz1Data.completed) {
                    return;
                }

                const selectedAnswer = document.querySelector('input[name="troubleshootingQuiz1Answer"]:checked');
                if (!selectedAnswer) {
                    alert('Please select an answer before submitting.');
                    return;
                }
            
                troubleshootingQuiz1Data.attempts++;
                troubleshootingQuiz1Data.endTime = new Date();
            
                const userAnswer = selectedAnswer.value;
                const isCorrect = userAnswer === troubleshootingQuiz1Data.correctAnswer;
            
            const troubleshootingQuiz1Options = troubleshootingQuiz1Form.querySelectorAll('.quiz-option');
            troubleshootingQuiz1Options.forEach(option => {
                option.classList.add('disabled');
                const input = option.querySelector('input');
                if (input) {
                    input.disabled = true;
                    const indicator = option.querySelector('.option-indicator');
                    if (indicator) {
                        if (input.value === troubleshootingQuiz1Data.correctAnswer) {
                            option.classList.add('correct');
                            indicator.textContent = '✓';
                            indicator.style.display = 'flex';
                        } else if (input.checked && input.value !== troubleshootingQuiz1Data.correctAnswer) {
                            option.classList.add('incorrect');
                            indicator.textContent = '✗';
                            indicator.style.display = 'flex';
                        }
                    }
                }
            });
            
                troubleshootingQuiz1Feedback.style.display = 'block';
                const feedbackIcon = troubleshootingQuiz1Feedback.querySelector('.feedback-icon');
                const feedbackTitle = troubleshootingQuiz1Feedback.querySelector('.feedback-title');
            
                if (isCorrect) {
                    feedbackIcon.classList.add('correct');
                    feedbackIcon.textContent = '✓';
                    feedbackTitle.textContent = 'Correct!';
                    troubleshootingQuiz1Status.textContent = 'Completed';
                    troubleshootingQuiz1Status.classList.remove('failed');
                    troubleshootingQuiz1Status.classList.add('completed');
                    troubleshootingQuiz1Data.score = troubleshootingQuiz1Data.maxPoints;
                    troubleshootingQuiz1Data.completed = true;
                    addToScore(troubleshootingQuiz1Data.maxPoints);
                    troubleshootingQuiz1Score.style.display = 'block';
                    troubleshootingQuiz1Score.querySelector('.score-value').textContent = troubleshootingQuiz1Data.maxPoints + ' points';
                } else {
                    feedbackIcon.classList.add('incorrect');
                    feedbackIcon.textContent = '✗';
                    feedbackTitle.textContent = 'Incorrect. The correct answer is highlighted above.';
                    troubleshootingQuiz1Status.textContent = 'Failed';
                    troubleshootingQuiz1Status.classList.remove('completed');
                    troubleshootingQuiz1Status.classList.add('failed');
                    troubleshootingQuiz1Data.score = 0;
                    troubleshootingQuiz1Score.style.display = 'block';
                    troubleshootingQuiz1Score.querySelector('.score-value').textContent = '0 points';
                    retryTroubleshootingQuiz1Btn.style.display = 'inline-block';
                }
            
                submitTroubleshootingQuiz1Btn.style.display = 'none';
                reportToLMS('troubleshootingQuiz1', troubleshootingQuiz1Data.score, troubleshootingQuiz1Data.completed);
                troubleshootingQuiz1Feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        }
    
        if (retryTroubleshootingQuiz1Btn) {
            retryTroubleshootingQuiz1Btn.addEventListener('click', function() {
                const troubleshootingQuiz1Options = document.querySelectorAll('#troubleshootingQuiz1Form .quiz-option');
                troubleshootingQuiz1Options.forEach(option => {
                    option.classList.remove('disabled', 'correct', 'incorrect');
                    const input = option.querySelector('input');
                    input.disabled = false;
                    input.checked = false;
                    const indicator = option.querySelector('.option-indicator');
                    indicator.textContent = '';
                    indicator.style.display = 'none';
                });
            
                troubleshootingQuiz1Feedback.style.display = 'none';
                troubleshootingQuiz1Status.textContent = 'Not Started';
                troubleshootingQuiz1Status.classList.remove('completed', 'failed');
                troubleshootingQuiz1Score.style.display = 'none';
                submitTroubleshootingQuiz1Btn.style.display = 'inline-block';
                retryTroubleshootingQuiz1Btn.style.display = 'none';
                troubleshootingQuiz1Data.startTime = new Date();
                troubleshootingQuiz1Form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        document.querySelectorAll('input[name="troubleshootingQuiz1Answer"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (!troubleshootingQuiz1Data.startTime) {
                    troubleshootingQuiz1Data.startTime = new Date();
                    troubleshootingQuiz1Status.textContent = 'In Progress';
                }
            });
        });

    // Troubleshooting Quiz 2 Functionality (Corrected Scoring Logic)
    const troubleshootingQuiz2Form = document.getElementById('troubleshootingQuiz2Form');
    const troubleshootingQuiz2Feedback = document.getElementById('troubleshootingQuiz2Feedback');
    const troubleshootingQuiz2Status = document.getElementById('troubleshootingQuiz2Status');
    const troubleshootingQuiz2Score = document.getElementById('troubleshootingQuiz2Score');
    const submitTroubleshootingQuiz2Btn = document.getElementById('submitTroubleshootingQuiz2');

    let troubleshootingQuiz2Data = {
        attempts: 0,
        completed: false,
        score: 0,
        correctAnswers: ['a', 'e'], // Correct answers: air bubble and improper sealing
        maxPointsPerAnswer: 60, // 60 points per correct answer
        startTime: null,
        endTime: null
    };

    if (troubleshootingQuiz2Form) {
        troubleshootingQuiz2Form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (troubleshootingQuiz2Data.completed) {
                return;
            }
            const selectedAnswers = Array.from(troubleshootingQuiz2Form.querySelectorAll('input[name="troubleshootingQuiz2Answer"]:checked')).map(input => input.value);
            if (selectedAnswers.length === 0) {
                alert('Please select at least one answer before submitting.');
                return;
            }
        
            troubleshootingQuiz2Data.attempts++;
            troubleshootingQuiz2Data.endTime = new Date();
        
            // Calculate score logic based on correct and incorrect answers
            const correctAnswersSelected = selectedAnswers.filter(answer => 
                troubleshootingQuiz2Data.correctAnswers.includes(answer)
            );
            const incorrectAnswersSelected = selectedAnswers.filter(answer => 
                !troubleshootingQuiz2Data.correctAnswers.includes(answer)
            );
        
            let score = 0;
            // If no correct answers selected
            if (correctAnswersSelected.length === 0) {
                score = 0;
            }
            // If one correct answer selected
            else if (correctAnswersSelected.length === 1) {
                score = 60; // 60 points regardless of incorrect answers
            }
            // If two correct answers selected
            else if (correctAnswersSelected.length === 2) {
                if (incorrectAnswersSelected.length === 0) {
                    score = 120; // Perfect score - both correct, no incorrect
                } else {
                    score = 30; // Both correct but with incorrect answers
                }
            }

            troubleshootingQuiz2Data.score = score;
            troubleshootingQuiz2Data.completed = true;
            if (score > 0) {
                addToScore(score);
            }
        
            // FIXED: Only target options within troubleshootingQuiz2Form
            const troubleshootingQuiz2Options = troubleshootingQuiz2Form.querySelectorAll('.quiz-option');
            troubleshootingQuiz2Options.forEach(option => {
                option.classList.add('disabled');
                const input = option.querySelector('input');
                input.disabled = true;
            
                const indicator = option.querySelector('.option-indicator');
                if (troubleshootingQuiz2Data.correctAnswers.includes(input.value)) {
                    option.classList.add('correct');
                    indicator.textContent = '✓';
                    indicator.style.display = 'flex';
                } else if (input.checked && !troubleshootingQuiz2Data.correctAnswers.includes(input.value)) {
                    option.classList.add('incorrect');
                    indicator.textContent = '✗';
                    indicator.style.display = 'flex';
                }
            });



            troubleshootingQuiz2Feedback.style.display = 'block';
            const feedbackIcon = troubleshootingQuiz2Feedback.querySelector('.feedback-icon');
            const feedbackTitle = troubleshootingQuiz2Feedback.querySelector('.feedback-title');
        
            // Show results based on score
            if (score === 120) {
                feedbackIcon.classList.add('correct');
                feedbackIcon.textContent = '✓';
                feedbackTitle.textContent = 'Perfect! You selected both correct answers (air bubble and improper sealing) without any incorrect ones!';
                troubleshootingQuiz2Status.textContent = 'Completed';
                troubleshootingQuiz2Status.classList.remove('failed', 'partial');
                troubleshootingQuiz2Status.classList.add('completed');
            } else if (score === 60) {
                feedbackIcon.classList.add('partial');
                feedbackIcon.textContent = '•';
                feedbackTitle.textContent = 'Good! You found one of the correct answers. Can you find the other one?';
                troubleshootingQuiz2Status.textContent = 'Partially Complete';
                troubleshootingQuiz2Status.classList.remove('failed', 'completed');
                troubleshootingQuiz2Status.classList.add('partial');
            } else if (score === 30) {
                feedbackIcon.classList.add('partial');
                feedbackIcon.textContent = '•';
                feedbackTitle.textContent = 'You found both correct answers, but also selected some incorrect ones. Try again with only the correct answers.';
                troubleshootingQuiz2Status.textContent = 'Partially Complete';
                troubleshootingQuiz2Status.classList.remove('failed', 'completed');
                troubleshootingQuiz2Status.classList.add('partial');
            } else {
                feedbackIcon.classList.add('incorrect');
                feedbackIcon.textContent = '✗';
                feedbackTitle.textContent = 'Keep trying! Think about sample handling issues that could cause no amplification in one well.';
                troubleshootingQuiz2Status.textContent = 'Try Again';
                troubleshootingQuiz2Status.classList.remove('completed', 'partial');
                troubleshootingQuiz2Status.classList.add('failed');
            }
        
            troubleshootingQuiz2Status.textContent = 'Completed';
            troubleshootingQuiz2Status.classList.add('completed');
            troubleshootingQuiz2Score.style.display = 'block';
            troubleshootingQuiz2Score.querySelector('.score-value').textContent = `${score} points`;
        
            // No retry button - disable submit button
            submitTroubleshootingQuiz2Btn.style.display = 'none';
        
            reportToLMS('troubleshootingQuiz2', troubleshootingQuiz2Data.score, troubleshootingQuiz2Data.completed);
            troubleshootingQuiz2Feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    document.querySelectorAll('input[name="troubleshootingQuiz2Answer"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (!troubleshootingQuiz2Data.startTime) {
                troubleshootingQuiz2Data.startTime = new Date();
                troubleshootingQuiz2Status.textContent = 'In Progress';
            }
        });
    });


        // Continue Button Logic
        const continueButtons = document.querySelectorAll('.continue-btn');
        continueButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nextChapterTab = e.target.dataset.next;
                if (nextChapterTab) {
                    navigateToChapter(nextChapterTab);
                }
            });
        });

        // Special continue button for PCR Principle section
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                navigateToChapter('realtime-pcr');
            });
        }

        // Navigation function
        function navigateToChapter(chapterTab) {
            chapterItems.forEach(chapter => chapter.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
        
            const nextChapter = document.querySelector(`[data-tab="${chapterTab}"]`);
            const nextSection = document.getElementById(chapterTab);
        
            if (nextChapter && nextSection) {
                nextChapter.classList.add('active');
                nextSection.classList.add('active');
            
            // Scroll to top when changing chapters
            window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // Multiplex PCR Interactive Exercise
        let multiplexScore = 0;
        const maxMultiplexScore = 120; // 12 questions × 10 points each
        const multiplexScoreDisplay = document.getElementById('multiplexScore');
        let answersChecked = false;

        // Initialize score display as hidden
        if (multiplexScoreDisplay) {
            multiplexScoreDisplay.textContent = `-- / ${maxMultiplexScore}`;
            multiplexScoreDisplay.style.backgroundColor = '#cccccc';
        }

        // Initialize multiplex exercise event listeners
        const interpretationDropdowns = document.querySelectorAll('.interpretation-dropdown');
        interpretationDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', function() {
                // Only calculate score internally, don't display until checked
                calculateMultiplexScore();
            
                // Reset visual feedback if user changes answer after checking
                if (answersChecked) {
                    const sampleNumber = this.getAttribute('data-sample');
                    const resultIndicator = document.querySelector(`.result-indicator[data-sample="${sampleNumber}"]`);
                    if (resultIndicator) {
                        resultIndicator.innerHTML = '';
                    }
                    this.style.borderColor = '#ddd';
                    this.style.backgroundColor = 'white';
                    answersChecked = false;
                
                    // Hide score again when user changes answers after checking
                    if (multiplexScoreDisplay) {
                        multiplexScoreDisplay.textContent = `-- / ${maxMultiplexScore}`;
                        multiplexScoreDisplay.style.backgroundColor = '#cccccc';
                    }
                }
            });
        });

        function calculateMultiplexScore() {
            let correctAnswers = 0;
            interpretationDropdowns.forEach(dropdown => {
                const correctAnswer = dropdown.getAttribute('data-correct');
                const selectedAnswer = dropdown.value;
                if (selectedAnswer === correctAnswer) {
                    correctAnswers++;
                }
            });
        
            multiplexScore = correctAnswers * 10;
            // Don't update display here - only calculate internally
        }

        function updateMultiplexScoreDisplay() {
            if (multiplexScoreDisplay) {
                multiplexScoreDisplay.textContent = `${multiplexScore} / ${maxMultiplexScore}`;
            
                // Update score color based on performance
                if (multiplexScore === maxMultiplexScore) {
                    multiplexScoreDisplay.style.backgroundColor = 'var(--rh-green)';
                } else if (multiplexScore >= maxMultiplexScore * 0.7) {
                    multiplexScoreDisplay.style.backgroundColor = 'var(--rh-orange)';
                } else {
                    multiplexScoreDisplay.style.backgroundColor = '#dc3545';
                }
            }
        }

        // Check All Answers button
        const checkAllAnswersBtn = document.getElementById('checkAllAnswers');
        if (checkAllAnswersBtn) {
            checkAllAnswersBtn.addEventListener('click', function() {
                let allAnswered = true;
            
                // First check if all questions are answered
                interpretationDropdowns.forEach(dropdown => {
                    if (dropdown.value === '') {
                        allAnswered = false;
                    }
                });
            
                if (!allAnswered) {
                    alert('Please complete all interpretations before checking answers.');
                    return;
                }
            
                // Calculate final score
                calculateMultiplexScore();
            
                // Now show the score for the first time
                updateMultiplexScoreDisplay();
            
                // Show visual feedback for all answers
                interpretationDropdowns.forEach(dropdown => {
                    const sampleNumber = dropdown.getAttribute('data-sample');
                    const correctAnswer = dropdown.getAttribute('data-correct');
                    const selectedAnswer = dropdown.value;
                    const resultIndicator = document.querySelector(`.result-indicator[data-sample="${sampleNumber}"]`);
                
                    if (selectedAnswer === correctAnswer) {
                        resultIndicator.innerHTML = '<span style="color: var(--rh-green); font-weight: bold; font-size: 18px;">✓</span>';
                        dropdown.style.borderColor = 'var(--rh-green)';
                        dropdown.style.backgroundColor = '#d4edda';
                    } else {
                        resultIndicator.innerHTML = '<span style="color: #dc3545; font-weight: bold; font-size: 18px;">✗</span>';
                        dropdown.style.borderColor = '#dc3545';
                        dropdown.style.backgroundColor = '#f8d7da';
                    }
                });
            
                answersChecked = true;
            
                // Show summary
                const correctCount = multiplexScore / 10;
                const percentage = Math.round((correctCount / 12) * 100);
                let message = `Exercise Complete!\n\nScore: ${multiplexScore}/${maxMultiplexScore} (${percentage}%)\nCorrect answers: ${correctCount}/12\n\n`;
            
                if (percentage === 100) {
                    message += 'Excellent! Perfect score! 🎉';
                } else if (percentage >= 75) {
                    message += 'Great job! You have a solid understanding of PCR result interpretation.';
                } else if (percentage >= 50) {
                    message += 'Good work! Review the incorrect answers to improve your understanding.';
                } else {
                    message += 'Keep practicing! Review the principles of PCR result interpretation.';
                }
                addToScore(multiplexScore)

                alert(message);
        
                // 🆕 ADD: SCORM tracking
                courseProgress.quizzesCompleted.multiplexExercise = true;
                if (window.scormAPI) {
                    window.scormSetScore(percentage);
                }
                updateCourseProgress();
                // Report to LMS
                reportToLMS('multiplexExercise', multiplexScore, percentage >= 70);
            });
        }

        // Reset Exercise button
        const resetMultiplexBtn = document.getElementById('resetMultiplex');
        if (resetMultiplexBtn) {
            resetMultiplexBtn.addEventListener('click', function() {
                interpretationDropdowns.forEach(dropdown => {
                    dropdown.value = '';
                    dropdown.style.borderColor = '#ddd';
                    dropdown.style.backgroundColor = 'white';
                    const sampleNumber = dropdown.getAttribute('data-sample');
                    const resultIndicator = document.querySelector(`.result-indicator[data-sample="${sampleNumber}"]`);
                    if (resultIndicator) {
                        resultIndicator.innerHTML = '';
                    }
                });
            
                multiplexScore = 0;
                answersChecked = false;
                if (multiplexScoreDisplay) {
                    multiplexScoreDisplay.textContent = `-- / ${maxMultiplexScore}`;
                    multiplexScoreDisplay.style.backgroundColor = '#cccccc';
                }
            });
        }

        // End Module Button Logic
        const endModuleBtn = document.getElementById('endModuleBtn');
        if (endModuleBtn) {
            endModuleBtn.addEventListener('click', () => {
                reportModuleCompletion();
                exitToLMS();
            });
        }

        function reportModuleCompletion() {
     // 🆕 ADD: Final SCORM completion
        if (window.scormAPI && window.scormAPI.isScormAvailable()) {
            window.scormSetComplete();
            window.scormSetScore(95); // Set final score
            const sessionTime = Math.floor((new Date() - courseProgress.startTime) / 1000);
            window.scormAPI.setSessionTime(sessionTime);
            console.log('✅ Final completion sent to SCORM');
        }
            const moduleData = {
                moduleId: 'module4_pcr',
                completion: 'completed',
                score: 100,
                timeCompleted: new Date().toISOString()
            };
        
            if (typeof window.API !== 'undefined') {
                window.API.LMSSetValue('cmi.core.lesson_status', 'completed');
                window.API.LMSSetValue('cmi.core.score.raw', '100');
                window.API.LMSSetValue('cmi.core.exit', 'normal');
                window.API.LMSCommit('');
            } else if (typeof window.API_1484_11 !== 'undefined') {
                window.API_1484_11.SetValue('cmi.completion_status', 'completed');
                window.API_1484_11.SetValue('cmi.score.raw', '100');
                window.API_1484_11.SetValue('cmi.exit', 'normal');
                window.API_1484_11.Commit('');
            } else {
                try {
                    const existingData = JSON.parse(localStorage.getItem('pcr_course_data') || '[]');
                    existingData.push(moduleData);
                    localStorage.setItem('pcr_course_data', JSON.stringify(existingData));
                } catch (e) {
                    console.log('LMS data storage not available');
                }
            }
        }

        function exitToLMS() {
            const completionMessage = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                            background: rgba(0,0,0,0.8); display: flex; align-items: center; 
                            justify-content: center; z-index: 10000;">
                    <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; 
                                max-width: 500px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                        <h2 style="color: #39870c; margin-bottom: 20px;">🎉 Module Completed!</h2>
                        <p style="font-size: 18px; margin-bottom: 30px;">
                            Congratulations! You have successfully completed Module 4: Principles of Real-time PCR.
                        </p>
                        <p style="font-size: 14px; color: #666;">
                            You will be redirected to the main course page in 3 seconds...
                        </p>
                    </div>
                </div>
            `;
        
            document.body.insertAdjacentHTML('beforeend', completionMessage);
        
            setTimeout(() => {
                if (typeof window.API !== 'undefined') {
                    window.API.LMSFinish('');
                    window.close();
                } else if (typeof window.API_1484_11 !== 'undefined') {
                    window.API_1484_11.Terminate('');
                    window.close();
                } else if (window.parent !== window) {
                    window.parent.postMessage({
                        type: 'moduleComplete',
                        moduleId: 'module4_pcr',
                        status: 'completed'
                    }, '*');
                } else {
                    window.location.href = '../course.html';
                }
            }, 3000);
        }


        // Troubleshooting Dashboard Functionality
        const troubleshootTiles = document.querySelectorAll('.troubleshoot-tile');
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        const modalOverlays = document.querySelectorAll('.modal-overlay');

        console.log('Loading troubleshooting dashboard...');

        // Function to show modal
        function showModal(issueType) {
            const modal = document.getElementById(issueType + '-modal');
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                console.log('Opened modal for:', issueType);
            
                // Focus management for accessibility
                const closeButton = modal.querySelector('.modal-close');
                if (closeButton) {
                    closeButton.focus();
                }
            }
        }

        // Function to hide all modals
        function hideAllModals() {
            modalOverlays.forEach(overlay => {
                overlay.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }

        // Add click handlers to tiles
        troubleshootTiles.forEach(tile => {
            tile.addEventListener('click', function() {
                const issueType = this.getAttribute('data-issue');
                showModal(issueType);
            
                // Analytics tracking if LMS integration exists
                if (typeof reportToLMS === 'function') {
                    reportToLMS(`troubleshooting_${issueType}_viewed`, 0, false);
                }
            });

            // Add keyboard support for accessibility
            tile.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const issueType = this.getAttribute('data-issue');
                    showModal(issueType);
                }
            });

            // Make tiles focusable and add ARIA attributes
            tile.setAttribute('tabindex', '0');
            tile.setAttribute('role', 'button');
            const titleElement = tile.querySelector('h4');
            if (titleElement) {
                tile.setAttribute('aria-label', `View details for ${titleElement.textContent}`);
            }
        });

        // Add close handlers to close buttons
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                hideAllModals();
            });
        });

        // Close modal when clicking on overlay background
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    hideAllModals();
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal-overlay[style*="flex"]');
                if (openModal) {
                    hideAllModals();
                }
            }
        });

        // Handle image loading errors with fallback
        const troubleshootingImages = document.querySelectorAll('.troubleshoot-tile img, .modal-overlay img');
        troubleshootingImages.forEach(img => {
            img.addEventListener('error', function() {
                console.log('Image failed to load:', this.src);
                // Try fallback image
                if (!this.src.includes('pcr-curves-normal.png')) {
                    this.src = 'images/pcr-curves-normal.png';
                } else {
                    // If even fallback fails, show placeholder
                    this.style.display = 'none';
                    const container = this.closest('.tile-img-container, .modal-image');
                    if (container) {
                        container.style.background = 'linear-gradient(45deg, #8fcae7, #76d2b6)';
                        if (!container.querySelector('.image-placeholder')) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'image-placeholder';
                            placeholder.style.cssText = `
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                height: 100%; 
                                color: #01689b; 
                                font-weight: 600;
                                text-align: center;
                                padding: 20px;
                            `;
                            placeholder.textContent = 'Image not available';
                            container.appendChild(placeholder);
                        }
                    }
                }
            });
        });

        // Troubleshooting Analytics and Tracking
        function trackTroubleshootingInteraction(action, issueType) {
            const interactionData = {
                action: action,
                issueType: issueType,
                timestamp: new Date().toISOString(),
                module: 'troubleshooting_dashboard'
            };

            // Report to LMS if available
            if (typeof reportToLMS === 'function') {
                reportToLMS(`troubleshooting_${action}`, 0, false);
            }

            // Store locally for offline tracking
            try {
                const existingData = JSON.parse(localStorage.getItem('troubleshooting_interactions') || '[]');
                existingData.push(interactionData);
                // Keep only last 100 interactions to prevent storage bloat
                if (existingData.length > 100) {
                    existingData.splice(0, existingData.length - 100);
                }
                localStorage.setItem('troubleshooting_interactions', JSON.stringify(existingData));
                console.log('Tracked interaction:', action, issueType);
            } catch (e) {
                console.log('Could not store troubleshooting interaction data:', e);
            }
        }

        // Enhanced analytics on tile clicks
        troubleshootTiles.forEach(tile => {
            tile.addEventListener('click', function() {
                const issueType = this.getAttribute('data-issue');
                trackTroubleshootingInteraction('tile_clicked', issueType);
            });
        });

        // Track when troubleshooting section becomes visible
        const troubleshootingSection = document.getElementById('troubleshooting');
        if (troubleshootingSection && typeof IntersectionObserver !== 'undefined') {
            const troubleshootingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        trackTroubleshootingInteraction('section_viewed', 'dashboard');
                        troubleshootingObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            troubleshootingObserver.observe(troubleshootingSection);
        }

        // Preload images for better user experience
        function preloadTroubleshootingImages() {
            const imageUrls = [
                'images/pcr-curves-contamination.png',
                'images/pcr-curves-degradation.png',
                'images/pcr-curves-high-template.png',
                'images/pcr-curves-inhibition.png',
                'images/pcr-curves-low-template.png',
                'images/pcr-curves-primer-dimer.png',
                'images/pcr-curves-normal.png'
            ];

            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
                img.onload = () => console.log('Preloaded:', url);
                img.onerror = () => console.log('Failed to preload:', url);
            });
        }

        // Initialize troubleshooting dashboard
        function initializeTroubleshootingDashboard() {
            console.log('Troubleshooting Dashboard initialized with', troubleshootTiles.length, 'tiles');
        
            // Preload images
            preloadTroubleshootingImages();
        
            // Add loading indicator if needed
            const dashboard = document.querySelector('.troubleshoot-main-container');
            if (dashboard) {
                dashboard.style.opacity = '0';
                setTimeout(() => {
                    dashboard.style.transition = 'opacity 0.5s ease';
                    dashboard.style.opacity = '1';
                }, 100);
            }
        
            // Verify all required elements exist
            if (troubleshootTiles.length === 0) {
                console.warn('No troubleshooting tiles found! Check HTML structure.');
            }
            if (modalOverlays.length === 0) {
                console.warn('No modal overlays found! Check HTML structure.');
            }
        }

    // ====================================
    // Interactive Clinical Stages
    // ====================================
    const timelineContainer = document.querySelector('.timeline-container');
    
    // Only initialize if container exists on the page
    if (timelineContainer) {
        let currentStage = 1;
        const totalStages = 4;
        
        function showStage(stageNumber) {
            // Update current stage
            currentStage = stageNumber;
            
            // Update detail panels
            document.querySelectorAll('.stage-detail').forEach((detail, index) => {
                if (index + 1 === stageNumber) {
                    detail.classList.add('active');
                } else {
                    detail.classList.remove('active');
                }
            });
            
            // Update navigation buttons
            const prevBtn = document.getElementById('prev-stage');
            const nextBtn = document.getElementById('next-stage');
            
            if (prevBtn && nextBtn) {
                prevBtn.disabled = (stageNumber === 1);
                nextBtn.disabled = (stageNumber === totalStages);
            }
            
            // Scroll to container
            if (timelineContainer) {
                timelineContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        // Previous button
        const prevBtn = document.getElementById('prev-stage');
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Previous clicked, current stage:', currentStage);
                if (currentStage > 1) {
                    showStage(currentStage - 1);
                }
            });
        }
        
        // Next button
        const nextBtn = document.getElementById('next-stage');
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Next clicked, current stage:', currentStage);
                if (currentStage < totalStages) {
                    showStage(currentStage + 1);
                }
            });
        }
        
        // Initialize - show first stage
        showStage(1);
        
        console.log('Clinical stages initialized:', {
            prevBtn: prevBtn ? 'found' : 'not found',
            nextBtn: nextBtn ? 'found' : 'not found',
            totalStages: document.querySelectorAll('.stage-detail').length
        });
    }

    // Hotspot functionality
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        const marker = hotspot.querySelector('.hotspot-marker');
        
        marker.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close other hotspots
            hotspots.forEach(h => {
                if (h !== hotspot) {
                    h.classList.remove('active');
                }
            });
            
            // Toggle current hotspot
            hotspot.classList.toggle('active');
        });
    });
    
    // Close hotspots when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.hotspot')) {
            hotspots.forEach(h => h.classList.remove('active'));
        }
    });

    // 🆕 ADD: Progress calculation function
    // Enhanced Progress Calculation Function - REPLACE YOUR EXISTING updateCourseProgress()
    function updateCourseProgress() {
        if (!window.scormAPI?.isScormAvailable()) {
            console.log('📴 SCORM not available - saving to localStorage');
            localStorage.setItem('courseProgress', JSON.stringify({
                ...courseProgress,
                chaptersVisited: Array.from(courseProgress.chaptersVisited)
            }));
            return;
        }
    
        try {
            let progress = 0;
        
            // Chapter visits (40% of progress) - Updated for your 9 chapters
            const chapterProgress = courseProgress.chaptersVisited.size / courseProgress.totalChapters;
            progress += chapterProgress * 0.4;
        
            // Quiz completion (60% of progress) - Updated for all your quizzes
            const completedQuizzes = Object.values(courseProgress.quizzesCompleted).filter(Boolean).length;
            const totalQuizzes = Object.keys(courseProgress.quizzesCompleted).length;
            const quizProgress = completedQuizzes / totalQuizzes;
            progress += quizProgress * 0.6;
        
            // Update SCORM with enhanced data
            window.scormAPI.setProgress(progress);
        
            // Calculate and set score
            const currentScore = window.courseScore || 0;
            const maxScore = window.maxScore || 540;
            const scorePercentage = (currentScore / maxScore) * 100;
            window.scormAPI.setScore(scorePercentage, 0, 100);
        
            // Determine completion status - Updated criteria for your course
            const completionThreshold = Math.ceil(totalQuizzes * 0.6); // 60% of quizzes
            const chapterThreshold = Math.ceil(courseProgress.totalChapters * 0.7); // 70% of chapters
        
            if (completedQuizzes >= completionThreshold && courseProgress.chaptersVisited.size >= chapterThreshold) {
                window.scormAPI.setCompletionStatus('completed');
            
                // Set success status for SCORM 2004
                if (window.scormAPI.getVersion() === '2004') {
                    const passThreshold = 70; // 70% pass threshold
                    window.scormAPI.setSuccessStatus(scorePercentage >= passThreshold ? 'passed' : 'failed');
                }
            
                console.log('🎉 Course marked complete! Final score:', scorePercentage.toFixed(1) + '%');
            } else {
                window.scormAPI.setCompletionStatus('incomplete');
            }
        
            // Update session time
            const sessionTime = Math.floor((new Date() - courseProgress.startTime) / 1000);
            window.scormAPI.setSessionTime(sessionTime);
        
            console.log(`📊 Progress Update:
                - Overall: ${Math.round(progress * 100)}%
                - Chapters: ${courseProgress.chaptersVisited.size}/${courseProgress.totalChapters} (${Math.round(chapterProgress * 100)}%)
                - Quizzes: ${completedQuizzes}/${totalQuizzes} (${Math.round(quizProgress * 100)}%)
                - Score: ${scorePercentage.toFixed(1)}%
                - Session: ${Math.floor(sessionTime/60)} minutes`);
            
        } catch (error) {
            console.error('Error updating course progress:', error);
            // Fallback to localStorage
            localStorage.setItem('courseProgress', JSON.stringify({
                ...courseProgress,
                chaptersVisited: Array.from(courseProgress.chaptersVisited)
            }));
        }
    }

    // Add this JavaScript code to script.js for reset functionality
    // Place this code near the end of the DOMContentLoaded event listener, before the closing bracket

    // Reset Score Functionality
    const resetScoreBtn = document.getElementById('resetScoreBtn');

    if (resetScoreBtn) {
        resetScoreBtn.addEventListener('click', function() {
            // Show confirmation dialog
            if (confirm('Are you sure you want to reset all progress and scores to zero? This action cannot be undone.')) {
                resetAllProgress();
            }
        });
    }

    function resetAllProgress() {
        // Reset course score
        courseScore = 0;
        updateThermometer();
    
        // Reset course progress tracking
        if (typeof courseProgress !== 'undefined') {
            courseProgress.chaptersVisited.clear();
            courseProgress.quizzesCompleted = { 
                quiz1: false, 
                rtExercise: false, 
                multiplexExercise: false,
                troubleshootingQuiz1: false,
                troubleshootingQuiz2: false
            };
            courseProgress.startTime = new Date();
        }
    
        // Reset Quiz 1
        if (typeof quizData !== 'undefined') {
            quizData.quiz1 = {
                attempts: 0,
                completed: false,
                score: 0,
                correctAnswer: 'd',
                startTime: null,
                endTime: null
            };
            resetQuizDisplay('quiz1');
        }
    
        // Reset RT Exercise
        if (typeof rtExerciseData !== 'undefined') {
            rtExerciseData = {
                attempts: 0,
                completed: false,
                score: 0,
                correctAnswer: 'b',
                startTime: null,
                endTime: null
            };
            resetQuizDisplay('rtExercise');
        }
    
        // Reset Troubleshooting Quiz 1
        if (typeof troubleshootingQuiz1Data !== 'undefined') {
            troubleshootingQuiz1Data = {
                attempts: 0,
                completed: false,
                score: 0,
                correctAnswer: 'a',
                maxPoints: 100,
                startTime: null,
                endTime: null
            };
            resetQuizDisplay('troubleshootingQuiz1');
        }
    
        // Reset Troubleshooting Quiz 2
        if (typeof troubleshootingQuiz2Data !== 'undefined') {
            troubleshootingQuiz2Data = {
                attempts: 0,
                completed: false,
                score: 0,
                correctAnswers: ['a', 'e'],
                maxPointsPerAnswer: 60,
                startTime: null,
                endTime: null
            };
            resetQuizDisplay('troubleshootingQuiz2');
        }
    
        // Reset Multiplex Exercise
        if (typeof multiplexScore !== 'undefined') {
            multiplexScore = 0;
            answersChecked = false;
            if (multiplexScoreDisplay) {
                multiplexScoreDisplay.textContent = `-- / ${maxMultiplexScore}`;
                multiplexScoreDisplay.style.backgroundColor = '#cccccc';
            }
            resetMultiplexDropdowns();
        }
    
        // Clear local storage
        localStorage.removeItem('courseScore');
        localStorage.removeItem('pcr_course_data');
        localStorage.removeItem('troubleshooting_interactions');
        localStorage.removeItem('courseProgress');
    
        // Reset SCORM progress if available
        if (window.scormAPI && window.scormAPI.isScormAvailable()) {
            window.scormSetProgress(0);
            window.scormAPI.setSessionTime(0);
        }
    
        // Show success message
        showResetConfirmation();
    
        console.log('All progress and scores have been reset to zero');
    }

    function resetMultiplexDropdowns() {
        const interpretationDropdowns = document.querySelectorAll('.interpretation-dropdown');
        interpretationDropdowns.forEach(dropdown => {
            dropdown.value = '';
            dropdown.style.borderColor = '#ddd';
            dropdown.style.backgroundColor = 'white';
            const sampleNumber = dropdown.getAttribute('data-sample');
            const resultIndicator = document.querySelector(`.result-indicator[data-sample="${sampleNumber}"]`);
            if (resultIndicator) {
                resultIndicator.innerHTML = '';
            }
        });
    }

    // Organ diagram interactive functionality
    function initOrganDiagram() {
        const organPoints = document.querySelectorAll('.organ-point');
        const organInfoDivs = document.querySelectorAll('.organ-info');
        const closeButtons = document.querySelectorAll('.close-info');
        const container = document.querySelector('.organ-diagram-container');
        
        console.log('Initializing organ diagram:', {
            points: organPoints.length,
            infoDivs: organInfoDivs.length,
            closeButtons: closeButtons.length
        });
        
        if (!container) {
            console.error('organ-diagram-container not found!');
            return;
        }
        
        function positionTooltip(point, tooltip) {
            // Get the point's position relative to the container
            const pointRect = point.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Calculate position relative to container
            const pointX = pointRect.left - containerRect.left + (pointRect.width / 2);
            const pointY = pointRect.top - containerRect.top + (pointRect.height / 2);
            
            // Position tooltip to the right of the point
            let left = pointX + 20;
            let top = pointY - 20;
            
            // Get tooltip dimensions (temporarily show it to measure)
            tooltip.style.display = 'block';
            tooltip.style.visibility = 'hidden';
            const tooltipRect = tooltip.getBoundingClientRect();
            tooltip.style.visibility = 'visible';
            
            // Check if tooltip goes off right edge
            if (left + tooltipRect.width > containerRect.width) {
                // Position to the left of the point instead
                left = pointX - tooltipRect.width - 20;
            }
            
            // Check if tooltip goes off bottom
            if (top + tooltipRect.height > containerRect.height) {
                top = containerRect.height - tooltipRect.height - 10;
            }
            
            // Check if tooltip goes off top
            if (top < 0) {
                top = 10;
            }
            
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
        }
        
        organPoints.forEach(point => {
            point.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const organType = this.getAttribute('data-organ');
                const targetPanel = document.getElementById(`info-${organType}`);
                
                console.log('Clicked organ point:', organType, 'Panel found:', targetPanel ? 'yes' : 'no');
                
                // Hide all tooltips first
                organInfoDivs.forEach(panel => {
                    panel.classList.remove('visible');
                    panel.style.display = 'none';
                });
                
                // Show and position the selected tooltip
                if (targetPanel) {
                    targetPanel.classList.add('visible');
                    positionTooltip(this, targetPanel);
                }
            });
            
            // Add keyboard support
            point.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        closeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Close button clicked');
                
                // Hide the parent tooltip
                const parentInfo = this.closest('.organ-info');
                if (parentInfo) {
                    parentInfo.classList.remove('visible');
                    parentInfo.style.display = 'none';
                }
            });
        });
        
        // Close all tooltips when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.organ-diagram-container')) {
                organInfoDivs.forEach(panel => {
                    panel.classList.remove('visible');
                    panel.style.display = 'none';
                });
            }
        });
        
        // Reposition tooltips on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                organInfoDivs.forEach(panel => {
                    if (panel.classList.contains('visible')) {
                        const organType = panel.getAttribute('data-organ');
                        const point = document.querySelector(`.organ-point[data-organ="${organType}"]`);
                        if (point) {
                            positionTooltip(point, panel);
                        }
                    }
                });
            }, 250);
        });
    } // Close initOrganDiagram function

    // Initialize organ diagram when DOM is ready
    if (document.querySelector('.organ-diagram-container')) {
        initOrganDiagram();
    }

}); // Close DOMContentLoaded