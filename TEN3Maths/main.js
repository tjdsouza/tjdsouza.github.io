function chooseGrade(grade) {
    if (sessionStorage.getItem("grade")) {
        if (sessionStorage.getItem("grade") != grade) {
            sessionStorage.clear();
        }
    }

    sessionStorage.setItem("grade", grade);

    location.href = "startgame.html";
}
