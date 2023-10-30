import "./css/utilities.css";
import "./css/style.css";
import "./css/modal.css";

// Modal Elements
const modal = document.querySelector("[data-el-modal]") as HTMLDialogElement;
const settingsButton = document.querySelector("[data-settings-button]");
const closeModalBtn = document.querySelector("[data-close-modal]");

// Form Elements
const settingsForm = document.querySelector("[data-form]");
const inputPomodoro = document.getElementById("pomodoro");
const inputShortBreak = document.getElementById("short-break");
const inputLongBreak = document.getElementById("long-break");

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

document.addEventListener("click", (e) => {
  console.log(e.target);
  // Open modal when settings button clicked
  if (e.target === settingsButton) {
    e.preventDefault();
    modal?.showModal();
  } else if (e.target === closeModalBtn) {
    e.preventDefault();
    modal?.close();
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
    timerToggle!.textContent = "Start";
    setTimer();
    setProgress(percentageCircleTracker);
  } else if ((e.target as Element)?.matches("[data-pomodoro]")) {
    selectedTime = "pomodoro";
    setTimer();
    setProgress(0);
  } else if ((e.target as Element)?.matches("[data-short-break]")) {
    selectedTime = "short-break";
    setTimer();
    setProgress(0);
  } else if ((e.target as Element)?.matches("[data-long-break]")) {
    selectedTime = "long-break";
    setTimer();
    setProgress(0);
  }
});

// Listening to when the settings form is submitted
settingsForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
  modal?.close();
});

// TODO Create Function that changes input active for the circles

// TODO Create Function that listens to whether the timer is a short or long break

/*
    Code Snippet for Opening and Closing the Modal from youtube video 
https://www.youtube.com/watch?v=HBCyKOL-f2c 


document.addEventListener('click', (e) => {
  // Check if the clicked element is an open button
  if (e.target.matches('[el="open-button"]')) {
    // Find the next dialog sibling and open it
    const nextDialog = e.target.nextElementSibling;
    if (nextDialog) nextDialog.showModal();
  }
  // Check if the clicked element is a close button inside a dialog
  else if (e.target.matches('[el="close-button"]')) {
    // Find the closest dialog parent and close it
    const dialog = e.target.closest('[el="dialog"]');
    if (dialog) dialog.close();
  }
  else if (e.target.matches('[el="dialog"]')) {
  	const dialogDimensions = e.target.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      e.target.close()
    }
  }
});
*/
