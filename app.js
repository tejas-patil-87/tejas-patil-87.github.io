const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controlls");
const sectBtn = document.querySelectorAll(".control");
const allsections = document.querySelector(".main-content");

function PageTransitions() {
  // Button click active class
  for (let i = 0; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener("click", function () {
      let currentBtn = document.querySelectorAll(".active-btn");
      currentBtn[0].className = currentBtn[0].className.replace("active-btn", "");
      this.className += " active-btn";
    });
  }
  //
  allsections.addEventListener("click", function (e) {
    const id = e.target.dataset.id;
    if (id) {
      //remove selected btn form other btn
      sectBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");

      //hide other section
      sections.forEach((section) => {
        section.classList.remove("active");
      });
      const element = document.getElementById(id);
      // console.log(element)
      element.classList.add("active");
    }
  });
  //toggle theme
  const themeBtn = document.querySelector(".theme-btn");
  themeBtn.addEventListener("click", function (e) {
    let element = document.body;
    element.classList.toggle("light-mode");
  });
}

PageTransitions();
// first parameter is id of country drop-down and second parameter is id of state drop-down

populateCountries("country", "state");

//backend logic
var form = document.getElementById("sheetdb-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const checkboxData = {};

  // Process checkbox data
  for (let checkbox of formData.entries()) {
    checkboxData[checkbox[0]] = checkbox[1] === "on"; // Convert checkbox value to boolean
  }
  fetch(form.action, {
    method: "POST",
    body: new FormData(document.getElementById("sheetdb-form")),
  })
    .then((response) => response.json())
    .then((html) => {
      // you can put any JS code here
      // window.open("page2.html", "_blank");
      form.reset();
      console.log("data stored successfully");
    });
});

var formContact = document.getElementById("sheetdb-feedback");
formContact.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(formContact.action, {
    method: "POST",
    body: new FormData(document.getElementById("sheetdb-feedback")),
  })
    .then((response) => response.json())
    .then((html) => {
      // you can put any JS code here
      // window.open("page2.html", "_blank");
      formContact.reset();
      console.log("data stored successfully");
    });
});

//menu hide
document.addEventListener("DOMContentLoaded", function () {
  function hideControlsOnMobile() {
    const controlsElement = document.querySelector(".controlls");
    const mobClick = document.querySelector(".mob");
    const viewportWidth = window.innerWidth;

    if (controlsElement && viewportWidth <= 768) {
      // Check if the element exists and viewport is mobile
      controlsElement.style.display = "none"; // Hide the controls initially

      //
      mobClick.addEventListener("click", function (event) {
        const clickedElement = event.target;
        if (controlsElement.style.display === "none") {
          controlsElement.style.display = "flex";
        } else {
          controlsElement.style.display = "nome";
        }
      });

      //

      controlsElement.addEventListener("click", function (event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains("control")) {
          controlsElement.style.display = "none";
        }
      });
    } else {
      controlsElement.style.display = "flex"; // Show the controls if viewport is not mobile
    }
  }

  // Call the function initially
  hideControlsOnMobile();

  // Call the function whenever the window is resized
  window.addEventListener("resize", hideControlsOnMobile);
});

//href
// main.js
import { resumeLink, linkedInLink } from "./config.js";
// Get the download link element and update its 'href' attribute
const resumeLinkElement = document.getElementById("resume-link");
resumeLinkElement.href = resumeLink;

// Get the LinkedIn link element and update its 'href' attribute
const linkedInLinkElement = document.getElementById("linkedin-link");
linkedInLinkElement.href = linkedInLink;
