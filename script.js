// quiz data for each category
const quizData = {
    science: [
        {
            question: "How many elements are on the periodic table?",
            answers: [
                { text: "92", correct: false },
                { text: "118", correct: true },
                { text: "138", correct: false },
                { text: "76", correct: false }
            ]
        },
        {
            question: "What element is the most commonly used to create nuclear energy?",
            answers: [
                { text: "Hydrogen", correct: false },
                { text: "Lithium", correct: false },
                { text: "Uranium", correct: true },
                { text: "Sodium", correct: false }
            ]
        },
        {
            question: "What is the symbol for iron on the periodic table?",
            answers: [
                { text: "He", correct: false },
                { text: "Ne", correct: false },
                { text: "O", correct: false },
                { text: "Fe", correct: true }
            ]
        },
        {
            question: "What is the chemical formula for water?",
            answers: [
                { text: "H2O", correct: true },
                { text: "CO2", correct: false },
                { text: "O2", correct: false },
                { text: "H2SO4", correct: false }
            ]
        },
        {
            question: "What planet is known as the Red Planet?",
            answers: [
                { text: "Venus", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: false }
            ]
        }
    ],
    mathematics: [
        {
            question: "What is the sum of 555 + 555 + 123?",
            answers: [
                { text: "1244", correct: false },
                { text: "1233", correct: true },
                { text: "1103", correct: false },
                { text: "1234", correct: false }
            ]
        },
        {
            question: "What is 30 x 18?",
            answers: [
                { text: "230", correct: false },
                { text: "380", correct: false },
                { text: "540", correct: true },
                { text: "740", correct: false }
            ]
        },
        {
            question: "What is 700 divided by 4?",
            answers: [
                { text: "200", correct: false },
                { text: "175", correct: true },
                { text: "181", correct: false },
                { text: "70", correct: false }
            ]
        },
        {
            question: "What is the square root of 144?",
            answers: [
                { text: "12", correct: true },
                { text: "14", correct: false },
                { text: "16", correct: false },
                { text: "10", correct: false }
            ]
        },
        {
            question: "What is 2^5 (2 to the power of 5)?",
            answers: [
                { text: "10", correct: false },
                { text: "25", correct: false },
                { text: "32", correct: true },
                { text: "16", correct: false }
            ]
        }
    ],
    movies: [
        {
            question: "What colors make up Freddy Krueger's striped sweater?",
            answers: [
                { text: "Blue and Red", correct: false },
                { text: "Yellow and Green", correct: false },
                { text: "Red and Green", correct: true },
                { text: "Black and Red", correct: false }
            ]
        },
        {
            question: "Who directed the hit 2017 movie Get Out?",
            answers: [
                { text: "Steven Spielberg", correct: false },
                { text: "Jordan Peele", correct: true },
                { text: "Tim Burton", correct: false },
                { text: "Spike Lee", correct: false }
            ]
        },
        {
            question: "If you watch the Marvel Movies in chronological order, which would you watch first?",
            answers: [
                { text: "Captain America: The First Avenger", correct: true },
                { text: "Captain America: The Winter Soldier", correct: false },
                { text: "Avengers", correct: false },
                { text: "Captain Marvel", correct: false }
            ]
        },
        {
            question: "Which movie won the Academy Award for Best Picture in 2020?",
            answers: [
                { text: "1917", correct: false },
                { text: "Joker", correct: false },
                { text: "Parasite", correct: true },
                { text: "Once Upon a Time in Hollywood", correct: false }
            ]
        },
        {
            question: "Who played Jack in Titanic?",
            answers: [
                { text: "Brad Pitt", correct: false },
                { text: "Leonardo DiCaprio", correct: true },
                { text: "Tom Cruise", correct: false },
                { text: "Matt Damon", correct: false }
            ]
        }
    ]
};


// quiz logic and state management
class Quiz {
    constructor(quizData) {
        this.quizData = quizData;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = quizData.length;
    }

    getCurrentQuestion() {
        return this.quizData[this.currentQuestionIndex];
    }

    answerQuestion(answerIndex) {
        const currentQuestion = this.getCurrentQuestion();
        if (currentQuestion.answers[answerIndex].correct) {
            this.score++;
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.totalQuestions) {
            this.currentQuestion = this.quizData[this.currentQuestionIndex].question;
        }
    }
}

// UI and interaction management
class QuizApp {
    constructor(element, category, quiz) {
        this.element = element;
        this.category = category;
        this.quiz = quiz;
        this.question = element.querySelector('.question');
        this.questionElement = element.querySelector('.question');
        this.answerButtons = element.querySelectorAll('.answer-button');
        this.scoreElement = element.querySelector('.score');
        this.nextButton = element.querySelector('.next-btn');
        // search up in the until root to find the category card
        this.closeButton = element.closest('.quiz-card').querySelector('.end-btn');
        this.startButton = element.closest('.quiz-card').querySelector('.start-btn');

        // runtime state
        this.answered = false;

        // bind handlers once so we can add/remove reliably
        this.onNextClick = this.handleNext.bind(this);
        this.onAnswerClick = (e) => {
            if (this.answered) return;
            this.handleAnswer(e.currentTarget);
        };
    }

