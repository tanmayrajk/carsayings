const sayingTextEl = document.getElementById("saying-text");
const sayingAuthorEl = document.getElementById("saying-author");
const saveSayingBtn = document.getElementById("save-saying-btn");
const prevSayingBtn = document.getElementById("prev-saying-btn");
const nextSayingBtn = document.getElementById("next-saying-btn");
const currentIndexEl = document.getElementById("current-index");
const carPicEl = document.getElementById("car-pic");

let currentIndex = 0;
let savedSayings = JSON.parse(localStorage.getItem("savedSaying")) || [];

function setRandomCarPic() {
  const carPics = [
    "0.png",
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
  ];
  const randomIndex = Math.floor(Math.random() * carPics.length);
  carPicEl.src = carPics[randomIndex];
  carPicEl.alt = "car";
}

function showSaying(index) {
  if (savedSayings.length === 0) {
    sayingTextEl.textContent = "no saved sayings.";
    sayingAuthorEl.hidden = true;
    currentIndexEl.textContent = "0/0";
    return;
  }
  sayingAuthorEl.hidden = false;
  if (index < 0 || index >= savedSayings.length) {
    return;
  }
  currentIndex = index;
  sayingTextEl.textContent = `"${savedSayings[currentIndex]}"`;
  currentIndexEl.textContent = `${currentIndex + 1}/${savedSayings.length}`;
}

function updateSaveSayingBtnText() {
  if (savedSayings.includes(sayingTextEl.textContent.slice(1, -1))) {
    saveSayingBtn.innerHTML = '<i class="ti ti-bookmark-filled"></i> saved';
  } else {
    saveSayingBtn.innerHTML = '<i class="ti ti-bookmark"></i> save';
  }
}

function unsaveSaying() {
  const saying = sayingTextEl.textContent.slice(1, -1);
  const index = savedSayings.indexOf(saying);
  if (index > -1) {
    savedSayings.splice(index, 1);
    localStorage.setItem("savedSaying", JSON.stringify(savedSayings));
    if (currentIndex > savedSayings.length - 1) {
      currentIndex = savedSayings.length - 1;
    }
    showSaying(currentIndex);
    updateSaveSayingBtnText();
    setRandomCarPic();
  }
}

window.addEventListener("load", () => {
  showSaying(currentIndex);
  updateSaveSayingBtnText();
  setRandomCarPic();
});

nextSayingBtn.addEventListener("click", () => {
  if (savedSayings.length > 0) {
    currentIndex = (currentIndex + 1) % savedSayings.length;
    showSaying(currentIndex);
    updateSaveSayingBtnText();
    setRandomCarPic();
  }
});

prevSayingBtn.addEventListener("click", () => {
  if (savedSayings.length > 0) {
    currentIndex =
      (currentIndex - 1 + savedSayings.length) % savedSayings.length;
    showSaying(currentIndex);
    updateSaveSayingBtnText();
    setRandomCarPic();
  }
});

saveSayingBtn.addEventListener("click", () => {
  unsaveSaying();
});
