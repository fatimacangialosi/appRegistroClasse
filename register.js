//import student from "./controller";

class SchoolRecord {
  constructor(subjectName) {
    this.idRecord =
      "register" +
      Math.random().toString(16).slice(2) +
      Date.now().toString(16);
    this.subjectName = subjectName;
    this.studentList = [];
    this.gradeList = [];
    this.lessonList = [];
  }
  static fromJSON(data) {
    const newRecord = new SchoolRecord(data.subjectName);
    newRecord.idRecord = data.idRecord;
    newRecord.studentList = data.studentList;
    newRecord.gradeList = data.gradeList;
    newRecord.lessonList = data.lessonList;

    return newRecord;
  }

  getStudentList() {
    return this.studentList;
  }
  getLessonList() {
    return this.lessonList;
  }
  getLesson(lessonDate) {
    let verify = false;
    this.lessonList.forEach((elem) => {
      console.log(elem.lessonDate + lessonDate);
      if (elem.lessonDate == lessonDate) {
        verify = true;
      }
    });
    return verify;
  }
  getGradeList() {
    return this.gradeList;
  }
  getSubjectName() {
    return this.subjectName;
  }
  //attendances;
  addStudent(...studentId) {
    console.log(...studentId);
    console.log(studentId);
    studentId.forEach((elem) => {
      this.studentList.push(elem);
      console.log(elem);
    });
    return this.studentList;
  }

  addGrade(gradeDate, gradeValue, studentId) {
    const grade = {
      gradeId:
        "grade" + Math.random().toString(16).slice(2) + Date.now().toString(16),
      gradeDate: gradeDate,
      gradeValue: gradeValue,
      studentId: studentId,
    };
    this.gradeList.push(grade);
  }

  addLesson(
    //lessonId = Math.random().toString(16).slice(2) + Date.now().toString(16),
    lessonDate
    //lessonStudentList
  ) {
    const lesson = {
      //lessonId: lessonId,
      lessonDate: lessonDate,
      //lessonStudentList: lessonStudentList,
      attendances: [],
    };
    this.lessonList.push(lesson);
    return lesson;
  }
  //1)////////////////////////////////////
  addAttendanceToLesson(lessonDate, studentId, entryTime, exitTime) {
    const attendance = {
      attendanceId:
        Math.random().toString(16).slice(2) + Date.now().toString(16),
      //lessonId: lessonId,
      studentId: studentId,
      entryTime: entryTime,
      exitTime: exitTime,
    };
    console.log("LESSON DATE: " + lessonDate);
    let controllo = true;
    for (let i = 0; i < this.lessonList.length; i++) {
      if (this.lessonList[i].lessonDate == lessonDate) {
        const lesson = this.lessonList[i];
        for (let j = 0; j < lesson.attendances.length; j++) {
          const attendance = lesson.attendances[j];
          if (lesson.attendances[j].studentId == studentId) {
            controllo = false;
          }
        }
        if (controllo) {
          lesson.attendances.push(attendance);
          console.log(`Presenza registrata per lo studente ${studentId} `);
          return;
        } else {
          console.log(
            `Lo studente con ID ${studentId} ha già una presentza nel registro.`
          );
          return;
        }
      } else {
        console.log("Non ci siamo");
      }
    }
  }
  //////////////////////////////////////////////////
  showAttendanceToLesson(lessonId, studentId, entryTime, exitTime) {
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      for (j = 0; j < lesson.student.length; j++) {
        const student = lesson.students[j];
        if (lesson.students[j].id == id) {
          console.log(
            `Presenza registrata per lo studente ${lesson.students[j]} `
          );
          return;
        }
      }
    }
  }
  /////////////////////////////////////////
  updateAttendance(lessonId, studentId, entryTime, exitTime) {
    /*const attendances = {
    lessonId: lessonId,
    studentId: studentId,
    entryTime: entryTime,
    exitTime: exitTime,
  };*/
    for (i = 0; i < this.lessonList.length; i++) {
      if (this.lessons[i] == lessonId) {
        this.lessons[i].attendances.array.forEach((element) => {
          if (element.studentId == studentId) {
            element.entryTime = entryTime;
            element.exitTime = exitTime;
          }
        });
        //this.lessons[i].attendance.(attendences);
      }
      return attendences;
    }
  }
  //////////////////////////////
  dropAttendance(lessonId, studentId) {
    /*const attendances = {
    lessonId: lessonId,
    studentId: studentId,
    entryTime: entryTime,
    exitTime: exitTime,
  };*/
    for (i = 0; i < this.lessonList.length; i++) {
      if (this.lessonList[i].lessonId == lessonId) {
        for (j = 0; j < this.lessonList[i].attendance.length; j++) {
          if (this.lessonList[i].attendance[j].studentId == studentId) {
            this.lessonList[i].attendance.splice(j, 1);
            return;
          } else return;
        }
      }
    }
  }
}

export default SchoolRecord;
