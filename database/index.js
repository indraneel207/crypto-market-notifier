const sqlite3 = require('sqlite3')
const { queries } = require('../service/enums')
const db = new sqlite3.Database('./database/alarms.sqlite3')

module.exports.setupDB = () => {
  db.run(queries.CREATE_TABLE, () => {
    db.run(queries.CREATE_NAME_INDEX)
    db.run(queries.CREATE_NAME_MAX_VALUE_INDEX)
    db.run(queries.CREATE_NAME_MIN_VALUE_INDEX)
  })
  return db
}

module.exports.addEntryToTable = ({ currencyName, minValueInDb, maxValueInDb }) => {
  db.run(queries.INSERT_ENTRY, [currencyName, minValueInDb, maxValueInDb], () =>
    console.log(`Added ${currencyName} to the Database`)
  )
}

module.exports.updateEntryToTable = ({ currencyName, minValueInDb, maxValueInDb }) => {
  db.run(queries.UPDATE_ENTRY, [minValueInDb, maxValueInDb, currencyName], () =>
    console.log(`${currencyName} updated successfully in the Database`)
  )
}

module.exports.getEntryFromTable = ({ currencyName }, callback) => {
  db.get(queries.GET_ONE_ALARM, [currencyName], (err, entry) => {
    if (err) console.error('Error in initializing Entry in Database', err)
    else callback(entry)
  })
}
