const moment = require('moment')
const sound = require('sound-play')
const { addEntryToTable, updateEntryToTable, getEntryFromTable } = require('../database')

const getSoundProperties = () => {
  let isSoundPlaying = false
  const setSound = (val) => {
    isSoundPlaying = val
  }
  return {
    setOn: () => setSound(true),
    setOff: () => setSound(false),
    value: () => isSoundPlaying
  }
}

const soundProperties = getSoundProperties()

const playSound = () => {
  const { setOn, setOff, value: isSoundPlaying } = soundProperties

  if (!isSoundPlaying()) {
    sound.play('./files/tone.mp3')
    setOn()
    setTimeout(setOff, 23000)
  }
}

const fixDecimalDigitsInNumber = (number) => Number(number).toFixed(6)

const updateMaxMinValuesInDB = (entry, updateObject) => {
  const { currencyName, price } = updateObject
  let { min_value: minValueInDb = price, max_value: maxValueInDb = price } = entry || {}

  if (!entry) addEntryToTable({ currencyName, minValueInDb, maxValueInDb })
  else {
    let isChanged = false

    if (minValueInDb > +price) {
      minValueInDb = +price
      isChanged = true
    }
    if (maxValueInDb < +price) {
      maxValueInDb = +price
      isChanged = true
    }
    if (isChanged) updateEntryToTable({ currencyName, minValueInDb, maxValueInDb })
  }
  return { maxValueInDb, minValueInDb }
}

const getCryptoCurrencyInfo = (tickerObj = {}, currencyName = '') => tickerObj[currencyName] || {}

const checkForPrice = ({ currencyName, price, bidValue, askValue }) => {
  if (price !== undefined || price !== null) {
    getEntryFromTable({ currencyName }, (entry) => {
      if (+price <= +bidValue) {
        console.log(`Alert! Price(${price}) value less than BID(${bidValue}) value`)
        playSound()
      }

      if (+price >= +askValue) {
        console.log(`Alert! Price(${price}) value more than ASK(${askValue}) value`)
        playSound()
      }

      const { minValueInDb = undefined, maxValueInDb = undefined } = updateMaxMinValuesInDB(entry, {
        currencyName,
        price
      })

      console.log(
        `Update at ${moment().format('LTS')} | price: ${fixDecimalDigitsInNumber(
          price
        )} | MIN: ${fixDecimalDigitsInNumber(minValueInDb)} | MAX: ${fixDecimalDigitsInNumber(maxValueInDb)}`
      )
    })
  }
}

module.exports = {
  getCryptoCurrencyInfo,
  checkForPrice
}
