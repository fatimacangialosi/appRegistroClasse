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
  student.createStudent(1, name, lastName, email, phoneNumber);
  //localStorage.setItem("register", JSON.stringify(registers));
  //console.log(registers.length);
  //window.location.reload();
  return;
}

document.addEventListener("DOMContentLoaded", function () {
  const pathname = window.location.pathname;

  if (pathname.includes("home.html")) {
    gestisciDOMHome();
  } else if (pathname.includes("registro.html")) {
    gestisciDOMRegistro();
  }

  function gestisciDOMHome() {
    //QUI IL CODICE PER GESTIRE LA HOME
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
        const phoneNumberS = document.getElementById(
          "student-phoneNumber"
        ).value;
        createStudent(nameS, lastNameS, emailS, phoneNumberS);
      });
    }
    function viewButtonMatter() {
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
    viewButtonMatter();
  }
  function gestisciDOMRegistro() {
    //LE FUNZIONI PER IL POPOLAMENTO DELLA TABLE NEL REGISTRO VANNO QUI
    function populateAddStudentModal() {
      const btnOpenMod = document.getElementById("btnOpenMod");
      if (btnOpenMod) {
        btnOpenMod.addEventListener("click", () => {
          const tbody = document.getElementById("tBodyAdd");
          student.getStudents().forEach((elem, index) => {
            tbody.innerHTML += `<tr>
        <th scope="row">${index}</th>
        <td>${elem.name}</td>
        <td>${elem.lastName}</td>
        <td>${elem.email}</td>
        <td>${elem.phoneNumber}</td>
      </tr>`;
          });
        });
      }
    }
    populateAddStudentModal();
  }
});

//export default student;

//let student = new Student(2, "giuseppe", "barca", "pino@pino.it", "3281'01202");
//console.log(student);
