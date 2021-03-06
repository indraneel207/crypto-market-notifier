const moment = require('moment')
const sound = require('sound-play')
const logUpdate = require('log-update')
const boxen = require('boxen')
const { addEntryToTable, updateEntryToTable, getEntryFromTable } = require('../database')

let lastPrice, tempPrice

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
const tickProperties = getSoundProperties()

const playSound = () => {
  const { setOn, setOff, value: isSoundPlaying } = soundProperties

  if (!isSoundPlaying()) {
    sound.play('./files/tone.mp3')
    setOn()
    setTimeout(setOff, 23000)
  }
}

const playTick = () => {
  const { setOn, setOff, value: isSoundPlaying } = tickProperties

  if (!isSoundPlaying()) {
    sound.play('./files/tick.mp3')
    setOn()
    setTimeout(setOff, 2000)
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
      playTick()
    }
    if (maxValueInDb < +price) {
      maxValueInDb = +price
      isChanged = true
      playTick()
    }
    if (isChanged) updateEntryToTable({ currencyName, minValueInDb, maxValueInDb })
  }
  return { maxValueInDb, minValueInDb }
}

const getCryptoCurrencyInfo = (tickerObj = {}, currencyName = '') => tickerObj[currencyName] || {}

const getBoxBorder = (lastPrice, currentPrice) => lastPrice && +lastPrice > +currentPrice ? 'red' : 'green'

const updatePrices = (price) => {
  if (!lastPrice || tempPrice !== price) {
    lastPrice = tempPrice
    tempPrice = price
  }
}

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

      // Updating the last and current prices
      updatePrices(price)

      logUpdate(
        boxen(
          `CRYPTO COIN: ${currencyName}\n\nCurrent Price: ${fixDecimalDigitsInNumber(
            price
          )}\n\nStats:\nMIN: ${fixDecimalDigitsInNumber(minValueInDb)} | MAX: ${fixDecimalDigitsInNumber(
            maxValueInDb
          )}\n\nTarget:\nBID: ${fixDecimalDigitsInNumber(bidValue)} | ASK: ${fixDecimalDigitsInNumber(
            askValue
          )}`,
          {
            title: `Last Updated: ${moment().format('LTS')}`,
            padding: 2,
            margin: 1,
            borderStyle: 'double',
            borderColor: getBoxBorder(lastPrice, price),
            titleAlignment: 'right',
            float: 'center'
          }
        )
      )
    })
  }
}

module.exports = {
  getCryptoCurrencyInfo,
  checkForPrice
}
