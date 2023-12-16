class Student {
  constructor(name, lastName, email, lessonId) {
    this.id = Math.random().toString(16).slice(2) + Date.now().toString(16);
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.lesson = lessonId;
  }
}
