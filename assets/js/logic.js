// Define a set of questions
var questions = [
  {
    title: "How many members does the rap band PNL compose of? ",
    choices: ["Four", "Six", "Two", "Three"],
    answer: "Two",
  },
  {
    title: "What does PNL mean?",
    choices: [
      "Peace N'Lovés",
      "Papa, Nabil, Légende",
      "Peace and Love",
      "None of the above",
    ],
    answer: "Peace N'Lovés",
  },
  {
    title: "What is the family that unites them?",
    choices: ["Cousins", "Father son", "Friends", "Brothers"],
    answer: "Brothers",
  },
  {
    title: "What is the name of their first album?",
    choices: ["Que la mif", "Deux frères", "Dans la légende", "Le Monde Chico"],
    answer: "Le Monde Chico",
  },
  {
    title: "What certification did they obtain in August 2020?",
    choices: ["Double platinum", "Platinum", "Gold", "Double diamond"],
    answer: "Double diamond",
  },
];

// define other variables
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

var questionsElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var choicesElement = document.querySelector("#choices");
var feedbackElement = document.querySelector("#feedback");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start");
var initialsElement = document.querySelector("#initials");

// timer starts
function startQuiz() {
  var startScreenElement = document.querySelector("#start-screen");
  startScreenElement.setAttribute("class", "hide");

  questionsElement.removeAttribute("class");

  timerId = setInterval(clockTicking, 1000);

  timerElement.textContent = time;

  showQuiz();
}

// show questions and choices
function showQuiz() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleElement = document.querySelector("#question-title");
  titleElement.textContent = currentQuestion.title;

  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    choicesElement.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    // time penalty
    time -= 5;

    if (time < 0) {
      time = 0;
    }

    // display new time
    timerElement.textContent = time;

    // after question is answered, show if correct or wrong
    feedbackElement.textContent = "WRONG!";
  } else {
    feedbackElement.textContent = "CORRECT!";
  }

  feedbackElement.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    showQuiz();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenElement = document.querySelector("#end-screen");
  endScreenElement.removeAttribute("class");

  // show final score
  var finalScoreElement = document.querySelector("#final-score");
  finalScoreElement.textContent = time;

  // hide questions section
  questionsElement.setAttribute("class", "hide");
}

function clockTicking() {
  // update time
  time--;
  timerElement.textContent = time;

  // end quiz when time is over
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initialsElement.value.trim();

  // if initials not blank save to local storage
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    // push to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to scores page
    window.location.href = "highscores.html";
  }
}

// button to submit initials
submitButton.onclick = saveHighscore;

// button to start quiz
startButton.onclick = startQuiz;
