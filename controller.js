import SchoolRecord from "./register.js";
import Student from "./student.js";

/*let registers = localStorage.getItem("register")
  ? JSON.parse(localStorage.getItem("register"))
  : [];*/
let registers = [];
const student = new Student();
console.log(student.getStudents());
// Dummy data in JSON format
const dummySchoolRecordData = {
  idRecord: "12345",
  subjectName: "Math",
  studentList: ["student1", "student2", "student3"],
  gradeList: [
    {
      gradeId: "grade1",
      gradeDate: "2024-01-03",
      gradeValue: 90,
      studentId: "student1",
    },
    {
      gradeId: "grade2",
      gradeDate: "2024-01-03",
      gradeValue: 85,
      studentId: "student2",
    },
    // Add more grades as needed
  ],
  lessonList: [
    {
      lessonId: "lesson1",
      lessonDate: "2024-01-03",
      attendances: [
        {
          attendanceId: "attendance1",
          studentId: "student1",
          entryTime: "09:00",
          exitTime: "12:00",
        },
        // Add more attendances as needed
      ],
    },
    // Add more lessons as needed
  ],
};

// Create an instance of the SchoolRecord class with the dummy data
const schoolRecordInstance = new SchoolRecord(
  dummySchoolRecordData.idRecord,
  dummySchoolRecordData.subjectName
);

// Add students, grades, and lessons to the instance
schoolRecordInstance.addStudent(...dummySchoolRecordData.studentList);
dummySchoolRecordData.gradeList.forEach((grade) => {
  schoolRecordInstance.addGrade(
    grade.gradeId,
    grade.gradeDate,
    grade.gradeValue,
    grade.studentId
  );
});
dummySchoolRecordData.lessonList.forEach((lesson) => {
  schoolRecordInstance.addLesson(
    lesson.lessonId,
    lesson.lessonDate,
    lesson.lessonStudentList
  );
  lesson.attendances.forEach((attendance) => {
    schoolRecordInstance.addAttendanceToLesson(
      lesson.lessonId,
      attendance.studentId,
      attendance.entryTime,
      attendance.exitTime
    );
  });
});
registers.push(schoolRecordInstance);
//localStorage.setItem("register", JSON.stringify(registers));