    startQuiz() {
        console.log(`Starting ${this.category} quiz`);
        this.element.style.display = 'block';
        this.scoreElement.textContent = `Score: 0/${this.quiz.totalQuestions}`;
        this.showQuestion();
        this.attachListeners();
    }

    showQuestion() {
        this.answered = false;
        console.log(`Showing question ${this.quiz.currentQuestionIndex + 1}`);
        const currentQuestion = this.quiz.getCurrentQuestion();
        this.questionElement.textContent = currentQuestion.question;
        this.answerButtons.forEach((button, index) => {
            button.textContent = currentQuestion.answers[index].text;
            button.disabled = false;
            button.classList.remove('correct', 'wrong');
        });
        this.nextButton.style.display = 'none'; // hide Next until an answer is picked
    }

    handleAnswer(button) {
        if (this.answered) return;
        this.answered = true;
        const answerIndex = Array.from(this.answerButtons).indexOf(button);
        const currentQuestion = this.quiz.getCurrentQuestion();
        if (currentQuestion.answers[answerIndex].correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        this.answerButtons.forEach(btn => btn.disabled = true);
        this.nextButton.style.display = 'block';
        this.quiz.answerQuestion(answerIndex);
        this.updateScore();
    }

    updateScore() {
        this.scoreElement.textContent = `Score: ${this.quiz.score}/${this.quiz.totalQuestions}`;
    }

    handleNext() {
        this.quiz.nextQuestion();
        if (this.quiz.currentQuestionIndex < this.quiz.totalQuestions) {
            console.log(`Moving to question ${this.quiz.currentQuestionIndex + 1}`);
            this.showQuestion();
        } else {
            console.log("Quiz ended");
            this.endQuiz();
        }
    }

    handleClose() {
        console.log("Closing quiz");
        this.element.style.display = 'none';
        document.querySelectorAll('.quiz-card').forEach(app => {
            app.style.display = 'block';
        });
        this.closeButton.style.display = 'none';
        this.startButton.style.display = 'block';
        // kill the state
        this.quiz.currentQuestionIndex = 0;
        this.quiz.score = 0;
        this.questionElement.textContent = '';
        this.answerButtons.forEach(button => {
            button.style.display = 'inline-block';
            button.disabled = false;
            button.classList.remove('correct', 'wrong');
        });
    }

    endQuiz() {
        console.log("Ending quiz");
        this.questionElement.textContent = `Quiz Over! Final Score: ${this.quiz.score}/${this.quiz.totalQuestions}`;
        // hide controls
        this.answerButtons.forEach(button => {
            button.disabled = true;
            button.style.display = 'none';
        });
        this.nextButton.style.display = 'none';
        // remove listeners so logic is cleaned up at the end of the quiz
        this.detachListeners();
        this.startButton.style.display = 'block';
        this.closeButton.style.display = 'block';
    }

    attachListeners() {
        // de-dupe listeners
        this.nextButton.removeEventListener('click', this.onNextClick);
        this.nextButton.addEventListener('click', this.onNextClick);

        this.answerButtons.forEach(btn => {
            btn.removeEventListener('click', this.onAnswerClick);
            btn.addEventListener('click', this.onAnswerClick);
        });
    }

    detachListeners() {
        this.nextButton.removeEventListener('click', this.onNextClick);
        this.answerButtons.forEach(btn => {
            btn.removeEventListener('click', this.onAnswerClick);
        });
    }
}

// event listener on categories
const categoryButtons = document.querySelectorAll('.quiz-card');
categoryButtons.forEach(element => {
    const startButton = element.querySelector('.start-btn');
    if (!startButton) {
        console.error("Start button not found!");
        return;
    }

    const endButton = element.querySelector('.end-btn');
    if (!endButton) {
        console.error("End button not found!");
        return;
    }

    const category = element.id.replace('-card', '').toLowerCase();
    const quiz = new Quiz(quizData[category]);

    const quizAppElement = element.querySelector(".quiz-app");
    const quizApp = new QuizApp(quizAppElement, category, quiz);
    quizAppElement.quizApp = quizApp;

    startButton.textContent = 'Start Quiz';

    endButton.addEventListener('click', () => {
        quizApp.handleClose();
    });

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        endButton.style.display = 'block';

        // hide other quizzes
        document.querySelectorAll('.quiz-card').forEach(app => {
            if (app !== element) app.style.display = 'none';
        });

        quizApp.startQuiz();
    });
});


// on startup hide all quiz apps
document.querySelectorAll('.quiz-app').forEach(app => app.style.display = 'none');

