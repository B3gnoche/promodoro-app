import "./css/utilities.css";
import "./css/style.css";
import "./css/modal.css";

// Modal Elements
const modal = document.querySelector("[data-el-modal]") as HTMLDialogElement;
const settingsButton = document.querySelector("[data-settings-button]");
const closeModalBtn = document.querySelector("[data-close-modal]");

// Form Elements
const settingsForm = document.querySelector("[data-form]");

settingsForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
});
console.log(modal, settingsButton, closeModalBtn, settingsForm);
document.addEventListener("click", (e) => {
  // Create Functions to Open and Close Modal
  if (e.target === settingsButton) {
    e.preventDefault();
    modal?.showModal();
  }

  if (e.target === closeModalBtn) {
    e.preventDefault();
    modal?.close();
  }
});

// TODO Create Functions to Set Progress of Bar

// TODO Create Function to listen for Form Submission

// TODO Create Function that changes input active for the circles

// TODO Create Function that Starts, Pauses and Resets the Timer

// TODO Create FUnction that listens to whether the timer is a short or long break

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



Code to Set the Progress of the Bar from youtube video
https://www.youtube.com/watch?v=f7XUZFexSgo&list=LL&index=1

let progressCircle = document.querySelector(".progress");
    let radius = progressCircle.r.baseVal.value;
    //circumference of a circle = 2πr;
    let circumference = radius * 2 * Math.PI;
    progressCircle.style.strokeDasharray = circumference;

    //0 to 100
    setProgress(95);

    function setProgress(percent) {
        progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    } */
