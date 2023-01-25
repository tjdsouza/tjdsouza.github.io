// ELEMENT IDENTIFIERS SETUP

let feedbackWrong = document.getElementById("feedbackWrong");
let feedbackRight = document.getElementById("feedbackRight");

let redoButton = document.getElementById("redoButton");
let skipButton = document.getElementById("skipButton");
let nextButton = document.getElementById("nextButton");

const checkAnswer = document.getElementById("checkAnswer");


// LOAD IN GRADE
let displayGrade = sessionStorage.getItem("grade");
let grade;
// If no grade selected (loaded file directly, didn't start at index), redirect to start page
if (!displayGrade) {
  location.href = "index.html";
}
if (displayGrade === "Kindergarten") {
  grade = 0;
} else {
  grade = displayGrade.charAt(displayGrade.length-1);
}

var globalOperation = sessionStorage.getItem("operation");
// If no operation selected (loaded file directly, didn't start at index), redirect to start page
if (!globalOperation) {
  location.href = "index.html";
}

console.log("Playing " + displayGrade + ", " + globalOperation);

if (displayGrade === "Grade 5") {
  document.getElementById("negateButton").style.display = "block";
}

document.getElementById("navbarGradeLevel").innerHTML = displayGrade;


let multiplication_sums = [
  (0, 0),
  (0, 0),
  (0, 0),
  (0, 14), // 14^2 = 196
  (0, 32), // 31^2 = 961
  (0, 32),
];
let division_sums = [(0, 0), (0, 0), (0, 0), (0, 14), (0, 32), (0, 32)];
let addition_sums = [
  (0, 11),
  (0, 40),
  (0, 1001),
  (0, 1001),
  (0, 1001),
  (-1001, 1001),
];
let subtraction_sums = [
  (0, 11),
  (0, 40),
  (0, 1001),
  (0, 1001),
  (0, 1001),
  (-1001, 1001),
];

let opConstraints;
// Curriculum notes:
// Kindergarten: max startingnum is less than 11; uses pictures (maybe picture and number mode)
// Grade 1: max startingnum is less than 40; addition and subtraction mode; no negative numbers
// Grade 2: max startingnum is less than 1001; addition and subtraction mode; no negative numbers
// Grade 3: max startingnum is less than 1001; multiplication, division, and simple fraction add/subtract mode; no negative numbers
// Grade 4: max startingnum is less than 1001; multiplication, division, add/subtract fractions and decimals (one place)
// Grade 5: max startingnum is less than 1001; multiply and divide; add/subtract fractions, decimals, negative numbers



document.getElementById("homeButton").addEventListener("click", () => {
  location.href = "index.html";
});




operations = ["+", "-", "÷", "x"];
function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}


function newProblem(operation, grade) {
  checkAnswer.disabled = true;
  if (operation === "+") {
    var opConstraints = addition_sums;
  } else if (operation === "-") {
    var opConstraints = subtraction_sums;
  } else if (operation === "x") {
    var opConstraints = multiplication_sums;
  } else {
    var opConstraints = division_sums;
  }
  let startingnum = getRandomInt(opConstraints[grade]);

  if (operation === "+") {
    var num1 = getRandomInt(startingnum);
    var num2 = startingnum - num1;
    var correct_answer = num1 + num2;
  }
  //   Limit subtraction to postitive numbers
  if (operation === "-" && grade < 5) {
    var num1 = getRandomInt(startingnum);
    var num2 = getRandomInt(num1);
    var correct_answer = num1 - num2;
  } else if (operation === "-") {
    var num1 = getRandomInt(startingnum);
    var num2 = getRandomInt(startingnum);
    var correct_answer = num1 - num2;
  }
  if (operation === "x") {
    var num1 = getRandomInt(startingnum);
    var num2 = getRandomInt(startingnum);
    var correct_answer = num1 * num2;
  }
  if (operation === "÷") {
    var numA = getRandomInt(startingnum);
    var numB = getRandomInt(startingnum);
    var correct_answer = numA;
    num1 = numB * numA;
    num2 = numB;
  }
  let displayOperation;
  if (operation == "-") {displayOperation = "–";}
  else if (operation == "x") {displayOperation = "×";}
  else {displayOperation = operation;}

  document.getElementById(
    "equation"
  ).innerHTML = `${num1} ${displayOperation} ${num2} =`;
  document.getElementById("userAnswer").innerHTML = `?`;

  checkAnswer.addEventListener("click", function () {
    let user_input = parseInt(document.getElementById("userAnswer").innerHTML);
    let result = user_input === correct_answer;

    console.clear();
    console.log("correct: " + correct_answer);
    for (let i = 0; i <= 30; i++) {
      let isCorrect = i === correct_answer;
      if (isCorrect) {
        console.log(correct_answer + " == " + i + " is TRUE");
      }
    }

    if (result == true) {
      feedbackWrong.classList.add("hidden");
      feedbackRight.classList.remove("hidden");
    } else {
      feedbackRight.classList.add("hidden");
      feedbackWrong.classList.remove("hidden");
    }
  });
}

