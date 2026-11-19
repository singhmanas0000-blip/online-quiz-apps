
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "Which language makes a website interactive?",
        options: ["CSS", "HTML", "JavaScript", "SQL"],
        answer: 2
    },
    {
        question: "Which company developed JavaScript's original engine?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        answer: 1
    },
    {
        question: "Which tag is used for a paragraph in HTML?",
        options: ["<h1>", "<div>", "<p>", "<br>"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selected = false;

const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

function showQuestion() {
    selected = false;
    nextButton.disabled = true;

    let q = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent = q.question;

    optionsElement.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        optionsElement.appendChild(button);
    });
}

function selectAnswer(index, button) {
    if (selected) return;

    selected = true;

    const correctAnswer = questions[currentQuestion].answer;
    const allButtons = optionsElement.children;

    if (index === correctAnswer) {
        score++;
    }

    Array.from(allButtons).forEach((btn, i) => {
        btn.disabled = true;

        if (i === correctAnswer) {
            btn.classList.add("correct");
        } else if (i === index) {
            btn.classList.add("wrong");
        }
    });

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    scoreElement.textContent =
        `Your Score: ${score} / ${questions.length}`;
}

document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    resultElement.classList.add("hidden");
    quizElement.classList.remove("hidden");

    showQuestion();
});

showQuestion();
