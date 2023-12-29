/*constructor(iname, lastName, email, lessonId) {
  this.id = Math.random().toString(16).slice(2) + Date.now().toString(16);
  this.name = iname; // Modifica questa linea
  this.lastName = lastName;
  this.email = email;
  this.lesson = lessonId;
}
}*/
// Esporta la classe Student

// Registro degli studenti
let studentList = [];

function createStudent(iname, lastName, email, lessonId) {
  const newStudent = new Student(iname, lastName, email, lessonId);
  studentList.push(newStudent);
  return newStudent;
}

function connectStudentToRegister(student, lessonId) {
  const foundedStudent = studentList.find((a) => a.id === student.id);
  if (foundedStudent) {
    foundedStudent.lessonId = lessonId;
    console.log(
      `Connessione dello studente: ${foundedStudent.iname} riuscita con la lezione ${lessonId}`
    );
    return true;
  } else {
    console.log(
      `Connessione dello studente con ID ${student.id} non riuscita con la lezione ${lessonId}`
    );
    return false;
  }
}

function deleteStudent(studentId) {
  const studentIndex = studentList.findIndex(
    (student) => student.id === studentId
  );
  if (studentIndex !== -1) {
    const deletedStudent = studentList.splice(studentIndex, 1)[0];
    console.log(`Studente ${deletedStudent.name} rimosso con successo.`);
  } else {
    console.log(`Studente con ID ${studentId} non trovato.`);
  }
}

/*function updateStudent(){};
function getStudent(
);
function assignStudentVote();
function updateStudentVote();
deleteStudentVote();
createAttendance();
deleteAttendance();
updateAttendence();*/

// remainder class Student {
//constructor(iname, lastName, email, lessonId)

//const schoolRecord = new SchoolRecord("school1", "Math");
const student1 = {
  id: "1",
  iname: "Giuseppe",
  lastName: "Barca",
  email: "giuseppeb@gmail.com",
  lessonId: "Math",
};
const student2 = {
  id: "2",
  iname: "fatim",
  lastName: "cangialosi",
  email: "fatima@gmail.com",
  lessonId: "Math",
};
const student3 = {
  id: "3",
  iname: "alessandro",
  lastName: "russo",
  email: "alerusso@gmail.com",
  lessonId: "Math",
};

//SchoolRecord.addStudent(student1);
//SchoolRecord.addStudent(student2);
//SchoolRecord.deleteStudent("3");
