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
}

PageTransitions();

populateCountries("country", "state"); // first parameter is id of country drop-down and second parameter is id of state drop-down

var form = document.getElementById("sheetdb-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(form.action, {
    method: "POST",
    body: new FormData(document.getElementById("sheetdb-form")),
  })
    .then((response) => response.json())
    .then((html) => {
      // you can put any JS code here
      // window.open("page2.html", "_blank");
      form.reset();
      console.log("data stored sucessfully");
    });
});

var formContact = document.getElementById("sheetdb-feedback");
formContact.addEventListener("submit", (e) => {
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
      console.log("data stored sucessfully");
    });
});
