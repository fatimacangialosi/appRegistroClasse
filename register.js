class SchoolRecord {
  constructor(idRecord, subjectName) {
    this.idRecord = idRecord;
    this.subjectName = subjectName;
    this.studentList = [];
    this.gradeList = [];
    this.lessonList = [];
  }

  addStudent(student) {
    this.studentList.push(student);
  }

  addGrade(gradeId, gradeDate, gradeValue, studentId) {
    const grade = {
      gradeId: Math.random().toString(16).slice(2) + Date.now().toString(16),
      gradeDate: gradeDate,
      gradeValue: gradeValue,
      studentId: studentId,
    };
    this.gradeList.push(grade);
  }

  addLesson(lessonId, lessonDate, lessonStudentList) {
    const lesson = {
      lessonId: Math.random().toString(16).slice(2) + Date.now().toString(16),
      lessonDate: lessonDate,
      lessonStudentList: lessonStudentList,
    };
    this.lessonList.push(lesson);
  }
}
