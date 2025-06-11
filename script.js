const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborghinis"],
    answer: "Hypertext Markup Language"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995"
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: "Facebook"
  }
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load progress if available
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let finalScore = localStorage.getItem("score");

// Display questions
quizData.forEach((q, index) => {
  const qDiv = document.createElement("div");
  qDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
  
  q.options.forEach((option) => {
    const optionId = `q${index}_${option}`;
    const isChecked = savedProgress[index] === option;

    qDiv.innerHTML += `
      <label>
        <input type="radio" name="question${index}" value="${option}" ${isChecked ? "checked" : ""}>
        ${option}
      </label><br/>
    `;
  });

  questionsContainer.appendChild(qDiv);
});

// Save progress on selection
questionsContainer.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const name = e.target.name; // question index
    const value = e.target.value;
    const index = parseInt(name.replace("question", ""));

    savedProgress[index] = value;
    sessionStorage.setItem("progress", JSON.stringify(savedProgress));
  }
});

// Handle submission
submitButton.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    const selected = savedProgress[index];
    if (selected === q.answer) score++;
  });

  scoreDisplay.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Show previous score if page reloaded after submission
if (finalScore !== null) {
  scoreDisplay.innerText = `Your score is ${finalScore} out of 5.`;
}
