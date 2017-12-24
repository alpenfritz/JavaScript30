// (1) Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

// (2) Build functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();

  // ALTERNATIVE WAY:
  // if (video.paused) {
  //   video.play(); 
  // } else {
  //   video.pause();
  // }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚'; // 'this' is bound to video
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip); // 'this' is bound to skipButtons
  video.currentTime += parseFloat(this.dataset.skip); // convert to number, since values in dataset are strings
}

function handleRangeUpdate() {
  // console.log(this.name);
  // console.log(this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  // console.log(event); // check for offsetX
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// (3) Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
// ALTERNATIVELY:
// progress.addEventListener('mousemove', (event) => {
//   if (mousedown) {
//     scrub(event);
//   }
// });
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
