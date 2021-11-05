const { setupSocket } = require('./socket')
const { setupDB } = require('./database')

// Variables
const observables = [
  {
    currencyName: 'SHIBINR',
    bidValue: '0.004590',
    askValue: '0.006000'
  }
  // {
  //   currencyName: 'SCINR',
  //   bidValue: '1.36',
  //   // askValue: '1.55'
  // },
  // {
  //   currencyName: 'CRVINR',
  //   bidValue: '340',
  //   askValue: '420'
  // }
]

setupDB()
setupSocket(observables)
