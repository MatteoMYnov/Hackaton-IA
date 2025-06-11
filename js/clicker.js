let energy = 0;
let factories = 0;
let nuclear = 0;
let dumps = 0;
let highways = 0;
let airports = 0;
let coal = 0;
let interval;
let timerInterval;
let secondsElapsed = 0;

const MAX_BUY = 50;
const GOAL = 10000;

const updateElement = (id, value) => {
  document.getElementById(id).textContent = value;
};

function update() {
  updateElement("energy", energy);
  updateElement("factories", factories);
  updateElement("nuclear", nuclear);
  updateElement("dumps", dumps);
  updateElement("highways", highways);
  updateElement("airports", airports);
  updateElement("coal", coal);
  document.getElementById("progressBar").value = energy;

  if (energy >= GOAL) {
    document.getElementById("earth").onclick = null;
    document.getElementById("win-message").textContent = `Vous avez gagné, mais à quel prix ? Temps : ${secondsElapsed}s`;
    clearInterval(interval);
    clearInterval(timerInterval);
    disableAllButtons();
  }
}

function disableAllButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function startTimer() {
  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateElement("time", secondsElapsed);
  }, 1000);
}

function setupClickHandlers() {
  document.getElementById("earth").onclick = () => {
    if (energy < GOAL) {
      energy++;
      update();
    }
  };

  document.getElementById("buyFactory").onclick = () => {
    if (energy >= 10 && factories < MAX_BUY) {
      energy -= 10;
      factories++;
      update();
    }
  };

  document.getElementById("buyNuclear").onclick = () => {
    if (energy >= 100 && nuclear < MAX_BUY) {
      energy -= 100;
      nuclear++;
      update();
    }
  };

  document.getElementById("buyDump").onclick = () => {
    if (energy >= 500 && dumps < MAX_BUY) {
      energy -= 500;
      dumps++;
      update();
    }
  };

  document.getElementById("buyHighway").onclick = () => {
    if (energy >= 1000 && highways < MAX_BUY) {
      energy -= 1000;
      highways++;
      update();
    }
  };

  document.getElementById("buyAirport").onclick = () => {
    if (energy >= 2500 && airports < MAX_BUY) {
      energy -= 2500;
      airports++;
      update();
    }
  };

  document.getElementById("buyCoal").onclick = () => {
    if (energy >= 5000 && coal < MAX_BUY) {
      energy -= 5000;
      coal++;
      update();
    }
  };
}

function generateEnergy() {
  energy += factories * 1;
  energy += nuclear * 5;
  energy += dumps * 20;
  energy += highways * 30;
  energy += airports * 60;
  energy += coal * 100;
  update();
}

// Init
setupClickHandlers();
update();
startTimer();
interval = setInterval(generateEnergy, 1000);
