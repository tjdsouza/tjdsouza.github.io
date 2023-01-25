// ELEMENT IDENTIFIERS SETUP

let startButtonTwo = document.getElementById("startButtonTwo");
let startButtonFour = document.getElementById("startButtonFour");

let add2 = document.getElementById("additionButtonTwo");
let sub2 = document.getElementById("subtractionButtonTwo");

let add4 = document.getElementById("additionButtonFour");
let sub4 = document.getElementById("subtractionButtonFour");
let mult4 = document.getElementById("multiplicationButtonFour");
let div4 = document.getElementById("divisionButtonFour");

let selectOperationBoxTwo = document.getElementById("selectOperationBoxTwo");
let selectOperationBoxFour = document.getElementById("selectOperationBoxFour");



document.getElementById("backArrow").addEventListener("click", () => {
    location.href = "index.html";
});



add2.addEventListener("click", function() {
    selectOperation("+");
});
sub2.addEventListener("click", function() {
    selectOperation("-");
});


add4.addEventListener("click", function() {
    selectOperation("+");
});
sub4.addEventListener("click", function() {
    selectOperation("-");
});
mult4.addEventListener("click", function() {
    selectOperation("x");
});
div4.addEventListener("click", function() {
    selectOperation("÷");
});

function showFourOptions() {
    selectOperationBoxFour.classList.remove("hidden");
    document.getElementById("startButtonFour").classList.remove("hidden");
    selectOperationBoxTwo.classList.add("hidden");
    document.getElementById("startButtonTwo").classList.add("hidden");
}
function showTwoOptions() {
    selectOperationBoxTwo.classList.remove("hidden");
    document.getElementById("startButtonTwo").classList.remove("hidden");
    selectOperationBoxFour.classList.add("hidden");
    document.getElementById("startButtonFour").classList.add("hidden");
}




// LOAD IN GRADE
var grade = sessionStorage.getItem("grade");

let navbarGradeLevel = document.getElementById("navbarGradeLevel");
// If no grade selected (loaded file directly, didn't start at index), redirect to start page
if (!grade) {
    location.href = "index.html";
}
navbarGradeLevel.innerHTML = grade;

// Show appropriate operations for the selected grade
if (grade === "Kindergarten" || grade === "Grade 1" || grade === "Grade 2") {
    showTwoOptions();
} else if (grade === "Grade 3" || grade === "Grade 4" || grade === "Grade 5") {
    showFourOptions();
}

// When a math type button is clicked, mark it as selected and unmark all other math type buttons
function selectOperation(operation) {
    // Enable Start button for both sets
    startButtonTwo.disabled = false;
    startButtonFour.disabled = false;

    // Style the selected button as "selected" and deselect any previously selected buttons
    if (operation === "+") {
        add4.classList.add("selected");
        add2.classList.add("selected");
        sub2.classList.remove("selected");
        sub4.classList.remove("selected");
        mult4.classList.remove("selected");
        div4.classList.remove("selected");
        sessionStorage.setItem("operation", "+");
    } else if (operation === "-") {
        sub4.classList.add("selected");
        sub2.classList.add("selected");
        add2.classList.remove("selected");
        add4.classList.remove("selected");
        mult4.classList.remove("selected");
        div4.classList.remove("selected");
        sessionStorage.setItem("operation", "-");
    } else if (operation === "x") {
        mult4.classList.add("selected");
        add2.classList.remove("selected");
        sub2.classList.remove("selected");
        add4.classList.remove("selected");
        sub4.classList.remove("selected");
        div4.classList.remove("selected");
        sessionStorage.setItem("operation", "x");
    } else if (operation === "÷") {
        div4.classList.add("selected");
        add2.classList.remove("selected");
        sub2.classList.remove("selected");
        add4.classList.remove("selected");
        sub4.classList.remove("selected");
        mult4.classList.remove("selected");
        sessionStorage.setItem("operation", "÷");
    }
}



function loadGame() {
    console.log("load(" + sessionStorage.getItem("grade") + ", " + sessionStorage.getItem("operation") + ")");
    sessionStorage.setItem("alreadyPlaying", true);

    location.href = "playgame.html";
}



// In case of returning from playgame.html to this page, load in session data and mark selected math type
console.log("alreadyPlaying is " + sessionStorage.getItem("alreadyPlaying"));
console.log("operation is " + sessionStorage.getItem("operation"));
if (sessionStorage.getItem("alreadyPlaying")) {
    selectOperation(sessionStorage.getItem("operation"));
    
    startButtonFour.innerHTML = "Resume";
    startButtonTwo.innerHTML = "Resume";
}
