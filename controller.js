import SchoolRecord from "./register.js";
import Student from "./student.js";

let registers = localStorage.getItem("register")
	? JSON.parse(localStorage.getItem("register"))
	: [];
const student = new Student();
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
		getNameMatter();
		getDataStudent();
		viewButtonMatter();
	}

	function gestisciDOMRegistro() {
		//LE FUNZIONI PER IL POPOLAMENTO DELLA TABLE NEL REGISTRO VANNO QUI
		function populateNameMatter() {
			const nameMatter = sessionStorage.getItem("nameMatter");
			const h2 = document.getElementById("hmatter");
			h2.innerHTML = "";
			h2.innerHTML += `${nameMatter}`;
		}
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
		function studentspopolation() {
			const headerRow = document.createElement("tr");
			headerRow.innerHTML =
				"<th>Nome</th><th>Cognome</th><th>Presenza</th><th>Orario Ingresso</th><th>Orario Uscita</th><th>Voto</th>";
			const studentTable = document.getElementById("tBodyAdd");
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
		studentspopolation();
		populateAddStudentModal();
		populateNameMatter();
	}
});

//export default student;

//let student = new Student(2, "giuseppe", "barca", "pino@pino.it", "3281'01202");
//console.log(student);
