const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start-screen");
const loseScreen = document.getElementById("lose-screen");
const winScreen = document.getElementById("win-screen");
// the title of the pet

const petTitle = document.getElementById("pet-title");
const petAge = document.getElementById("pet-age");

// input elements for the form
const petNameForm = document.getElementById("petNameForm");
const petNameInput = document.getElementById("petNameInput");

// indicators
const hungerIndicator = document.getElementById("hunger-indicator");
const boredomIndicator = document.getElementById("boredom-indicator");
const sleepIndicator = document.getElementById("sleep-indicator");

// buttons
const feedBtn = document.getElementById("feed-btn");
const sleepBtn = document.getElementById("sleep-btn");
const playBtn = document.getElementById("play-btn");

// game-icon
const playingIcon = document.getElementById("playing-icon");

// warning for the name
const warningLabel = document.getElementById("warning-label");

let restartGameButtons = document.querySelectorAll(".restart-btn");
let newGameButtons = document.querySelectorAll(".new-game-btn");
// audio

// const smellyCat = new Audio("./app/smellyCat.mp3");

// document.body.addEventListener("mousemove", ()=>{  smellyCat.play()})

// create class for creating tamagotchi objects

class Cat {
  constructor(name) {
    this.hunger = 0;
    this.sleepiness = 0;
    this.boredom = 0;
    this.age = 0;
    this.name = name;
    this.sleepIcon = "&#128575;";
    this.wokeIcon = "&#128568;";
    this.sleeping = false;
  }

  calculateMetrics() {
    hungerIndicator.style.width = `${this.hunger * 10}%`;
    sleepIndicator.style.width = `${this.sleepiness * 10}%`;
    boredomIndicator.style.width = `${this.boredom * 10}%`;

    if (this.hunger >= 7) {
      hungerIndicator.classList.add("warning");
    } else {
      hungerIndicator.classList.remove("warning");
    }
    if (this.sleep >= 7) {
      sleepIndicator.classList.add("warning");
    } else {
      sleepIndicator.classList.remove("warning");
    }
    if (this.boredom >= 7) {
      boredomIndicator.classList.add("warning");
    } else {
      boredomIndicator.classList.remove("warning");
    }
  }
  getName() {
    return this.name;
  }

  //   getters
  getHunger() {
    return this.hunger;
  }
  getAge() {
    return this.age;
  }
  getSleepiness() {
    return this.sleepiness;
  }
  getSleeping() {
    return this.sleeping;
  }
  getBoredom() {
    return this.boredom;
  }
  //   setters
  setHunger(value) {
    if (value >= 0) {
      this.hunger = value;
    } else {
      this.hunger = 0;
    }
  }
  setAge(value) {
    if (value >= 0) {
      this.age = value;
    } else {
      this.age = 0;
    }
  }
  setSleepiness(value) {
    if (value >= 0) {
      this.sleepiness = value;
    } else {
      this.sleepiness = 0;
    }
  }
  setSleeping() {
    this.sleeping = !this.sleeping;
  }
  setBoredom(value) {
    if (value >= 0) {
      this.boredom = value;
    } else {
      this.boredom = 0;
    }
  }
}



