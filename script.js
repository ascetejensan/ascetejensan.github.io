const questions = [
    { question: "Which trait do you value most?", options: ["Bravery", "Wisdom", "Loyalty", "Ambition"] },
    { question: "What would you do in a duel?", options: ["Attack first", "Analyze opponent", "Defend", "Find a clever trick"] },
    { question: "Pick a magical creature:", options: ["Phoenix", "Owl", "Badger", "Snake"] },
];

let currentQuestion = 0;
let housePoints = { Gryffindor: 0, Ravenclaw: 0, Hufflepuff: 0, Slytherin: 0 };

function nextQuestion() {
    if (currentQuestion < questions.length) {
        const quizContainer = document.getElementById("quiz-container");
        quizContainer.innerHTML = `<h3>${questions[currentQuestion].question}</h3>`;
        questions[currentQuestion].options.forEach((option, index) => {
            quizContainer.innerHTML += `<button onclick="selectOption(${index})">${option}</button><br>`;
        });
        currentQuestion++;
    } else {
        showResult();
    }
}

function selectOption(index) {
    if (index === 0) housePoints.Gryffindor++;
    if (index === 1) housePoints.Ravenclaw++;
    if (index === 2) housePoints.Hufflepuff++;
    if (index === 3) housePoints.Slytherin++;
    nextQuestion();
}

function showResult() {
    const resultHouse = Object.keys(housePoints).reduce((a, b) => housePoints[a] > housePoints[b] ? a : b);
    document.getElementById("result").innerText = "You belong to " + resultHouse + "!";
}

nextQuestion();
