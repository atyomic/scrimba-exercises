let homeScore = document.getElementById('homeScore')
let guestScore = document.getElementById('guestScore')
let teamHome = document.getElementById('teamHome')
let teamGuest = document.getElementById('teamGuest')

let homeScoreValue = 0
let guestScoreValue = 0

function addPoints(team, point) {
  if (team === 'home') {
    homeScoreValue += point
    homeScore.innerText = homeScoreValue
  } else {
    guestScoreValue += point
    guestScore.innerText = guestScoreValue
  }
}

function checkWinner() {
  if (homeScoreValue > guestScoreValue) {
  teamHome.textContent = "HOME 👑"
  teamGuest.textContent = "GUEST 😭"
 } else if (homeScoreValue < guestScoreValue) {
    teamGuest.textContent = "GUEST 👑"
    teamHome.textContent = "HOME 😭"
 } else {
    teamGuest.textContent = "GUEST 😐"
    teamHome.textContent = "HOME 😐"
 }
}

function newGame() {
    homeScoreValue = 0
    guestScoreValue = 0
    homeScore.textContent = 0
    guestScore.textContent = 0
    teamHome.innerText = "HOME"
    teamGuest.innerText = "GUEST"
}
