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
    studentId.forEach((elem) => {
      this.studentList.push(elem);
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

  addAttendanceToLesson(lessonDate, studentId, entryTime, exitTime) {
    const attendance = {
      attendanceId:
        Math.random().toString(16).slice(2) + Date.now().toString(16),
      //lessonId: lessonId,
      studentId: studentId,
      entryTime: entryTime,
      exitTime: exitTime,
    };
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

  //////////////////////////////////////////////////????
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
  updateAttendance(lessonD, studId, entryT, exitT) {
    const attendances = {
      lessonId: Math.random().toString(16).slice(2) + Date.now().toString(16),
      studentId: studId,
      entryTime: entryT,
      exitTime: exitT,
    };
    const newLessonList = this.lessonList.map((lesson) => {
      if (lesson.lessonDate === lessonD) {
        const updatedAttendances = lesson.attendances.map((attendance) => {
          if (attendance.studentId === studId) {
            return {
              ...attendance,
              entryTime: entryT,
              exitTime: exitT,
            };
          }
          return attendance;
        });
        return {
          ...lesson,
          attendances: updatedAttendances,
        };
      }
      return lesson;
    });
    this.lessonList = newLessonList;
  }
  updateGrade(gradeDate, gradeValue, studentId) {
    const gradeListUp = this.gradeList.filter((gr) => {
      return !(gr.gradeDate === gradeDate && gr.studentId === studentId);
    });
    const gradeUp = {
      gradeId:
        "grade" + Math.random().toString(16).slice(2) + Date.now().toString(16),
      gradeDate: gradeDate,
      gradeValue: gradeValue,
      studentId: studentId,
    };
    gradeListUp.push(gradeUp);
    this.gradeList = gradeListUp;
    return gradeUp;
  }
  //////////////////////////////
  dropGrade(gradeDate, studentId) {
    const newGradeList = this.gradeList.filter((gr) => {
      return !(gr.gradeDate === gradeDate && gr.studentId === studentId);
    });
    this.gradeList = newGradeList;
  }
  dropAttendance(lessonDate, studentId) {
    const newLessonList = this.lessonList.map((lesson) => {
      if (lesson.lessonDate === lessonDate) {
        const newAttendaces = lesson.attendances.filter(
          (attendance) => attendance.studentId !== studentId
        );
        return { ...lesson, attendances: newAttendaces };
      }
      return lesson;
    });

    this.lessonList = newLessonList;
  }
  dropStudent(...studentId) {
    const newStudentList = this.studentList.filter((student) => {
      return !studentId.includes(student);
    });
    this.studentList = newStudentList;
  }
}

export default SchoolRecord;
