document.addEventListener("DOMContentLoaded", function () {
    displayQuestion(); // Ensure the function starts only after loading
});
const questions = [
    { question: "Which trait do you value most?", options: ["Bravery", "Wisdom", "Loyalty", "Ambition"] },
    { question: "What would you do in a duel?", options: ["Attack first", "Analyze opponent", "Defend", "Find a clever trick"] },
    { question: "Pick a magical creature:", options: ["Phoenix", "Owl", "Badger", "Snake"] },
    { question: "Which element do you connect with?", options: ["Fire", "Air", "Earth", "Water"] },
    { question: "Which Hogwarts subject excites you the most?", options: ["Defense Against the Dark Arts", "Transfiguration", "Herbology", "Potions"] },
    { question: "You find a mysterious old book in the Restricted Section. Do you:", options: ["Read it immediately", "Research its origins", "Ask a professor", "Keep it a secret"] },
    { question: "What kind of friends do you prefer?", options: ["Adventurous & daring", "Intellectual & curious", "Loyal & kind", "Ambitious & strategic"] },
    { question: "What is your greatest strength?", options: ["Courage", "Intelligence", "Patience", "Determination"] },
    { question: "A friend is caught breaking the rules. Do you:", options: ["Cover for them", "Find a logical solution", "Encourage honesty", "Use it to your advantage"] },
    { question: "Choose a magical artifact:", options: ["The Sword of Gryffindor", "Ravenclaw’s Diadem", "Hufflepuff’s Cup", "Slytherin’s Locket"] }
];

const housePoints = { "Gryffindor": 0, "Ravenclaw": 0, "Hufflepuff": 0, "Slytherin": 0 };

let questionIndex = 0;

function displayQuestion() {
    if (questionIndex < questions.length) {
        document.getElementById("question").innerText = questions[questionIndex].question;
        const optionsDiv = document.getElementById("options");
        optionsDiv.innerHTML = "";
        questions[questionIndex].options.forEach((option, index) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => selectAnswer(index);
            optionsDiv.appendChild(button);
        });
    } else {
        showResult();
    }
}

function selectAnswer(index) {
    if (index === 0) housePoints["Gryffindor"]++;
    if (index === 1) housePoints["Ravenclaw"]++;
    if (index === 2) housePoints["Hufflepuff"]++;
    if (index === 3) housePoints["Slytherin"]++;

    questionIndex++;
    displayQuestion();
}

function showResult() {
    const sortedHouse = Object.keys(housePoints).reduce((a, b) => housePoints[a] > housePoints[b] ? a : b);
    document.getElementById("question").innerText = `You belong to ${sortedHouse}!`;
    document.getElementById("options").innerHTML = "";
}

// Start the quiz
displayQuestion();
