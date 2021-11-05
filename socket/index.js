const io = require('socket.io-client')
const { getCryptoCurrencyInfo, checkForPrice } = require('../service')
const { URLS, channelList, eventsList } = require('../service/enums')

module.exports.setupSocket = (observables) => {
  const socket = io(URLS.SOCKET, {
    transports: ['websocket'],
    origin: '*'
  })

  socket.on('connect', () => {
    socket.emit('join', { channelName: channelList.HOUR_CHANGE })
    console.log('Connected to Socket with ID: ', socket.id)
  })

  socket.on('error', (err) => {
    console.err(err)
  })

  socket.on(eventsList.UPDATE_PRICES_3S, ({ event, data }) => {
    observables.forEach(({ currencyName, askValue, bidValue }) => {
      const cryptoCurrencyPrice = getCryptoCurrencyInfo(JSON.parse(data), currencyName)
      cryptoCurrencyPrice && checkForPrice({ currencyName, price: cryptoCurrencyPrice, bidValue, askValue })
    })
  })
}
