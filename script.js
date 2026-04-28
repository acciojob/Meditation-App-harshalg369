//your JS code here. If required.
const video = document.querySelector("video");
const audio = document.querySelector("audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");

let duration = 600;
let currentTime = duration;

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    video.play();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = "Play";
  }
});

soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    audio.src = button.getAttribute("data-sound");
    video.querySelector("source").src = button.getAttribute("data-video");
    video.load();
    if (!audio.paused) {
      audio.play();
      video.play();
    }
  });
});

timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    duration = button.getAttribute("data-time");
    currentTime = duration;
    updateTime();
  });
});

audio.addEventListener("timeupdate", () => {
  currentTime = duration - audio.currentTime;

  if (currentTime <= 0) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    playBtn.textContent = "Play";
  }

  updateTime();
});

function updateTime() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
}