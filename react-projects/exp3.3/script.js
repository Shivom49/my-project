// Base Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Hi, I'm ${this.name}, and I'm ${this.age} years old.`;
  }
}

// Subclass: Student
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    return `${this.name} is studying in grade ${this.grade}.`;
  }
}

// Subclass: Teacher
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  teach() {
    return `${this.name} teaches ${this.subject}.`;
  }
}

// Example objects
const student = new Student("Alice", 20, "12th");
const teacher = new Teacher("Mr. John", 40, "Math");

// Display functions
function showStudent() {
  document.getElementById("output").innerHTML = `
    <p><strong>Student:</strong></p>
    <p>${student.introduce()}</p>
    <p>${student.study()}</p>
  `;
}

function showTeacher() {
  document.getElementById("output").innerHTML = `
    <p><strong>Teacher:</strong></p>
    <p>${teacher.introduce()}</p>
    <p>${teacher.teach()}</p>
  `;
}
