let timer;
let totalTime;
let currentTime;
const progressBar = document.querySelector('.CircularProgressbar-path');
const textElement = document.querySelector('.CircularProgressbar-text');

function startTimer(seconds=60) {
  totalTime = seconds;
  currentTime = seconds;
  clearInterval(timer);

  timer = setInterval(function () {
    currentTime--;
    if (currentTime < 0) {
      clearInterval(timer);
    } else {
      updateProgress(currentTime);
    }
  }, 1000);
}

function updateProgress(currentTime) {
  const percentage = ((totalTime - currentTime) / totalTime) * 100;
  const dashoffset = ((100 - percentage) / 100) * 289.027;
  progressBar.style.strokeDashoffset = dashoffset;
  textElement.textContent = currentTime;
}
startTimer()
setInterval(startTimer,60000)