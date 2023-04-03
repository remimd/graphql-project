const dotenv = require("dotenv")

dotenv.config()

const settings = {
  port: process.env.PORT || 8000,
}

module.exports = { settings }
