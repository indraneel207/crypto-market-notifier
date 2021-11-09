module.exports.eventsList = {
  UPDATE_INSTA_PRICES: 'update-insta-prices',
  DEPTH_UPDATE: 'depth-update',
  UPDATE_PRICES_3S: 'update-prices-3s',
  DF_UPDATE_PRICES: 'df-update-prices',
  NEW_TRADE: 'new-trade'
}

module.exports.channelList = {
  HOUR_CHANGE: '24_hour_price_changes',
  I_SHIB_INR: 'I-SHIB_INR',
  I_SHIB_INR_1M: 'I-SHIB_INR_1m'
}

module.exports.URLS = {
  API: 'https://public.coindcx.com/exchange/ticker',
  SOCKET: 'wss://stream.coindcx.com'
}

module.exports.queries = {
  // Create
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS alarms (
  id integer primary key autoincrement,
  name VARCHAR(8) UNIQUE,
  min_value REAL,
  max_value REAL
  )`,
  CREATE_NAME_MAX_VALUE_INDEX: 'CREATE INDEX IF NOT EXISTS alarms_name_value on alarms (name, max_value)',
  CREATE_NAME_MIN_VALUE_INDEX: 'CREATE INDEX IF NOT EXISTS alarms_name_value on alarms (name, min_value)',
  CREATE_NAME_INDEX: 'CREATE INDEX IF NOT EXISTS alarms_name on alarms (name)',

  // Insert
  INSERT_ENTRY: 'INSERT INTO alarms(name, min_value, max_value) VALUES (?, ?, ?)',

  // Fetch
  GET_NAMES_AMOUNT: 'SELECT id, name, min_value, max_value from alarms',
  GET_NAMES: 'SELECT DISTINCT name from alarms',
  GET_ONE_ALARM: 'SELECT * from alarms where name = ?',

  // Update
  UPDATE_ENTRY: 'UPDATE alarms set min_value = ?, max_value = ? where name = ?',

  // Delete
  DELETE_ENTRY: 'DELETE FROM alarms where id = ?',
  
  DELETE_TABLE: 'DROP TABLE IF EXISTS alarms'
}
