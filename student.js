//import Student from "./student";

class Student {
  constructor() {
    this.studentList = JSON.parse(localStorage.getItem("AllStudents")) || [];
  }
  // Lista di tutti gli studenti
  //studentList = [];

  createStudent(id, iname, lastName, email, phoneNumber) {
    const newStudent = {
      id: id, //Math.random().toString(16).slice(2) + Date.now().toString(16);
      name: iname, // Modifica questa linea
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    this.studentList.push(newStudent);
    console.log(newStudent);
    return newStudent;
  }

  getStudents() {
    return this.studentList;
  }

  getStudent(studentId) {
    const foundedStudent = this.studentList.find((a) => a.id === studentId);
    return foundedStudent;
  }

  updateStudent({ studentId, name, lastName, email, phoneNumber }) {
    const studentIndex = this.studentList.forEach((student) => {
      if (student.id === studentId) {
        name ? (student.name = name) : (student.name = student.name);
        lastName
          ? (student.lastName = lastName)
          : (student.lastName = student.lastName);
        email ? (student.email = email) : (student.email = student.email);
        phoneNumber
          ? (student.phoneNumber = phoneNumber)
          : (student.phoneNumber = student.phoneNumber);
      }
    });
    /*studentIndex.iname = iname;
      studentIndex.lastName = lastName;
      studentIndex.email = email;
      studentIndex.phoneNumber = phoneNumber;*/
    return studentIndex;
  }
  /*function connectStudentToRegister(student, lessonId) {
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
    }*/

  deleteStudent(studentId) {
    const studentIndex = this.studentList.findIndex(
      (student) => student.id === studentId
    );
    if (studentIndex !== -1) {
      const deletedStudent = this.studentList.splice(studentIndex, 1)[0];
      console.log(`Studente ${deletedStudent.name} rimosso con successo.`);
    } else {
      console.log(`Studente con ID ${studentId} non trovato.`);
    }
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

//createStudent(1, "giuseppe", "barca", "pino@pino.it", "3281'01202");
//createStudent(2, "giuseppe", "barca", "pino@pino.it", "3281'01202");
//updateStudent({ studentId: 1, name: "alessandro" });
//console.log(getStudent(1));
export default Student;

/*const studentList = new StudentList();
  studentList.createStudent(1, "giuseppe", "barca", "pino@pino.it", "3281'01202");
  studentList.createStudent(
    2,
    "fatima",
    "cangialosi",
    "fatim@pino.it",
    "3281'01202"
  );
  studentList.getStudent(1);*/
