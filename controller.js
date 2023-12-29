import SchoolRecord from "./register.js";
import Student from "./student.js";

let registers = localStorage.getItem("register")
  ? JSON.parse(localStorage.getItem("register"))
  : [];
const student = new Student();

function createRegister(nameMatter) {
  const newRegister = new SchoolRecord(1, nameMatter);
  registers.push(newRegister);
  localStorage.setItem("register", JSON.stringify(registers));
  console.log(registers.length);
  window.location.reload();
  return;
}

function createStudent(name, lastName, email, phoneNumber) {
  studentList.createStudent(1, name, lastName, email, phoneNumber);
  //localStorage.setItem("register", JSON.stringify(registers));
  //console.log(registers.length);
  //window.location.reload();
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
  function getDataStudent() {
    const btnCreateStudent = document.getElementById("btnCreateStudent");
    btnCreateStudent.addEventListener("click", () => {
      const nameS = document.getElementById("student-name").value;
      const lastNameS = document.getElementById("student-lastName").value;
      const emailS = document.getElementById("student-email").value;
      const phoneNumberS = document.getElementById("student-phoneNumber").value;
      createStudent(nameS, lastNameS, emailS, phoneNumberS);
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
  getDataStudent();
  domButtonMatter();
});

//let student = new Student(2, "giuseppe", "barca", "pino@pino.it", "3281'01202");
//console.log(student);
