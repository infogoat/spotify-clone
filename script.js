console.log("Welcome to spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
  { songName: "hyuna I'm not cool", filePath: "songs/11 (5).mp3", coverPath: "covers/11 (5).jpg" },
  { songName: "sugar crush", filePath: "songs/11 (4).mp3", coverPath: "covers/11 (4).jpeg" },
  { songName: "cuppy cake song", filePath: "songs/11 (7).mp3", coverPath: "covers/11 (7).jpeg" },
  { songName: "breathless song", filePath: "songs/11 (3).mp3", coverPath: "covers/11 (3).jpeg" },
  { songName: "aishite aishite", filePath: "songs/11 (6).mp3", coverPath: "covers/11 (6).jpeg" },
  { songName: "sukidakara", filePath: "songs/11 (2).mp3", coverPath: "covers/11 (2).jpeg" },
  { songName: "we don't talk anymore", filePath: "songs/11 (1).mp3", coverPath: "covers/11 (1).jpeg" }
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  let playButton = element.querySelector('.playButton'); // assuming you have a playButton class on each song item
  playButton.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent the song item click event from triggering
    songIndex = i;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    togglePlayPause(playButton);
  });

  element.addEventListener('click', () => {
    songIndex = i;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  });
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
  togglePlayPause(masterPlay);
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('playButton')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};

Array.from(document.getElementsByClassName('playButton')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.dataset.index);
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    togglePlayPause(e.target);
  });
});

document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});

function togglePlayPause(button) {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    button.classList.remove('fa-play-circle');
    button.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    button.classList.remove('fa-pause-circle');
    button.classList.add('fa-play-circle');
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
}
const timerElement = document.getElementById('timer');


let currentTime = 0;
let duration = 0;

audioElement.addEventListener('loadedmetadata', () => {
  duration = audioElement.duration;
});

audioElement.addEventListener('timeupdate', () => {
  currentTime = audioElement.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const audioElement = document.querySelector('audio'); // assuming you have an audio element
  timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
});