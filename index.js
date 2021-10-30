const { default: axios } = require('axios')
const cron = require('node-cron')
const sound = require('sound-play')

// Variables
const URL = 'https://public.coindcx.com/exchange/ticker'
const observables = [
  {
    currencyName: 'SHIBINR',
    bidValue: '0.0054',
    askValue: '0.0061'
  },
  {
    currencyName: 'SCINR',
    bidValue: '1.36',
    askValue: '1.45'
  },
  {
    currencyName: 'CRVINR',
    bidValue: '340',
    askValue: '420'
  }
]

const scheduledTimeFrame = '*/3 * * * * *'

const getCurrentTicker = async () => {
  try {
    const result = await axios.get(URL)
    return result.data
  } catch (error) {
    console.log(`Error Message: ${error}`)
  }
}

const getCryptoCurrencyInfo = (tickerArray = [], currencyName = '') => tickerArray.find((each) => each.market === currencyName) || {}

const checkForPrice = async (cryptoCurrencyInfo = {}, minValue, maxValue) => {
  const { bid = Number.MAX_VALUE, ask = Number.MIN_VALUE } = cryptoCurrencyInfo
  console.log(cryptoCurrencyInfo, new Date())
  if (+bid <= +minValue) {
    await sound.play('./files/tone.mp3')
  }
  // if (+ask >= +maxValue) {
  //   await sound.play('./files/tone.mp3')
  // }
}

cron.schedule(scheduledTimeFrame, async () => {
  const tickerInfo = await getCurrentTicker()
  observables.forEach(({ currencyName, askValue, bidValue }) => {
    const cryptoCurrencyInfo = getCryptoCurrencyInfo(tickerInfo, currencyName)
    cryptoCurrencyInfo && checkForPrice(cryptoCurrencyInfo, bidValue, askValue)
  })
})