///@@@@@@@@@@@
function connectMatterToRegister(nameMatter) {
  sessionStorage.setItem("nameMatter", nameMatter);
  window.location.href = "registro.html";
}
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
  } else if (pathname.includes("studenti.html")) {
    gestisciDOMStudenti();
  }
  function gestisciDOMHome() {
    //QUI IL CODICE PER GESTIRE LA HOME
    function addNewMatterToRegister() {
      const btnCreateRegister = document.getElementById("btnCreateRegister");
      btnCreateRegister.addEventListener("click", () => {
        const nameMatter = document.getElementById("recipient-name").value;
        createRegister(nameMatter);
      });
    }
    function addNewStudentToApp() {
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
      divButtonMatter.innerHTML = ""; // Clear existing content
      registers.forEach((element) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-primary btn-lg";
        button.textContent = element.subjectName;
        button.addEventListener("click", function () {
          connectMatterToRegister(element.subjectName);
        });
        divButtonMatter.appendChild(button);
      });
    }
    /*function connectMatterToRegister() {
      const btnNameMatter = document.getElementById("btnNameMatter");
      btnCreateRegister.addEventListener("click", () => {
        const nameMatter = document.getElementById("recipient-name").value;
        createRegister(nameMatter);
      });
    }
    function connectMatterToRegister(nameMatter){
      sessionStorage.setItem("nameMatter", nameMatter);
      window.location.href="registro.html"
    }*/
    addNewMatterToRegister();
    addNewStudentToApp();
    viewButtonMatter();
  }

  function gestisciDOMRegistro() {
    const nameMatter = sessionStorage.getItem("nameMatter");

    //LE FUNZIONI PER IL POPOLAMENTO DELLA TABLE NEL REGISTRO VANNO QUI
    function populateNameMatter() {
      const h2 = document.getElementById("hmatter");
      h2.innerHTML = "";
      h2.innerHTML += `${nameMatter}`;
    }
    // Funzione per inizializzare il datepicker
    function lessonDayDatePicker() {
      var datepickerInput = document.getElementById("datepicker");
      datepickerInput.valueAsDate = new Date();

      datepickerInput.addEventListener("input", function () {
        console.log("Data cambiata manualmente:", datepickerInput.value);
        populateRegisterTable(datepickerInput.value);
      });

      // Aggiunta degli eventi per i pulsanti Next e Previous
      var btnNext = document.querySelector(".btn-next");
      btnNext.addEventListener("click", function () {
        var currentDate = new Date(datepickerInput.value);
        currentDate.setDate(currentDate.getDate() + 1);
        datepickerInput.valueAsDate = currentDate;
        populateRegisterTable(datepickerInput.value);
      });

      var btnPrev = document.querySelector(".btn-prev");
      btnPrev.addEventListener("click", function () {
        var currentDate = new Date(datepickerInput.value);
        currentDate.setDate(currentDate.getDate() - 1);
        datepickerInput.valueAsDate = currentDate;
        populateRegisterTable(datepickerInput.value);
      });
    }

    lessonDayDatePicker();

    /*class SimpleDatepicker {
      constructor(element) {
        this.datepicker = element;
        this.setupEventListeners();
      }

      getDate() {
        return new Date(this.datepicker.value);
      }

      setDate(date) {
        this.datepicker.valueAsDate = date;
      }

      setupEventListeners() {
        // Additional setup can be added here
      }
    }

    // Datepicker Initialization
    var datepickerInput = document.getElementById("datepicker");
    var simpleDatepicker = new SimpleDatepicker(datepickerInput);

    // Next Button Click Event
    var btnNext = document.querySelector(".btn-next");
    btnNext.addEventListener("click", function () {
      var currentDate = simpleDatepicker.getDate();
      currentDate.setDate(currentDate.getDate() + 1);
      simpleDatepicker.setDate(currentDate);
    });

    // Previous Button Click Event
    var btnPrev = document.querySelector(".btn-prev");
    btnPrev.addEventListener("click", function () {
      var currentDate = simpleDatepicker.getDate();
      currentDate.setDate(currentDate.getDate() - 1);
      simpleDatepicker.setDate(currentDate);
    });*/
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
    function populateRegisterTable(lessonDayView) {
      //const headerRow = document.createElement("tr");
      //headerRow.innerHTML =
      //"<th>Nome</th><th>Cognome</th><th>Presenza</th><th>Orario Ingresso</th><th>Orario Uscita</th><th>Voto</th>";
      const tBodyReg = document.getElementById("tBodyReg");
      //tBodyAdd.appendChild(headerRow);

      //const students = student.getStudents();

      //POPOLO PRIMA COLONNA TABLE
      tBodyReg.innerHTML = "";
      const studentList = registers[0].getStudentList();
      studentList.forEach((id, index) => {
        const row = document.createElement("tr");
        const cellStud = document.createElement("td");
        const cellAtdnc = document.createElement("td");
        const cellentry = document.createElement("td");
        const cellexit = document.createElement("td");
        const cellCmp = document.createElement("td");
        const cellgrd = document.createElement("td");
        const stud = student.getStudent(`${++index}`);
        console.log(stud);
        if (stud) {
          cellStud.innerHTML = stud.name + stud.lastName;
          const checkboxPresenza = document.createElement("input");
          checkboxPresenza.type = "checkbox";
          cellAtdnc.appendChild(checkboxPresenza);
          const checkboxCompito = document.createElement("input");
          checkboxCompito.type = "checkbox";
          cellCmp.appendChild(checkboxCompito);
          row.appendChild(cellStud);
          //row.appendChild(cellPsr);
          row.appendChild(cellAtdnc);
          row.appendChild(cellentry);
          row.appendChild(cellexit);
          row.appendChild(cellCmp);
          row.appendChild(cellgrd);

          tBodyReg.appendChild(row);
          row.id = "student" + stud.id;
        } else {
          console.log("studentList del register terminato");
        }
      });
      //POPOLO COLONNA ORARIO PRESENZE TABLE
      const lessonList = registers[0].getLessonList();
      console.log(lessonList);
      //@@Devo cliclare a regime l'array lessonDay e vedere se c'è un giorno esistente come quello mostrato, se non c'è visualizzo vuoto (o l'alert, vediamo)
      lessonList.forEach((lessonDay) => {
        console.log(
          "lessonDay.lessonDate: " +
            lessonDay.lessonDate +
            "\nlessonDayView: " +
            lessonDayView
        );
        if (lessonDay.lessonDate == lessonDayView) {
          lessonDay.attendances.forEach((elem) => {
            const rowId = document.getElementById(`${elem.studentId}`);
            const cellEntryDaModificare = document.querySelector(
              `#${elem.studentId} td:nth-child(3)`
            );
            const cbPresenze = document.querySelector(
              `#${elem.studentId} td:nth-child(2) input[type="checkbox"]`
            );
            if (cellEntryDaModificare && cbPresenze) {
              // Ora puoi modificare il contenuto della cella come desiderato
              console.log("eleme.entryTime: " + elem.entryTime);
              if (elem.entryTime) {
                cellEntryDaModificare.textContent = elem.entryTime;
                cbPresenze.checked = true;
              }
            } else {
              console.error("Riga o cella non trovata con l'id specificato");
            }
            const cellEntryDaModificare2 = document.querySelector(
              `#${elem.studentId} td:nth-child(4)`
            );
            if (cellEntryDaModificare2) {
              // Ora puoi modificare il contenuto della cella come desiderato
              cellEntryDaModificare2.textContent = elem.exitTime;
            } else {
              console.error("Riga o cella non trovata con l'id specificato");
            }
          });
        } else {
          console.log("non è il giorno correttooo");
        }
      });

      //POPOLO COLONNA GRADE
      const gradeDay = registers[0].getGradeList();
      console.log(gradeDay);
      gradeDay.forEach((grade) => {
        if (grade.gradeDate == lessonDayView) {
          const cellEntryDaModificare = document.querySelector(
            `#${grade.studentId} td:nth-child(6)`
          );
          const cbCompito = document.querySelector(
            `#${grade.studentId} td:nth-child(5) input[type="checkbox"]`
          );
          if (cellEntryDaModificare && cbCompito) {
            // Ora puoi modificare il contenuto della cella come desiderato
            console.log("grade.gradeValue: " + grade.gradeValue);
            if (grade.gradeValue) {
              cellEntryDaModificare.textContent = grade.gradeValue;
              cbCompito.checked = true;
            }
          } else {
            console.error("Riga o cella non trovata con l'id specificato");
          }
        } else {
          console.log("non è il giorno correttooo");
        }
      });
      /*for (var i = 0; i < students.length; i++) {
        const row = document.createElement("tr");
        const cellnm = document.createElement("td");
        const cellsrnm = document.createElement("td");
        const cellAtdnc = document.createElement("td");
        const cellentry = document.createElement("td");
        const cellexit = document.createElement("td");
        const cellgrd = document.createElement("td");

        cellnm.innerHTML = students[i].name; // Corretto: Accesso alle proprietà name
        cellsrnm.innerHTML = students[i].lastName; // Corretto: Accesso alle proprietà lastName

        // Cio' che riguarda il bottone presenze
        const checkboxPresenza = document.createElement("input");
        checkboxPresenza.type = "checkbox";
        checkboxPresenza.checked = getPresenza(students[i].id);
        checkboxPresenza.addEventListener("change", function () {
          updatePresenza(students[i].id, this.checked);
          studentspopolation();
        });

        cellAtdnc.appendChild(checkboxPresenza);

        if (checkboxPresenza.checked) {
          const orarioPresenza = getOrarioPresenza(students[i].id);
          cellentry.innerHTML = orarioPresenza.entry; // Corretto: Accesso alla proprietà entry
          cellexit.innerHTML = orarioPresenza.exit; // Corretto: Accesso alla proprietà exit
          cellgrd.innerHTML = getVoto(students[i].id);
        }

        row.appendChild(cellnm);
        row.appendChild(cellsrnm);
        row.appendChild(cellentry);
        row.appendChild(cellexit);
        row.appendChild(cellgrd);

        studentTable.appendChild(row);
      }*/
    }
    populateAddStudentModal();
    populateNameMatter();
  }
  function gestisciDOMStudenti() {
    function populateStudentTable() {
      //SPOSTARE NEL gestisciDOMStudente()
      const headerRow = document.createElement("tr");
      headerRow.innerHTML =
        "<th>Nome</th><th>Cognome</th><th>Presenza</th><th>Orario Ingresso</th><th>Orario Uscita</th><th>Voto</th>";
      const studentTable = document.getElementById("tBodyAdd"); //MODIFICARE RIFERIMENTI HTML DEL FILE STUDENT
      studentTable.appendChild(headerRow);

      const students = student.getStudents();

      for (var i = 0; i < students.length; i++) {
        const row = document.createElement("tr");
        const cellnm = document.createElement("td");
        const cellsrnm = document.createElement("td");
        const cellAtdnc = document.createElement("td");
        const cellentry = document.createElement("td");
        const cellexit = document.createElement("td");
        const cellgrd = document.createElement("td");

        cellnm.innerHTML = students[i].name; // Corretto: Accesso alle proprietà name
        cellsrnm.innerHTML = students[i].lastName; // Corretto: Accesso alle proprietà lastName

        // Cio' che riguarda il bottone presenze
        const checkboxPresenza = document.createElement("input");
        checkboxPresenza.type = "checkbox";
        checkboxPresenza.checked = getPresenza(students[i].id);
        checkboxPresenza.addEventListener("change", function () {
          updatePresenza(students[i].id, this.checked);
          studentspopolation();
        });

        cellAtdnc.appendChild(checkboxPresenza);

        if (checkboxPresenza.checked) {
          const orarioPresenza = getOrarioPresenza(students[i].id);
          cellentry.innerHTML = orarioPresenza.entry; // Corretto: Accesso alla proprietà entry
          cellexit.innerHTML = orarioPresenza.exit; // Corretto: Accesso alla proprietà exit
          cellgrd.innerHTML = getVoto(students[i].id);
        }

        row.appendChild(cellnm);
        row.appendChild(cellsrnm);
        row.appendChild(cellentry);
        row.appendChild(cellexit);
        row.appendChild(cellgrd);

        studentTable.appendChild(row);
      }
    }
  }
});

//export default student;

//let student = new Student(2, "giuseppe", "barca", "pino@pino.it", "3281'01202");
//console.log(student);
