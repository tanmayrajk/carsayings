const sayingTextEl = document.getElementById("saying-text");
const newSayingBtn = document.getElementById("new-saying-btn");
const saveSayingBtn = document.getElementById("save-saying-btn");

function generateRandomSaying() {
  const numberOfParts = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  const parts = [];
  const possiblePunctuation = [".", "!", "?", ",", ";"];
  for (let i = 0; i < numberOfParts; i++) {
    const numberOfWords = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    let part = "";
    for (let j = 0; j < numberOfWords; j++) {
      part += " meow";
    }
    const punctuation =
      possiblePunctuation[
        Math.floor(Math.random() * possiblePunctuation.length)
      ];
    part += punctuation;
    parts.push(part);
  }
  return parts.join(" ").trim();
}

function showRandomSaying() {
  const saying = generateRandomSaying();
  sayingTextEl.textContent = `"${saying}"`;
}

function saveSaying() {
  const saying = sayingTextEl.textContent.slice(1, -1);
  const savedSaying = JSON.parse(localStorage.getItem("savedSaying")) || [];
  if (!savedSaying.includes(saying)) {
    savedSaying.push(saying);
    localStorage.setItem("savedSaying", JSON.stringify(savedSaying));
  } else {
    const index = savedSaying.indexOf(saying);
    if (index > -1) {
      savedSaying.splice(index, 1);
      localStorage.setItem("savedSaying", JSON.stringify(savedSaying));
    }
  }
}

function updateSaveSayingBtnText() {
  const savedSaying = JSON.parse(localStorage.getItem("savedSaying")) || [];
  if (savedSaying.includes(sayingTextEl.textContent.slice(1, -1))) {
    saveSayingBtn.innerHTML = '<i class="ti ti-bookmark-filled"></i> saved';
  } else {
    saveSayingBtn.innerHTML = '<i class="ti ti-bookmark"></i> save';
  }
}

window.addEventListener("load", () => {
  showRandomSaying();
  updateSaveSayingBtnText();
});

saveSayingBtn.addEventListener("click", () => {
  saveSaying();
  updateSaveSayingBtnText();
});

newSayingBtn.addEventListener("click", () => {
  showRandomSaying();
  updateSaveSayingBtnText();
});