function startGame(name) {

  let globalSeconds = 0;
  let cat = new Cat(name);
  petAge.innerHTML = `Age: ${cat.age.toString()}`;

 

  //   getting restart game and newGame buttons
  playingIcon.innerHTML = cat.wokeIcon;
  playingIcon.className = "play-icon";
  sleepBtn.innerHTML = "Sleep";
  playBtn.removeAttribute("disabled");
  feedBtn.removeAttribute("disabled");
  document.getElementById("inner-container").classList.remove("dark");

 

  //   timer interval
  function addSeconds() {
    globalSeconds += 1;
    if (globalSeconds % 3 == 0) {
      cat.setHunger(cat.getHunger() + 3);
      if (!cat.getSleeping()) {
        cat.setSleepiness(cat.getSleepiness() + 2);
      }
    }
    if (globalSeconds % 2 == 0) {
      cat.setBoredom(cat.getBoredom() + 2);
      if (cat.getSleeping()) {
        cat.setSleepiness(cat.getSleepiness() - 2);
      }
    }
    if (cat.getAge() == 9) {
      cat.wokeIcon = "&#129409;";
      cat.sleepIcon = "&#128164;";
      setAvatar();
    }
    if (globalSeconds % 4 == 0) {
      cat.setAge(cat.getAge() + 1);
      petAge.innerHTML = `Age: ${cat.age.toString()}`;
    }
    cat.calculateMetrics();
    checkGame();
  }
  var timerInterval = setInterval(addSeconds, 1000);
  cat.calculateMetrics();
  //   adding button listeners

  feedBtn.addEventListener("click", () => {
    cat.setHunger(cat.getHunger() - 2);
    cat.calculateMetrics();
  });

  function setAvatar() {
    if (cat.getSleeping()) {
      playingIcon.innerHTML = cat.sleepIcon;
      playingIcon.className = "sleep-icon";
      sleepBtn.innerHTML = "Wake";
      feedBtn.setAttribute("disabled", "");
      playBtn.setAttribute("disabled", "");
      document.getElementById("inner-container").classList.add("dark");
    } else {
      playingIcon.innerHTML = cat.wokeIcon;
      playingIcon.className = "play-icon";
      sleepBtn.innerHTML = "Sleep";
      playBtn.removeAttribute("disabled");
      feedBtn.removeAttribute("disabled");
      document.getElementById("inner-container").classList.remove("dark");
    }
  }

  sleepBtn.addEventListener("click", () => {
    cat.setSleeping();
    setAvatar();
  });
  playBtn.addEventListener("click", () => {
    cat.setBoredom(cat.getBoredom() - 2);
    cat.calculateMetrics();
  });

  restartGameButtons.forEach((item) => {
    item.addEventListener("click", () => {
      gameScreen.style.display = "flex";
      startScreen.style.display = "none";
      winScreen.style.display = "none";
      loseScreen.style.display = "none";

      clearInterval(timerInterval);
      startGame(cat.name);
    });
  });
  newGameButtons.forEach((item) => {
    item.addEventListener("click", () => {
      gameScreen.style.display = "none";
      startScreen.style.display = "flex";
      winScreen.style.display = "none";
      loseScreen.style.display = "none";

      clearInterval(timerInterval);
    });
  });

  function checkGame() {
    if (cat.getHunger() >= 10 || cat.getBoredom() >= 10 || cat.getSleepiness() >= 10) {
      gameOver = true;
      loseScreen.style.display = "flex";
      gameScreen.style.display = "none";
      winScreen.style.display = "none";
      document.getElementById("dead-msg").innerHTML = `RIP ${cat.getName()}`;
      document.getElementById("dead-msg-age").innerHTML = `Age: ${cat.getAge()}`;
      clearInterval(timerInterval);
      document.getElementById("inner-container").classList.remove("dark");
    } else if (cat.getAge() >= 13) {
      gameScreen.style.display = "none";
      winScreen.style.display = "flex";
      loseScreen.style.display = "none";
      document.getElementById("dead-msg-win").innerHTML = `RIP ${cat.getName()}`;
      document.getElementById("dead-msg-age-win").innerHTML = `Age: ${cat.getAge()}`;
      clearInterval(timerInterval);
      document.getElementById("inner-container").classList.remove("dark");
    }
  }
}

petNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (petNameInput.value.trim() === "") {
    petNameForm.classList.add("warning");
  } else {
    startGame(petNameInput.value.trim());
    petNameInput.value = "";
    gameScreen.style.display = "flex";
    startScreen.style.display = "none";

  }
});

petNameInput.addEventListener("keypress", (e) => {
  petNameForm.classList.remove("warning");
});
