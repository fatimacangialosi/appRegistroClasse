class Student {
  constructor() {
    this.studentList = JSON.parse(localStorage.getItem("AllStudents")) || [];
  }

  createStudent(iname, lastName, email, phoneNumber) {
    const newStudent = {
      id:
        "student" +
        Math.random().toString(16).slice(2) +
        Date.now().toString(16),
      name: iname,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    this.studentList.push(newStudent);
    localStorage.setItem("AllStudents", JSON.stringify(this.studentList));
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
    console.log("studentId: " + studentId);
    console.log("name: " + lastName);
    const studentIndex = this.studentList.findIndex(
      //(student) => student.id === studentId
      function (student) {
        console.log(student.id);
        return student.id === studentId;
      }
    );
    if (studentIndex != -1) {
      this.studentList[studentIndex].name = name;
      this.studentList[studentIndex].lastName = lastName;
      this.studentList[studentIndex].email = email;
      this.studentList[studentIndex].phoneNumber = phoneNumber;
    } else {
      console.log("non fa update student");
    }
    localStorage.setItem("AllStudents", JSON.stringify(this.studentList));

    return studentIndex;
  }
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
    localStorage.setItem("AllStudents", JSON.stringify(this.studentList));
  }
}

export default Student;
