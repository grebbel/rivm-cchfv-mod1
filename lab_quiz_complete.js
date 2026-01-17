}

// ========================================
// Laboratory Diagnosis Quiz
// ========================================

// Track quiz state
let labQuizState = {
    stageAnswered: false,
    stageCorrect: false,
    labTestsAnswered: false,
    score: 0
};

// Clinical Stage Selection
const stageButtons = document.querySelectorAll('.lab-stage-btn');
stageButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (labQuizState.stageAnswered) return;
        
        const isCorrect = this.dataset.correct === 'true';
        labQuizState.stageAnswered = true;
        labQuizState.stageCorrect = isCorrect;
        
        stageButtons.forEach(btn => {
            btn.style.cursor = 'not-allowed';
            btn.style.opacity = '0.7';
            
            if (btn.dataset.correct === 'true') {
                btn.style.backgroundColor = '#28a745';
                btn.style.borderColor = '#28a745';
                btn.style.color = 'white';
            } else if (btn === this && !isCorrect) {
                btn.style.backgroundColor = '#dc3545';
                btn.style.borderColor = '#dc3545';
                btn.style.color = 'white';
            }
        });
        
        if (isCorrect) {
            labQuizState.score += 25;
        }
        
        setTimeout(() => {
            document.getElementById('lab-tests-section').style.display = 'block';
            document.getElementById('lab-tests-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    });
    
    button.addEventListener('mouseenter', function() {
        if (!labQuizState.stageAnswered) {
            this.style.backgroundColor = '#e8f5f0';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (!labQuizState.stageAnswered) {
            this.style.backgroundColor = 'white';
        }
    });
});

const labSubmitBtn = document.getElementById('lab-submit-btn');
if (labSubmitBtn) {
    labSubmitBtn.addEventListener('click', function() {
        const testSelects = document.querySelectorAll('.lab-test-select');
        let allAnswered = true;
        
        testSelects.forEach(select => {
            if (!select.value) {
                allAnswered = false;
                select.style.borderColor = '#dc3545';
                select.style.backgroundColor = '#f8d7da';
            }
        });
        
        if (!allAnswered) {
            alert('Please answer all laboratory test questions before submitting.');
            return;
        }
        
        let correctCount = 0;
        
        testSelects.forEach(select => {
            const row = select.closest('tr');
            const rationale = row.querySelector('.lab-rationale');
            const isCorrect = select.value === select.dataset.correct;
            
            if (isCorrect) {
                correctCount++;
                labQuizState.score += 25;
                select.style.borderColor = '#28a745';
                select.style.backgroundColor = '#d4edda';
            } else {
                select.style.borderColor = '#dc3545';
                select.style.backgroundColor = '#f8d7da';
            }
            
            if (rationale) {
                rationale.style.display = 'table-cell';
            }
            
            select.disabled = true;
        });
        
        if (correctCount === 5) {
            labQuizState.score += 50;
        }
        
        const resultsDiv = document.getElementById('lab-quiz-results');
        const scoreText = document.getElementById('lab-quiz-score');
        const feedbackText = document.getElementById('lab-quiz-feedback');
        
        resultsDiv.style.display = 'block';
        scoreText.textContent = `Your score: ${labQuizState.score} / 200 points`;
        scoreText.style.color = labQuizState.score >= 175 ? '#28a745' : (labQuizState.score >= 100 ? '#ffc107' : '#dc3545');
        
        let feedback = '';
        if (labQuizState.score === 200) {
            feedback = '🎉 Perfect score! You have excellent understanding of CCHF diagnostics.';
        } else if (labQuizState.score >= 175) {
            feedback = '✅ Great work! You have a strong grasp of diagnostic timing and methods.';
        } else if (labQuizState.score >= 100) {
            feedback = '📚 Good effort! Review the diagnostic timeline for early vs. late phase testing.';
        } else {
            feedback = '💡 Keep learning! Focus on when each test is most useful in the disease course.';
        }
        
        feedbackText.textContent = feedback;
        
        this.style.display = 'none';
        
        if (typeof addToScore === 'function') {
            addToScore(labQuizState.score);
        }
        
        if (typeof reportToLMS === 'function') {
            reportToLMS('labDiagnosisQuiz', labQuizState.score, labQuizState.score === 200);
        }
        
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

const labRetryBtn = document.getElementById('lab-retry-btn');
if (labRetryBtn) {
    labRetryBtn.addEventListener('click', function() {
        labQuizState = {
            stageAnswered: false,
            stageCorrect: false,
            labTestsAnswered: false,
            score: 0
        };
        
        stageButtons.forEach(btn => {
            btn.style.cursor = 'pointer';
            btn.style.opacity = '1';
            btn.style.backgroundColor = 'white';
            btn.style.borderColor = 'var(--rh-teal)';
            btn.style.color = 'inherit';
        });
        
        const testSelects = document.querySelectorAll('.lab-test-select');
        testSelects.forEach(select => {
            select.value = '';
            select.disabled = false;
            select.style.borderColor = '#ccc';
            select.style.backgroundColor = 'white';
            
            const row = select.closest('tr');
            const rationale = row.querySelector('.lab-rationale');
            if (rationale) {
                rationale.style.display = 'none';
            }
        });
        
        document.getElementById('lab-tests-section').style.display = 'none';
        document.getElementById('lab-quiz-results').style.display = 'none';
        
        labSubmitBtn.style.display = 'inline-block';
        
        document.querySelector('.lab-diagnosis-quiz-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

});
