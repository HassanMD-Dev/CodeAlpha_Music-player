const audio = document.querySelector("#audio");
const img = document.querySelector("img");
const title = document.querySelector("h2");
const artist = document.querySelector("p");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const repeatBtn = document.getElementById("repeat");
const volume = document.getElementById("volume");
const progress = document.getElementById("progress");
const songs = {
  song1: {
    Image: "/music/img/khalid.jpg",
    title: "Tere Ik Chashm e Rehmat Se Tera Bimar Behtar Hai",
    artist: "Khalid Hussnain Khalid",
    src: "/music/Tere Ik Chashm e Rehmat Se Tera Bimar Behtar Hai - Khalid Hasnain Khalid.mp3",
  },
  song2: {
    Image: "/music/img/owais.jpg",
    title: "Mujhe Dar Pe Phir Bulana Madani Madine Wale ",
    artist: "Owais Raza Qadri",
    src: "/music/Mujhe Dar Pe Phir Bulana Madani Madine Wale by Owais Qadri.mp3",
  },
  song3: {
    Image: "/music/img/khudaya.jpg",
    title: "Khudaya",
    artist: "Asad Raza Attari",
    src: "/music/Asad Raza Attari __ Khudaya __ New Heart Touching Kalam 2021 __ Official Video(MP3_160K)_1.mp3",
  },
};
let songIndex = 0;
let isPlaying = false;

const loadSong = (song) => {
  img.src = song.Image || "/music/img/default.webp";
  img.alt = song.title;
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
};

const playSong = () => {
  isPlaying = true;
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  audio.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  audio.pause();
};

const prevSong = () => {
  songIndex =
    (songIndex - 1 + Object.keys(songs).length) % Object.keys(songs).length;
  loadSong(songs[Object.keys(songs)[songIndex]]);
  playSong();
};

const nextSong = () => {
  songIndex = (songIndex + 1) % Object.keys(songs).length;
  loadSong(songs[Object.keys(songs)[songIndex]]);
  playSong();
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});
prevBtn.addEventListener("click", () => prevSong());
nextBtn.addEventListener("click", () => nextSong());
volume.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.value = progressPercent || 0;
});
progress.addEventListener("input", (e) => {
  const duration = audio.duration;
  audio.currentTime = (e.target.value / 100) * duration;
});
audio.addEventListener("ended", () => nextSong());
loadSong(songs[Object.keys(songs)[songIndex]]);
