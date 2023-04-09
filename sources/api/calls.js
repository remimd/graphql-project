const { client } = require("../orm/client")
const { crud } = require("../orm/crud")

module.exports = {
  // Student
  ...crud("student", ["groups", "grades"]),

  // Instructor
  ...crud("instructor", ["classes", "gradesGiven"]),

  // Course
  ...crud("course", ["groups"]),

  // Group
  ...crud("group", ["course", "students", "classes"]),

  addGroupStudent: async ({ groupId, studentId }) => {
    return client.groupStudents.create({
      data: { groupId, studentId },
      include: {
        group: true,
        student: true,
      },
    })
  },
  removeGroupStudent: async ({ groupId, studentId }) => {
    try {
      const object = await client.groupStudents.delete({
        where: { groupId_studentId: { groupId, studentId } },
      })
      return !!object
    } catch (exc) {
      return false
    }
  },

  // Subject
  ...crud("subject", ["classes", "grades"]),

  // Room
  ...crud("room", ["classes"]),

  // Class
  ...crud("class", ["group", "subject", "room", "instructor"]),

  // Grade
  ...crud("grade", ["subject", "students"], ["getAll"]),

  addStudentGrade: async ({ data }) => {
    return client.studentGrades.create({
      data,
      include: {
        student: true,
        grade: true,
      },
    })
  },
  removeStudentGrade: async ({ studentId, gradeId }) => {
    try {
      const object = await client.studentGrades.delete({
        where: { studentId_gradeId: { studentId, gradeId } },
      })
      return !!object
    } catch (exc) {
      return false
    }
  },
}
