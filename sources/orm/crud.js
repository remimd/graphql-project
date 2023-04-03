const { client } = require("./client")

function createFactory(table) {
  return async ({ data }) => {
    return client[table].create({ data })
  }
}

function getByIDFactory(table) {
  return async ({ id }) => {
    try {
      return await client[table].findUnique({ where: { id } })
    } catch (exc) {
      return null
    }
  }
}

function getAllFactory(table) {
  return async () => {
    return client[table].findMany()
  }
}

function editFactory(table) {
  return async ({ id, data }) => {
    return client[table].update({ where: { id }, data })
  }
}

function deleteFactory(table) {
  return async ({ id }) => {
    try {
      const object = await client[table].delete({ where: { id } })
      return !!object
    } catch (exc) {
      return false
    }
  }
}

const builder = {
  create: {
    name: "Create",
    factory: createFactory,
  },
  getByID: {
    name: "GetByID",
    factory: getByIDFactory,
  },
  getAll: {
    name: "GetAll",
    factory: getAllFactory,
  },
  edit: {
    name: "Edit",
    factory: editFactory,
  },
  delete: {
    name: "Delete",
    factory: deleteFactory,
  },
}

function crud(table, excludes = []) {
  const methods = {}

  for (const [key, value] of Object.entries(builder)) {
    if (excludes.includes(key)) {
      continue
    }

    methods[`${table}${value.name}`] = value.factory(table)
  }

  return methods
}

module.exports = { crud }
