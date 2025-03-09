// Questions and Answers
const questions = [
    { q: "Which trait do you value most?", options: ["Bravery", "Wisdom", "Loyalty", "Ambition"] },
    { q: "What would you do in a duel?", options: ["Attack first", "Analyze opponent", "Defend", "Find a clever trick"] },
    { q: "Pick a magical creature:", options: ["Phoenix", "Owl", "Badger", "Snake"] },
    { q: "Which element do you connect with?", options: ["Fire", "Air", "Earth", "Water"] },
    { q: "Which Hogwarts subject excites you the most?", options: ["Defense Against the Dark Arts", "Transfiguration", "Herbology", "Potions"] },
    { q: "You find a mysterious old book in the Restricted Section. Do you:", options: ["Read it immediately", "Research its origins", "Ask a professor", "Keep it a secret"] },
    { q: "What kind of friends do you prefer?", options: ["Adventurous & daring", "Intellectual & curious", "Loyal & kind", "Ambitious & strategic"] },
    { q: "What is your greatest strength?", options: ["Courage", "Intelligence", "Patience", "Determination"] },
    { q: "A friend is caught breaking the rules. Do you:", options: ["Cover for them", "Find a logical solution", "Encourage honesty", "Use it to your advantage"] },
    { q: "Choose a magical artifact:", options: ["The Sword of Gryffindor", "Ravenclaw’s Diadem", "Hufflepuff’s Cup", "Slytherin’s Locket"] }
];

// House Points System
let housePoints = { Gryffindor: 0, Ravenclaw: 0, Hufflepuff: 0, Slytherin: 0 };
let questionIndex = 0;
//Load background image
const bgImage = new Image();
bgImage.src = 'potterhouse.webp';
// Get elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const bgMusic = document.getElementById("bg-music");

// Function to Load Questions
function loadQuestion() {
    if (questionIndex < questions.length) {
        questionElement.textContent = questions[questionIndex].q;
        optionsContainer.innerHTML = "";
        
        questions[questionIndex].options.forEach((option, index) => {
            let button = document.createElement("button");
            button.classList.add("option");
            button.textContent = option;
            button.onclick = () => selectOption(index);
            optionsContainer.appendChild(button);
        });

    } else {
        // Display House Result
        let sortedHouse = Object.keys(housePoints).reduce((a, b) => housePoints[a] > housePoints[b] ? a : b);
        questionElement.textContent = `You belong to ${sortedHouse}!`;
        optionsContainer.innerHTML = "";
    }
}

// Function to Handle Option Selection
function selectOption(index) {
    let house = ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"][index];
    housePoints[house] += 1;
    questionIndex++;
    loadQuestion();
}

// Auto-Play Music on User Interaction
document.addEventListener("click", function () {
    if (bgMusic.paused) {
        bgMusic.play().catch(error => console.log("Autoplay blocked"));
    }
});

// Start Quiz
loadQuestion();
