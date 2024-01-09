import SchoolRecord from "./register.js";
import Student from "./student.js";

let registers = localStorage.getItem("register")
  ? JSON.parse(localStorage.getItem("register")).map((data) =>
      SchoolRecord.fromJSON(data)
    )
  : [];
//let registers = [];
const student = new Student();
console.log(student.getStudents());
console.log(registers);

function connectMatterToRegister(nameMatter) {
  sessionStorage.setItem("nameMatter", nameMatter);
  window.location.href = "registro.html";
}
function createRegister(nameMatter) {
  const newRegister = new SchoolRecord(nameMatter);
  registers.push(newRegister);
  //console.log(newRegister.getGradeList());
  //console.log(registers[0].getGradeList());
  localStorage.setItem("register", JSON.stringify(registers));
  //console.log(registers.length);
  window.location.reload();

  return;
}

function createStudent(name, lastName, email, phoneNumber) {
  student.createStudent(name, lastName, email, phoneNumber);
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
    //addNewStudentToApp();
    viewButtonMatter();
  }

  function gestisciDOMRegistro() {
    const nameMatter = sessionStorage.getItem("nameMatter");
    const register = registers.filter(
      (elem) => elem.getSubjectName() == nameMatter
    );
    const indexReg = registers.indexOf(register[0]);
    console.log(indexReg);
    console.log(register[0]);
    //console.log(registers[0].getSubjectName());
    //LE FUNZIONI PER IL POPOLAMENTO DELLA TABLE NEL REGISTRO VANNO QUI
    function populateNameMatter() {
      const h2 = document.getElementById("hmatter");
      h2.innerHTML = "";
      h2.innerHTML += `${nameMatter}`;
    }
    const btnAddLesson = document.querySelector(".btn-lesson");
    btnAddLesson.addEventListener("click", () => {
      var datepickerInput = document.getElementById("datepicker");
      register[0].addLesson(datepickerInput.value);
      registers[indexReg] = register[0];
      localStorage.setItem("register", JSON.stringify(registers));
      alert(`addLesson: ${datepickerInput.value}`);
      populateRegisterTable(datepickerInput.value);
    });
    // Funzione per inizializzare il datepicker
    function lessonDayDatePicker() {
      var datepickerInput = document.getElementById("datepicker");
      datepickerInput.valueAsDate = new Date();

      populateRegisterTable(datepickerInput.value);

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
        var prova = register[0].getLesson(datepickerInput.value);
        localStorage.setItem("register", JSON.stringify(registers));
        console.log(prova);
        console.log("datepickerInput.value: " + datepickerInput.value);
        console.log(register[0].getLesson(datepickerInput.value));
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
    const btnOpenMod = document.getElementById("btnOpenMod");
    const btnSaveMod = document.getElementById("btnAddStudent");

    if (btnOpenMod) {
      btnOpenMod.addEventListener("click", () => {
        populateAddStudentModal();
      });
    }
    if (btnSaveMod) {
      let idSelected = [];
      btnSaveMod.addEventListener("click", () => {
        const table = document.getElementById("tablemodal");
        if (table) {
          console.log("esiste table");
        } else {
          console.log("nn esiste table");
        }
        // Cicla attraverso le righe della tabella
        for (let i = 1; i < table.rows.length; i++) {
          const row = table.rows[i];
          console.log(row.id);
          const inputElement = row.getElementsByTagName("input");
          for (let j = 0; j < inputElement.length; j++) {
            const inputValue = inputElement[j].checked;
            if (inputValue) {
              idSelected.push(row.id);
              //register[0].addStudent(row.id);
            }
          }
        }
        console.log(idSelected);
        const output = register[0].addStudent(...idSelected);
        //console.log(output);
        //idSelected = [];

        registers[indexReg] = register[0];
        localStorage.setItem("register", JSON.stringify(registers));
        idSelected = [];
        var datepickerInput = document.getElementById("datepicker");

        populateRegisterTable(datepickerInput.value);
        //console.log(row.cells[7]);
        /*const cellChk = row.cells[7];
          const chk = cellChk.querySelector('input[type="checkbox"]');

          if (chk) {
            if (chk.checked == true) {
              idSelected.push(row.id);
              console.log(row.id);
            }
          }*/
      });
    }
    function populateAddStudentModal() {
      const listStdView = register[0].getStudentList();
      console.log(listStdView);
      const tbody = document.getElementById("tBodyAdd");
      tbody.innerHTML = "";
      student.getStudents().forEach((elem, index) => {
        /*tbody.innerHTML += `<tr>
        <th scope="row">${index}</th>
        <td>${elem.name}</td>
        <td>${elem.lastName}</td>
        <td>${elem.email}</td>
        <td>${elem.phoneNumber}</td>
      </tr>`;*/
        console.log(elem.id);
        if (!listStdView.includes(elem.id)) {
          console.log("non include");
          const row = document.createElement("tr");
          const cellIndex = document.createElement("td");
          const cellName = document.createElement("td");
          const cellLastname = document.createElement("td");
          const cellEmail = document.createElement("td");
          const cellPhone = document.createElement("td");
          const cellSelect = document.createElement("td");

          row.id = elem.id;
          cellIndex.innerText = "#";
          cellName.innerText = elem.name;
          cellLastname.innerText = elem.lastName;
          cellEmail.innerText = elem.email;
          cellPhone.innerText = elem.phoneNumber;
          const checkboxSeleziona = document.createElement("input");
          checkboxSeleziona.type = "checkbox";
          cellSelect.appendChild(checkboxSeleziona);
          cellIndex.scope = "row";
          row.appendChild(cellIndex);
          row.appendChild(cellName);
          row.appendChild(cellLastname);
          row.appendChild(cellEmail);
          row.appendChild(cellPhone);
          row.appendChild(cellSelect);

          tbody.appendChild(row);
        } /*else {
          tbody.innerHTML = "";
          const row = document.createElement("tr");
          row.textContent = "Nessuno studente da visualizzare";
          tbody.appendChild(row);
        }*/
      });
    }
    function addStudentToMatter() {}
    function populateRegisterTable(lessonDayView) {
      //const headerRow = document.createElement("tr");
      //headerRow.innerHTML =
      //"<th>Nome</th><th>Cognome</th><th>Presenza</th><th>Orario Ingresso</th><th>Orario Uscita</th><th>Voto</th>";
      console.log("siamo in populate REGISTER TABLE");
      const tBodyReg = document.getElementById("tBodyReg");
      //tBodyAdd.appendChild(headerRow);

      //const students = student.getStudents();

      //POPOLO PRIMA COLONNA TABLE
      tBodyReg.innerHTML = "";
      if (register[0].getLesson(lessonDayView)) {
        console.log("PRIMO IF");
        const studentList = register[0].getStudentList();
        studentList.forEach((id, index) => {
          const row = document.createElement("tr");
          const cellStud = document.createElement("td");
          const cellAtdnc = document.createElement("td");
          const cellentry = document.createElement("td");
          const cellexit = document.createElement("td");
          const cellCmp = document.createElement("td");
          const cellgrd = document.createElement("td");
          const cellBtn = document.createElement("td");

          //const idStudentee = index + 1;
          const stud = student.getStudent(id);
          console.log(stud);
          if (stud) {
            cellStud.innerHTML = stud.name + stud.lastName;
            const checkboxPresenza = document.createElement("input");
            checkboxPresenza.type = "checkbox";
            checkboxPresenza.addEventListener("change", () => {
              if (checkboxPresenza.checked == true) {
                console.log("ifffff");
                btnRowMod.style.display = "none";
                btnRowSaveAdd.style.display = "block";
                modifyRowStudent(checkboxPresenza, id);
              } else {
                //SEMBRA ENTRI SEMPRE NELL'IF IN OGNI CASO
                alert("Presenza eliminato correttamente");
                modifyRowStudent(checkboxPresenza, id);
                checkboxCompito.checked = false;
                //registers[0].dropAttendance();
                console.log("elseee");
              }
              //addPsrRowStudent()
            });
            cellAtdnc.appendChild(checkboxPresenza);
            const checkboxCompito = document.createElement("input");
            checkboxCompito.type = "checkbox";
            checkboxCompito.id = "cmp";
            checkboxCompito.setAttribute("disabled", true);
            checkboxCompito.addEventListener("change", () => {
              //console.log("ckCompito.checked: "+checkboxPre)
              if (checkboxCompito.checked == true) {
                console.log("ifffff");
                modifyRowStudent(checkboxCompito, id);
                btnRowMod.style.display = "none";
                btnRowSaveAdd.style.display = "block";
              } else {
                alert("Compito eliminato correttamente");
                modifyRowStudent(checkboxCompito, id);
                //registers[0].dropAttendance();
                console.log("elseee");
              }
              //addPsrRowStudent()
            });
            cellCmp.appendChild(checkboxCompito);
            const btnRowMod = document.createElement("button");
            const btnRowSaveMod = document.createElement("button");
            const btnRowSaveAdd = document.createElement("button");
            btnRowMod.type = "button";
            btnRowMod.className = "btn btn-primary btn-lg";
            btnRowMod.innerText = "Modifica";
            btnRowSaveMod.type = "button";
            btnRowSaveMod.className = "btn btn-primary btn-lg";
            btnRowSaveMod.innerText = "Save";
            btnRowSaveMod.id = "btn-savemod";
            btnRowSaveAdd.type = "button";
            btnRowSaveAdd.className = "btn btn-primary btn-lg";
            btnRowSaveAdd.innerText = "Save";
            btnRowSaveAdd.id = "btn-saveadd";
            btnRowMod.style.display = "none";
            btnRowSaveMod.style.display = "none";
            btnRowSaveAdd.style.display = "none";

            cellBtn.appendChild(btnRowMod);
            cellBtn.appendChild(btnRowSaveMod);
            cellBtn.appendChild(btnRowSaveAdd);
            row.appendChild(cellStud);
            //row.appendChild(cellPsr);
            row.appendChild(cellAtdnc);
            row.appendChild(cellentry);
            row.appendChild(cellexit);
            row.appendChild(cellCmp);
            row.appendChild(cellgrd);
            row.appendChild(cellBtn);
            tBodyReg.appendChild(row);
            row.id = stud.id;
            btnRowMod.addEventListener("click", () => {
              modifyRowStudent(btnRowMod, id);
              checkboxPresenza.disabled = false;
              checkboxCompito.disabled = false;
              btnRowMod.style.display = "none";
              btnRowSaveMod.style.display = "block";
            });

            btnRowSaveMod.addEventListener("click", () => {
              saveModRowStudent(btnRowSaveMod, id, lessonDayView);
            });
            btnRowSaveAdd.addEventListener("click", () => {
              saveModRowStudent(btnRowSaveAdd, id, lessonDayView);
            });
          } else {
            console.log("studentList del register terminato");
          }
        });
        //POPOLO COLONNA ORARIO PRESENZE TABLE
        const lessonList = register[0].getLessonList();
        const btnAddLesson = document.querySelector(".btn-lesson");

        console.log(lessonList);
        //@@Devo cliclare a regime l'array lessonDay e vedere se c'è un giorno esistente come quello mostrato, se non c'è visualizzo vuoto (o l'alert, vediamo)
        lessonList.forEach((lessonDay) => {
          console.log(
            "lessonDay.lessonDate: " +
              lessonDay.lessonDate +
              "\nlessonDayView: " +
              lessonDayView
          );
          console.log(lessonDay.lessonDate == lessonDayView);

          if (lessonDay.lessonDate == lessonDayView) {
            //è presente una lezione nel giorno visualizzato
            btnAddLesson.style.display = "none";
            lessonDay.attendances.forEach((elem) => {
              const btnSave = document.querySelector(
                `#${elem.studentId} td:nth-child(7) button[type="button"]`
              );
              const cellEntryDaModificare = document.querySelector(
                `#${elem.studentId} td:nth-child(3)`
              );
              const cbPresenze = document.querySelector(
                `#${elem.studentId} td:nth-child(2) input[type="checkbox"]`
              );
              const cbCmp = document.querySelector(
                `#${elem.studentId} td:nth-child(5) input[type="checkbox"]`
              );
              console.log("cellEntryDaModificare: " + cellEntryDaModificare);
              console.log("cbPresenze: " + cbPresenze);
              //cbPresenze.disabled = false;
              cbCmp.disabled = false;
              if (cellEntryDaModificare && cbPresenze) {
                // Ora puoi modificare il contenuto della cella come desiderato
                btnSave.style.display = "block";
                console.log("eleme.entryTime: " + elem.entryTime);
                if (elem.entryTime) {
                  cellEntryDaModificare.textContent = elem.entryTime;
                  cbPresenze.checked = true;
                  cbPresenze.disabled = true;
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
            if (btnAddLesson) {
              console.log("blocchiamo bottone");
              btnAddLesson.style.display == "block"
                ? (btnAddLesson.style.display = "block")
                : (btnAddLesson.style.display = "none");
            }
            /*cbPresenze.checked = false;
          cbPresenze.disabled = true;
          cbCmp.checked = false;
          cbCmp.disabled = true;*/
            console.log("non è il giorno correttooo");
          }
        });

        //POPOLO COLONNA GRADE
        const gradeDay = register[0].getGradeList();
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
                cbCompito.disabled = true;
              }
            } else {
              console.error("Riga o cella non trovata con l'id specificato");
            }
          } else {
            console.log("non è il giorno correttooo");
          }
        });
      } else {
        const btnAddLesson = document.querySelector(".btn-lesson");
        btnAddLesson.style.display == "block"
          ? (btnAddLesson.style.display = "none")
          : (btnAddLesson.style.display = "block");
      }

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

    function modifyRowStudent(button, id) {
      console.log(button.type);
      const ckPsr = document.querySelector(
        `#${id} td:nth-child(2) input[type="checkbox"]`
      );
      const cellEntry = document.querySelector(`#${id} td:nth-child(3)`);
      const cellExit = document.querySelector(`#${id} td:nth-child(4)`);
      const ckCmp = document.querySelector(
        `#${id} td:nth-child(5) input[type="checkbox"]`
      );
      const cellGrd = document.querySelector(`#${id} td:nth-child(6)`);
      const btnMod = document.querySelector(
        `#${id} td:nth-child(7) button[type="button"]`
      );
      const contentEntry = cellEntry.textContent;
      const contentExit = cellExit.textContent;

      const inputEntry = document.createElement("input");
      inputEntry.type = "time";
      inputEntry.id = "fentry";
      inputEntry.name = "fentry";
      const inputExit = document.createElement("input");
      inputExit.type = "time";
      inputExit.id = "fexit";
      inputExit.name = "fexit";
      if (button.type == "button" && contentEntry && contentExit) {
        inputEntry.value = contentEntry;

        inputExit.value = contentExit;
        console.log(contentEntry, contentExit);
        cellEntry.innerHTML = "";
        cellEntry.appendChild(inputEntry);
        cellExit.innerHTML = "";
        cellExit.appendChild(inputExit);
        if (cellGrd.textContent != "") {
          const contentGrade = cellGrd.textContent;
          const inputGrade = document.createElement("input");
          inputGrade.type = "number";
          inputGrade.id = "fgrade";
          inputGrade.name = "fgrade";
          inputGrade.min = "0";
          inputGrade.max = "100";
          inputGrade.value = contentGrade;
          cellGrd.innerHTML = "";
          cellGrd.appendChild(inputGrade);
        }
      } else {
        console.log(button.id);
        if (button.id == "cmp") {
          //significa che è stato cliccato il chbox grade
          if (ckCmp.checked == true) {
            const contentGrade = cellGrd.textContent;
            const inputGrade = document.createElement("input");
            inputGrade.type = "number";
            inputGrade.id = "fgrade";
            inputGrade.name = "fgrade";
            inputGrade.min = "0";
            inputGrade.max = "100";
            //inputGrade.value = contentGrade;
            cellGrd.innerHTML = "";
            cellGrd.appendChild(inputGrade);
          } else {
            //alert("checkbox spenta");
            cellGrd.innerHTML = "";
          }
        } else {
          if (ckPsr.checked == true) {
            console.log("else else");
            cellEntry.innerHTML = "";
            cellEntry.appendChild(inputEntry);
            cellExit.innerHTML = "";
            cellExit.appendChild(inputExit);
            if (ckCmp.checked == true) {
              const inputGrade = document.createElement("input");
              inputGrade.type = "number";
              inputGrade.id = "fgrade";
              inputGrade.name = "fgrade";
              inputGrade.min = "0";
              inputGrade.max = "100";
              //inputGrade.value = contentGrade;
              cellGrd.innerHTML = "";
              cellGrd.appendChild(inputGrade);
            } else {
              cellGrd.innerHTML = "";
            }
          } else {
            cellEntry.innerHTML = "";
            cellExit.innerHTML = "";
            cellGrd.innerHTML = "";
          }
        }
      }
    }
    function saveModRowStudent(button, id, lessonDayView) {
      const ckPsr = document.querySelector(
        `#${id} td:nth-child(2) input[type="checkbox"]`
      );
      /*const cellEntry = document
        .querySelector(`#${id} td:nth-child(3)`)
        .querySelectorAll("*")[0].tagName;
      const cellExit = document
        .querySelector(`#${id} td:nth-child(4)`)
        .querySelectorAll("*")[0].tagName;
      const cellExit2 = document.querySelector(
        `#${id} td:nth-child(4) input[type="time"]`
      );*/
      const ckCmp = document.querySelector(
        `#${id} td:nth-child(5) input[type="checkbox"]`
      );
      const cellGrd = document.querySelector(
        `#${id} td:nth-child(6) input[type="number"]`
      );
      const btnMod = document.querySelector(
        `#${id} td:nth-child(7) button[type="button"]`
      );
      //console.log(cellEntry);
      /*for (const child of cellEntry) {
        console.log(child.tagName);
      }*/

      //const contentEntry = cellEntry.textContent;
      //const contentExit = cellExit.value;
      console.log("saveModRowStudent");
      if (button.id == "btn-savemod") {
        const cEntry = document.querySelector(
          `#${id} td:nth-child(3) input[type="time"]`
        );
        const cExit = document.querySelector(
          `#${id} td:nth-child(4) input[type="time"]`
        );
        const cGrade = document.querySelector(
          `#${id} td:nth-child(6) input[type="number"]`
        );
        if (ckPsr.checked == true && ckCmp.checked == true) {
          const contentEntry = cEntry.value;
          const contentExit = cExit.value;
          const contentGrade = cGrade.value;

          console.log(contentEntry);
          if (contentEntry != "" && contentGrade != "") {
            register[0].updateAttendance(
              lessonDayView,
              id,
              contentEntry,
              contentExit
            );
            alert("dovrebbe aggiornare ATTENDANCE e GRADE");
            console.log(
              register[0].updateGrade(lessonDayView, contentGrade, id)
            );
            //register[0].addGrade(lessonDayView, contentGrade, id);
          } else {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          }
        } else if (ckPsr.checked == true) {
          /*register[0].updateAttendance(
            lessonDayView,
            id,
            contentEntry,
            contentExit
          );*/
          const contentEntry = cEntry.value;
          const contentExit = cExit.value;
          alert("dovrebbe aggiornare solo ATTENDANCE");
          console.log(
            register[0].updateAttendance(
              lessonDayView,
              id,
              contentEntry,
              contentExit
            )
          );
          register[0].dropGrade(lessonDayView, id);
          //@@@@@@@@@@@@@@@@òAGGIUNGERE QUI DROP GRADE
        } else if (ckPsr.checked == false && ckCmp.checked == false) {
          //alert("dovrebbe rimuove ATTENDANCES e GRADE");
          //console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
          register[0].dropAttendance(lessonDayView, id);
          //@@@@@@@@@@@@@@@AGGIUNGERE DROP GRADE E DROP ATTENDANCE
        } else if (ckPsr.checked == false && ckCmp.checked == true) {
          alert("dovrebbe rimuovere ATTENDANCE e FORZATAMENTE GRADE");
        }
      } else if (button.id == "btn-saveadd") {
        if (ckPsr.checked == true && ckCmp.checked == false) {
          const cEntry = document.querySelector(
            `#${id} td:nth-child(3) input[type="time"]`
          );
          const cExit = document.querySelector(
            `#${id} td:nth-child(4) input[type="time"]`
          );
          const contentEntry = cEntry.value;
          const contentExit = cExit.value;
          register[0].addAttendanceToLesson(
            lessonDayView,
            id,
            contentEntry,
            contentExit
          );
        } else if (ckPsr.checked == true && ckCmp.checked == true) {
          const cGrade = document.querySelector(
            `#${id} td:nth-child(6) input[type="number"]`
          );
          const contentGrade = cGrade.value;
          register[0].addGrade(lessonDayView, contentGrade, id);
        }
      }
      registers[indexReg] = register[0];
      localStorage.setItem("register", JSON.stringify(registers));
      populateRegisterTable(lessonDayView);
    }
    //populateAddStudentModal();
    populateNameMatter();
  }
  function gestisciDOMStudenti() {
    function populateStudentTable() {
      const tbody = document.getElementById("tBodyStd");
      tbody.innerHTML = "";
      student.getStudents().forEach((elem, index) => {
        /*tbody.innerHTML += `<tr>
        <th scope="row">${index}</th>
        <td>${elem.name}</td>
        <td>${elem.lastName}</td>
        <td>${elem.email}</td>
        <td>${elem.phoneNumber}</td>
      </tr>`;*/
        const row = document.createElement("tr");
        const cellIndex = document.createElement("td");
        const cellName = document.createElement("td");
        const cellLastname = document.createElement("td");
        const cellEmail = document.createElement("td");
        const cellPhone = document.createElement("td");
        const cellUpdate = document.createElement("td");
        const cellDelete = document.createElement("td");

        cellIndex.innerText = index + 1;
        row.id = elem.id;
        cellName.innerText = elem.name;
        cellLastname.innerText = elem.lastName;
        cellEmail.innerText = elem.email;
        cellPhone.innerText = elem.phoneNumber;
        const buttonUpdate = document.createElement("button");
        buttonUpdate.type = "button";
        buttonUpdate.textContent = "Modifica";
        buttonUpdate.className = "btn btn-primary";
        buttonUpdate.addEventListener("click", () => {
          modStudentRow(elem.id);
          buttonUpdate.style.display = "none";
          buttonSave.style.display = "block";
          buttonDelete.style.display = "none";
        });
        const buttonSave = document.createElement("button");
        buttonSave.type = "button";
        buttonSave.textContent = "Salva";
        buttonSave.className = "btn btn-primary";
        buttonSave.style.display = "none";
        buttonSave.addEventListener("click", (e) => {
          saveStudentRow(elem.id, e);
          buttonSave.style.display = "none";
          buttonUpdate.style.display = "block";
          buttonDelete.style.display = "block";
        });
        const buttonDelete = document.createElement("button");
        buttonDelete.type = "button";
        buttonDelete.textContent = "Elimina";
        buttonDelete.className = "btn btn-primary";
        buttonDelete.addEventListener("click", (e) => {
          student.deleteStudent(elem.id);
          populateStudentTable();
        });
        cellUpdate.appendChild(buttonUpdate);
        cellUpdate.appendChild(buttonSave);
        cellDelete.appendChild(buttonDelete);
        cellIndex.scope = "row";
        row.appendChild(cellIndex);
        row.appendChild(cellName);
        row.appendChild(cellLastname);
        row.appendChild(cellEmail);
        row.appendChild(cellPhone);
        row.appendChild(cellUpdate);
        row.appendChild(cellDelete);

        tbody.appendChild(row);
      });
      /*SPOSTARE NEL gestisciDOMStudente()
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
      }*/
    }
    function modStudentRow(id) {
      const cellName = document.querySelector(`#${id} td:nth-child(2)`);
      const cellLastName = document.querySelector(`#${id} td:nth-child(3)`);
      const cellEmail = document.querySelector(`#${id} td:nth-child(4)`);
      const cellPhone = document.querySelector(`#${id} td:nth-child(5)`);
      const btnMod = document.querySelector(
        `#${id} td:nth-child(6) button[type="button"]:nth-child(1)`
      );
      const btnSave = document.querySelector(
        `#${id} td:nth-child(6) button[type="button"]:nth-child(2)`
      );
      if (btnMod) {
        console.log("pulsante lo abbiamooo");
      }
      const contentName = cellName.textContent;
      const contentLastName = cellLastName.textContent;
      const contentEmail = cellEmail.textContent;
      const contentPhone = cellPhone.textContent;

      const inputName = document.createElement("input");
      inputName.type = "text";
      inputName.id = "fname";
      inputName.name = "fname";
      const inputLastName = document.createElement("input");
      inputLastName.type = "text";
      inputLastName.id = "flastname";
      inputLastName.name = "flstname";
      const inputEmail = document.createElement("input");
      inputEmail.type = "email";
      inputEmail.id = "femail";
      inputEmail.name = "femail";
      const inputPhone = document.createElement("input");
      inputPhone.type = "tel";
      inputPhone.id = "fphone";
      inputPhone.name = "fphone";

      if (inputName && inputLastName) {
        inputName.value = contentName;
        inputLastName.value = contentLastName;
        inputEmail.value = contentEmail;
        inputPhone.value = contentPhone;

        cellName.innerHTML = "";
        cellName.appendChild(inputName);
        cellLastName.innerHTML = "";
        cellLastName.appendChild(inputLastName);
        cellEmail.innerHTML = "";
        cellEmail.appendChild(inputEmail);
        cellPhone.innerHTML = "";
        cellPhone.appendChild(inputPhone);
      }
    }
    function saveStudentRow(id, e) {
      //const idCorretto = id[id.length - 1];
      //console.log(idCorretto);
      const cellName = document.querySelector(`#${id} td:nth-child(2) input`);
      const cellLastName = document.querySelector(
        `#${id} td:nth-child(3) input`
      );
      const cellEmail = document.querySelector(`#${id} td:nth-child(4) input`);
      const cellPhone = document.querySelector(`#${id} td:nth-child(5) input`);
      const btnMod = document.querySelector(
        `#${id} td:nth-child(6) button[type="button"]:nth-child(1)`
      );
      const btnSave = document.querySelector(
        `#${id} td:nth-child(6) button[type="button"]:nth-child(2)`
      );
      if (btnMod) {
        console.log("pulsante lo abbiamooo");
      }
      const contentName = cellName.value;
      const contentLastName = cellLastName.value;
      const contentEmail = cellEmail.value;
      const contentPhone = cellPhone.value;
      console.log(contentLastName);
      student.updateStudent({
        studentId: id,
        name: contentName,
        lastName: contentLastName,
        email: contentEmail,
        phoneNumber: contentPhone,
      });
      populateStudentTable();
      e.stopPropagation();
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
        populateStudentTable();
      });
    }
    addNewStudentToApp();
    populateStudentTable();
  }
});

//export default student;

//let student = new Student(2, "giuseppe", "barca", "pino@pino.it", "3281'01202");
//console.log(student);
