const { crud } = require("../orm/crud")

module.exports = {
  // Student
  ...crud("student"),

  // Instructor
  ...crud("instructor"),

  // Course
  ...crud("course"),

  // Group
  ...crud("group"),

  // Subject
  ...crud("subject"),

  // Room
  ...crud("room"),

  // Class
  ...crud("class"),

  // Grade
  ...crud("grade", ["getAll"]),
}
