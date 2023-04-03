const { buildSchema } = require("graphql")

const schema = buildSchema(/* GraphQL */ `
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
  }

  type Instructor {
    id: Int!
    firstName: String!
    lastName: String!
    email: String
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
  }
`)

module.exports = { schema }
