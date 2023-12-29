import SchoolRecord from "./register.js";

let registers = localStorage.getItem("register")
  ? JSON.parse(localStorage.getItem("register"))
  : [];

function createRegister(nameMatter) {
  const newRegister = new SchoolRecord(1, nameMatter);
  registers.push(newRegister);
  localStorage.setItem("register", JSON.stringify(registers));
  console.log(registers.length);
  window.location.reload();
  return;
}

document.addEventListener("DOMContentLoaded", function () {
  function getNameMatter() {
    const btnCreateRegister = document.getElementById("btnCreateRegister");
    btnCreateRegister.addEventListener("click", () => {
      const nameMatter = document.getElementById("recipient-name").value;
      createRegister(nameMatter);
    });
  }
  function domButtonMatter() {
    const divButtonMatter = document.getElementById("divButtonMatter");
    if (divButtonMatter) {
      console.log("ci siamo");
      console.log(registers);
    } else {
      console.log("no");
    }
    registers.forEach((element) => {
      divButtonMatter.innerHTML += `<button type="button" class="btn btn-primary btn-lg">${element.subjectName}</button>`;
    });
  }

  getNameMatter();
  domButtonMatter();
});
