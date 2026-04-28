const video = document.querySelector("video");
const audio = document.querySelector("audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");

let duration = 600;

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

soundButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    audio.src = this.getAttribute("data-sound");
    video.querySelector("source").src = this.getAttribute("data-video");
    video.load();

    if (!audio.paused) {
      audio.play();
      video.play();
    }
  });
});

timeButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    duration = this.getAttribute("data-time");
    audio.currentTime = 0;
  });
});

audio.addEventListener("timeupdate", () => {
  let remaining = duration - audio.currentTime;

  let minutes = Math.floor(remaining / 60);
  let seconds = Math.floor(remaining % 60);

  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (remaining <= 0) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    playBtn.textContent = "Play";
  }
});