const startbutton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const questionElement = document.getElementById("question");
const answerBtnElement = document.getElementById("answer-btn");

let shuffleQuestions, currentQuestionIndex;

startbutton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});
function startGame() {
  startbutton.classList.add("hide");
  shuffleQuestions = questions.sort(() => Math.random - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  nextQuestion();
}
function nextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(questionz) {
  questionElement.innerText = questionz.question;
  questionz.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.currect = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnElement.appendChild(button);
  });
}

function resetState() {
    nextButton.classList.add("hide");
  while(answerBtnElement.firstChild) {
    answerBtnElement.removeChild(answerBtnElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.currect;

  setStatusClass(document.body, correct);

  Array.from(answerBtnElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.currect);
  });
  if(shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  }else{
    startbutton.innerText = "Restart";
    startbutton.classList.remove("hide");
  }
}

function setStatusClass(element, currect) {
  clearStatusClass(element);
  if (currect) {
    element.classList.add("currect");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("currect");
  element.classList.remove("wrong");
}

// Questions
const questions = [
  {
    question: "6+3 ?",
    answers: [
      { text: "7", correct: false },
      { text: "5", correct: false },
      { text: "9", correct: true },
      { text: "1", correct: false },
    ],
  },
  {
    question: "6+5 ?",
    answers: [
      { text: "11", correct: true },
      { text: "9", correct: false },
      { text: "7", correct: false },
      { text: "0", correct: false },
    ],
  },
  {
    question: "9+5 ?",
    answers: [
      { text: "11", correct: false },
      { text: "9", correct: false },
      { text: "14", correct: true },
      { text: "0", correct: false },
    ],
  },
];
