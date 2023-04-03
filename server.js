const express = require("express")
const { graphqlHTTP } = require("express-graphql")

const root = require("./sources/api/calls")
const { schema } = require("./sources/api/schema")
const { settings } = require("./sources/settings")

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(settings.port)

console.log(`Running a GraphQL API server at http://localhost:${settings.port}/graphql`)
