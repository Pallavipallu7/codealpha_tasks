const songs = [
  {
    title: "DEVARA",
    src: "audio1.mp3",
    artist: "Anirudh Ravichander",
    cover: "coverimage.jpg"
  },
  {
    title: "LOVE ME LIKE YOU DO",
    src: "audio2.mp3",
    artist: "Ellie Goulding",
    cover: "coverimage.jpg"
  },
  {
    title: "PERFECT",
    src: "audio3.mp3",
    artist: "Ed Sheeran",
    cover: "coverimage.jpg"
  }
];

let currentIndex = 0;
const audio = new Audio();
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverEl.src = song.cover;
  document.querySelectorAll('#playlist li').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶';
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function updateProgress() {
  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (!isNaN(duration)) {
    audio.currentTime = (clickX / width) * duration;
  }
}

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = song.title + " - " + song.artist;
  li.addEventListener('click', () => {
    currentIndex = index;
    loadSong(currentIndex);
    playSong();
  });
  playlistEl.appendChild(li);
});

loadSong(currentIndex);
audio.volume = volumeSlider.value;
