const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "ferobacter",
  "batalionar",
  "ustensila",
  "menajare",
  "sling",
  "macroaerofil",
  "astronomeste",
  "hipodermita",
  "potentiat",
  "tart",
  "insultator",
  "dumesnicire",
  "spumuta",
  "ludoterapie",
  "instrumenta",
  "stecli",
  "dot",
  "balbaitor",
  "depeizat",
  "angiomiom",
  "alfabetizat",
  "sincronizor",
  "izbranic",
  "etanseizare",
  "colpocitologie",
  "costisel",
  "rensufletire",
  "armos",
  "ataga",
  "spiranta",
  "calupciu",
  "lemnita",
  "picaro",
  "bagica",
  "comerciant",
  "antecreuzet",
  "drugina",
  "arabizare",
  "fumizare",
  "reizefendi",
  "trisca",
  "brunch",
  "milieu",
  "botosani",
  "fedeu",
  "murire",
  "heimatlos",
  "previnge",
  "microhenri",
  "litopisit",
  "lantut",
  "chinchina",
  "desputatiune",
  "resbel",
  "subuia",
  "portunide",
  "marcoava",
  "apelatie",
  "najdac",
  "croniciza",
  "merceriza",
  "paznic",
  "saxonic",
  "balbaila",
  "rotilita",
  "vultan",
  "smoching",
  "gabja",
  "harana",
  "zooprofilaxie",
  "minicarting",
  "buruire",
  "uredospor",
  "aerobiont",
  "funicularist",
  "epizotie",
  "barta",
  "eritroplazie",
  "frustratie",
  "ima",
  "inavuabil",
  "preabucura",
  "perifoliculita",
  "ciomagel",
  "marcus",
  "ireverentios",
  "disfundatura",
  "brenoire",
  "oospor",
  "mafleri",
  "gelos",
  "gangavit",
  "raspublica",
  "patrar",
  "froasare",
  "argimagzariu",
  "clapai",
  "rancheza",
  "laliu"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";

    playable = false;
  }
}

// Update the wrong letters
function updateWrongLetterEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //   check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 1000);
}

// Keydown letter press
window.addEventListener("keydown", e => {
  //   console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again

playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterEl();

  popup.style.display = "none";
});

displayWord();