function hideFeedback() {
  feedbackRight.classList.add("hidden");
  feedbackWrong.classList.add("hidden");
}

var switchMode = document.getElementById("changeOperationButton");

switchMode.addEventListener("click", function () {
  location.href = "startgame.html";
});

newProblem(globalOperation, grade);



//  The NumPad Code
let answer = "?";

update();

function inputController(char) {
  console.clear();
  char = char.innerText;
  console.log("Button Pressed: " + char);
  switch(char) {
    case "(–)":
      negateAnswer();
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case ".":
      addCharacter(char);
      break;
  }
  update();
}

function negateAnswer() {
  answer = String(answer);
  if (answer.charAt(0) === "-") {
    console.log("answer.charAt(0) is " + answer.charAt(0));
    answer = answer.substring(1);
  } else {
    answer = "-" + answer;
  }
}

function clearScreen() {
  answer = "?";
  checkAnswer.disabled = true;
  update();
}

function removeLastChar() {
  answer = String(answer).slice(0, -1);
  if(!answer || answer === "-"){
    answer = "?";
    checkAnswer.disabled = true;
  }
  update();
}

function addCharacter(char) {
  if (char == "." && answer.includes(".")) {
    return;
  }
  if (answer == "0" || answer == "?") {
    answer = char;
    checkAnswer.disabled = false;
    return;
  } else if (answer == "-0" || answer == "-?") {
    answer = "-" + char;
    checkAnswer.disabled = false;
    return;
  }
  if (answer.length < 6 ) { answer+=char;}
}

function update() {
  document.getElementById("userAnswer").innerHTML = answer;
}


let trackBox = document.getElementById("trackBox");
let trackRecord = [];


// Call this with the result of the latest attempt to add a track icon
function updateTrack(latest) {
  addToTrack(latest);
  trackRecord.push(latest); // add to sessionStorage
  sessionStorage.setItem("trackRecord", JSON.stringify(trackRecord));
}


// Call this on page load to fill in any session data for track record
function initializeTrack() {
  if (sessionStorage.getItem("trackRecord")) {
    trackRecord = JSON.parse(sessionStorage.getItem("trackRecord"));
  }
  for (i in trackRecord) {
    addToTrack(trackRecord[i]);
  }
}

function addToTrack(item) {
  if (trackBox.childElementCount >= 11) {
    console.log("Passover of the track children... \nRemoved " + trackBox.children[1].src);
    trackBox.removeChild(trackBox.children[1]);
  }
  let trackEntry = document.createElement("img");
  trackEntry.classList.add("trackIcon");
  switch (item) {
    case "right":
      trackEntry.src = "./assets/check.svg";
      break;
    case "wrong":
      trackEntry.src = "./assets/wrong.svg";
      break;
    case "skip":
      trackEntry.src = "./assets/skip_icon.svg";
      trackEntry.classList.add("skipArrow");
      trackEntry.classList.add("upsideDown");
      break;
  }
  trackBox.appendChild(trackEntry); // add to DOM
}



initializeTrack();


redoButton.addEventListener("click", function () {
  updateTrack("wrong");
  clearScreen();
  update();
  hideFeedback();
});
skipButton.addEventListener("click", function () {
  updateTrack("skip");
  newProblem(globalOperation, grade);
  clearScreen();
  update();
  hideFeedback();
});
nextButton.addEventListener("click", function () {
  updateTrack("right")
  newProblem(globalOperation, grade);
  clearScreen();
  update();
  hideFeedback();
});
