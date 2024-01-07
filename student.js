//import Student from "./student";

class Student {
  constructor() {
    this.studentList = JSON.parse(localStorage.getItem("AllStudents")) || [];
    this.studentList.push(student1);
    this.studentList.push(student2);
  }
  // Lista di tutti gli studenti
  //studentList = [];

  createStudent(iname, lastName, email, phoneNumber) {
    const newStudent = {
      id:
        "student" +
        Math.random().toString(16).slice(2) +
        Date.now().toString(16),
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
    //console.log("student.id: " + student.id);
    console.log("studentId: " + studentId);
    console.log("name: " + lastName);
    const studentIndex = this.studentList.findIndex(
      (student) => student.id === studentId
    );
    console.log(studentIndex);
    if (studentIndex === 0) {
      this.studentList[studentIndex].name = name;
      this.studentList[studentIndex].lastName = lastName;
      this.studentList[studentIndex].email = email;
      this.studentList[studentIndex].phoneNumber = phoneNumber;
      /*name
        ? (this.studentList[studentIndex].name = name)
        : (this.studentList[studentIndex].name =
            this.studentList[studentIndex].name);
      lastName
        ? (this.studentList[studentIndex].lastName = lastName)
        : (this.studentList[studentIndex].lastName =
            this.studentList[studentIndex].lastName);
      email
        ? (this.studentList[studentIndex].email = email)
        : (this.studentList[studentIndex].email =
            this.studentList[studentIndex].email);
      phoneNumber
        ? (this.studentList[studentIndex].phoneNumber = phoneNumber)
        : (this.studentList[studentIndex].phoneNumber =
            this.studentList[studentIndex].phoneNumber);*/
    } else {
      console.log("non fa update student");
    }
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
  name: "Giuseppe",
  lastName: "Barca",
  email: "giuseppeb@gmail.com",
  phoneNumber: "Math",
};
const student2 = {
  id: "2",
  name: "fatim",
  lastName: "cangialosi",
  email: "fatima@gmail.com",
  phoneNumber: "Math",
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
