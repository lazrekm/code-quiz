function printHighscores() {
  // get scores from localstorage / set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sorts from higher to lower score
  highscores.sort(function (B, A) {
    return A.score - B.score;
  });

  highscores.forEach(function (score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // append on the page
    var olElement = document.querySelector("#highscores");
    olElement.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.querySelector("#clear").onclick = clearHighscores;

// run function
printHighscores();
