import "./style.css";

// App
const app = document.querySelector("[data-app]");

// Modal Elements
const modal = document.querySelector("[data-el-modal]") as HTMLDialogElement;
const settingsButton = document.querySelector("[data-settings-button]");
const closeModalBtn = document.querySelector("[data-close-modal]");

// Form Elements
const settingsForm = document.querySelector("[data-form]");
const inputPomodoro = document.getElementById("pomodoro");
const inputShortBreak = document.getElementById("short-break");
const inputLongBreak = document.getElementById("long-break");
let selectedColor = 1;
let selectedFont = 1;
// Type Buttons
const typeButtons = document.querySelectorAll("[data-type-state]");
const colorButtons = document.querySelectorAll("[data-color-circle]");

// Timer Elements
let pomodoroTime = 25;
let shortBreakTime = 5;
let longBreakTime = 15;
let timerPaused = true;
let selectedTime = "pomodoro";
let currentTime: number;
let startingTime: number;
let percentageCircleTracker = 0;

const timerToggle = document.querySelector("[data-timer-toggle]");
const displayedTime = document.querySelector("[data-displayed-time]");
// Format Time
function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
}
const minsToSeconds = (min: number) => min * 60;

// Set Default Time to Pomodoro
const setDisplayedTime = (time: string) => (displayedTime!.textContent = time);

const setTimer = () => {
  if (selectedTime === "pomodoro") {
    let pomodoroTimeInSeconds = minsToSeconds(pomodoroTime);
    currentTime = pomodoroTimeInSeconds;
    startingTime = currentTime;
    setDisplayedTime(formatTime(pomodoroTimeInSeconds));
  } else if (selectedTime === "short-break") {
    let shortBreakTimeInSeconds = minsToSeconds(shortBreakTime);
    currentTime = shortBreakTimeInSeconds;
    startingTime = currentTime;
    setDisplayedTime(formatTime(shortBreakTimeInSeconds));
  } else if (selectedTime === "long-break") {
    let longBreakTimeInSeconds = minsToSeconds(longBreakTime);
    currentTime = longBreakTimeInSeconds;
    startingTime = currentTime;
    setDisplayedTime(formatTime(longBreakTimeInSeconds));
  }
};
setTimer();

// Circle Elements
const progressCircle = document.querySelector(
  "[data-progress-circle]"
) as SVGCircleElement;
const radius = progressCircle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = `${circumference}`;

// Set Progress Bar
const setProgress = (percent: number) =>
  (progressCircle.style.strokeDashoffset = `${
    circumference - (percent / 100) * circumference
  }`);

function startTimer() {
  timerPaused = false;

  const intervalId = setInterval(() => {
    if (timerPaused) {
      clearInterval(intervalId);
      return;
    }
    currentTime--;
    if (currentTime < 0) {
      clearInterval(intervalId);
      timerToggle!.textContent = "Reset";
      timerToggle?.setAttribute("data-timer", "reset");
      console.log("Timer done!");
    } else {
      setDisplayedTime(formatTime(currentTime));
      percentageCircleTracker =
        ((startingTime - currentTime) / startingTime) * 100;
      setProgress(percentageCircleTracker);
    }
  }, 1000);
}

const setTimerToStart = () => {
  setTimer();
  setProgress(0);
  timerPaused = true;
  timerToggle?.setAttribute("data-timer", "start");
  timerToggle!.textContent = "Start";
};

document.addEventListener("click", (e) => {
  // Open modal when settings button clicked
  if (e.target === settingsButton) {
    e.preventDefault();
    modal?.showModal();
  } else if (e.target === closeModalBtn) {
    e.preventDefault();
    modal?.close();
  } else if (e.target && (e.target as Element).matches("[data-el-modal]")) {
    const dialogDimensions = (e.target as Element).getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      (e.target as HTMLDialogElement)?.close();
    }
  } else if ((e.target as Element)?.matches("[data-timer='start']")) {
    // changle data-timer to equal pause
    timerToggle?.setAttribute("data-timer", "pause");
    timerToggle!.textContent = "Pause";
    startTimer();
  } else if ((e.target as Element)?.matches("[data-timer='pause']")) {
    // changle data-timer to equal start
    timerToggle?.setAttribute("data-timer", "start");
    timerToggle!.textContent = "Start";
    timerPaused = true;
  } else if ((e.target as Element)?.matches("[data-timer='reset']")) {
    timerToggle?.setAttribute("data-timer", "start");
    setTimerToStart();
  } else if ((e.target as Element)?.matches("[data-pomodoro]")) {
    selectedTime = "pomodoro";
    setTimerToStart();
  } else if ((e.target as Element)?.matches("[data-short-break]")) {
    selectedTime = "short-break";
    setTimerToStart();
  } else if ((e.target as Element)?.matches("[data-long-break]")) {
    selectedTime = "long-break";
    setTimerToStart();
  } else if ((e.target as Element)?.matches("[data-type-state]")) {
    (typeButtons as NodeListOf<Element>).forEach((button) => {
      button.setAttribute("data-type-state", "inactive");
    });
    (e.target as Element).setAttribute("data-type-state", "active");
    selectedFont = Number((e.target as HTMLElement)?.dataset.ff);
  } else if ((e.target as Element)?.matches("[data-color-circle]")) {
    (colorButtons as NodeListOf<Element>).forEach((button) => {
      button.setAttribute("data-color-circle", "inactive");
    });
    (e.target as Element).setAttribute("data-color-circle", "active");
    selectedColor = Number((e.target as HTMLElement)?.dataset.color);
  }
});

// Listening to when the settings form is submitted
settingsForm?.addEventListener("submit", (e) => {
  if (timerPaused) {
    setTimer();
  }
  e.preventDefault();
  pomodoroTime = Number((inputPomodoro as HTMLInputElement)?.value);
  shortBreakTime = Number((inputShortBreak as HTMLInputElement)?.value);
  longBreakTime = Number((inputLongBreak as HTMLInputElement)?.value);
  app?.setAttribute("data-curr-color", `${selectedColor}`);
  app?.setAttribute("data-curr-ff", `${selectedFont}`);
  modal?.close();
});
