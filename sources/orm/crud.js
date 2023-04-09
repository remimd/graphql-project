const { client } = require("./client")

function _generateInclude(relations) {
  const include = {}

  for (const relation of relations) {
    include[relation] = true
  }

  return include
}

function createFactory(table, relations) {
  return async ({ data }) => {
    const include = _generateInclude(relations)
    return await client[table].create({ data, include })
  }
}

function getByIDFactory(table, relations) {
  return async ({ id }) => {
    const include = _generateInclude(relations)

    try {
      return await client[table].findUnique({ where: { id }, include })
    } catch (exc) {
      return null
    }
  }
}

function getAllFactory(table, relations) {
  return async () => {
    const include = _generateInclude(relations)
    return await client[table].findMany({ include })
  }
}

function editFactory(table, relations) {
  return async ({ id, data }) => {
    const include = _generateInclude(relations)
    return await client[table].update({ where: { id }, data, include })
  }
}

function deleteFactory(table, ..._) {
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

function crud(table, relations = [], excludes = []) {
  const methods = {}

  for (const [key, value] of Object.entries(builder)) {
    if (excludes.includes(key)) {
      continue
    }

    methods[`${table}${value.name}`] = value.factory(table, relations)
  }

  return methods
}

module.exports = { crud }
