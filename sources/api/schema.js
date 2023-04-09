const { buildSchema } = require("graphql")

const schema = buildSchema(/* GraphQL */ `
  scalar DateTime

  input UserCreation {
    firstName: String!
    lastName: String!
    email: String
  }

  input UserEdition {
    firstName: String
    lastName: String
    email: String
  }

  type Student {
    id: Int!
    firstName: String!
    lastName: String!
    email: String
    groups: [GroupStudents]
    grades: [StudentGrades]
  }

  type Instructor {
    id: Int!
    firstName: String!
    lastName: String!
    email: String
    classes: [Class]
    gradesGiven: [StudentGrades]
  }

  input CourseCreation {
    name: String!
  }

  input CourseEdition {
    name: String
  }

  type Course {
    id: Int!
    name: String!
    groups: [Group]
  }

  input GroupCreation {
    name: String!
    startYear: Int!
    endYear: Int!
    courseId: Int!
  }

  input GroupEdition {
    name: String
    startYear: Int
    endYear: Int
    courseId: Int
  }

  type Group {
    id: Int!
    name: String!
    startYear: Int!
    endYear: Int!
    course: Course!
    students: [GroupStudents]
    classes: [Class]
  }

  type GroupStudents {
    group: Group!
    student: Student!
  }

  input SubjectCreation {
    label: String!
  }

  input SubjectEdition {
    label: String
  }

  type Subject {
    id: Int!
    label: String!
    classes: [Class]
    grades: [Grade]
  }

  input RoomCreation {
    number: Int!
  }

  input RoomEdition {
    number: Int
  }

  type Room {
    id: Int!
    number: Int!
    classes: [Class]
  }

  input ClassCreation {
    start: DateTime!
    end: DateTime!
    groupId: Int!
    subjectId: Int!
    roomId: Int!
    instructorId: Int!
  }

  input ClassEdition {
    start: DateTime
    end: DateTime
    groupId: Int
    subjectId: Int
    roomId: Int
    instructorId: Int
  }

  type Class {
    id: Int!
    start: DateTime!
    end: DateTime!
    group: Group!
    subject: Subject!
    room: Room!
    instructor: Instructor!
  }

  input GradeCreation {
    label: String!
    maximum: Int!
    subjectId: Int!
  }

  input GradeEdition {
    label: String
    maximum: Int
    subjectId: Int
  }

  type Grade {
    id: Int!
    label: String!
    maximum: Int!
    subject: Subject!
    students: [StudentGrades]
  }

  input StudentGradesCreation {
    value: Int!
    studentId: Int!
    gradeId: Int!
    instructorId: Int!
  }

  type StudentGrades {
    value: Int!
    student: Student!
    grade: Grade!
    evaluateBy: Instructor!
  }

  type Query {
    studentGetByID(id: Int!): Student
    studentGetAll: [Student]

    instructorGetByID(id: Int!): Instructor
    instructorGetAll: [Instructor]

    courseGetByID(id: Int!): Course
    courseGetAll: [Course]

    groupGetByID(id: Int!): Group
    groupGetAll: [Group]

    subjectGetByID(id: Int!): Subject
    subjectGetAll: [Subject]

    roomGetByID(id: Int!): Room
    roomGetAll: [Room]

    classGetByID(id: Int!): Class
    classGetAll: [Class]

    gradeGetByID(id: Int!): Grade
  }

  type Mutation {
    studentCreate(data: UserCreation!): Student!
    studentEdit(id: Int!, data: UserEdition!): Student!
    studentDelete(id: Int!): Boolean!

    instructorCreate(data: UserCreation!): Instructor!
    instructorEdit(id: Int!, data: UserEdition!): Instructor!
    instructorDelete(id: Int!): Boolean!

    courseCreate(data: CourseCreation!): Course!
    courseEdit(id: Int!, data: CourseEdition!): Course!
    courseDelete(id: Int!): Boolean!

    groupCreate(data: GroupCreation!): Group!
    groupEdit(id: Int!, data: GroupEdition!): Group!
    groupDelete(id: Int!): Boolean!

    addGroupStudent(groupId: Int!, studentId: Int!): GroupStudents!
    removeGroupStudent(groupId: Int!, studentId: Int!): Boolean!

    subjectCreate(data: SubjectCreation!): Subject!
    subjectEdit(id: Int!, data: SubjectEdition!): Subject!
    subjectDelete(id: Int!): Boolean!

    roomCreate(data: RoomCreation!): Room!
    roomEdit(id: Int!, data: RoomEdition!): Room!
    roomDelete(id: Int!): Boolean!

    classCreate(data: ClassCreation!): Class!
    classEdit(id: Int!, data: ClassEdition!): Class!
    classDelete(id: Int!): Boolean!

    gradeCreate(data: GradeCreation!): Grade!
    gradeEdit(id: Int!, data: GradeEdition!): Grade!
    gradeDelete(id: Int!): Boolean!

    addStudentGrade(data: StudentGradesCreation): StudentGrades!
    removeStudentGrade(studentId: Int!, gradeId: Int!): Boolean!
  }
`)

module.exports = { schema }
