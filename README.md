# Crypto Market Notifier

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Configuration](#configuration)
6. [Contributing](#contributing)
7. [License](#license)

## Description
Crypto Market Notifier is a tool designed for cryptocurrency traders. It provides real-time price updates and audible alerts when the price of a specified cryptocurrency falls below a given bid or rises above a given ask value. This allows traders to stay informed about market conditions without the need to constantly monitor prices themselves.

## Features
- Real-time price updates via a socket connection to a cryptocurrency exchange.
- Audible alerts when the price crosses the user-defined bid or ask values.
- Customizable bid and ask values for each cryptocurrency the user is interested in.

## Installation
1. Clone the repository: `git clone https://github.com/indraneel207/crypto-market-notifier.git`
2. Navigate into the project directory: `cd crypto-market-notifier`
3. Install the dependencies: `npm install`

## Usage
1. Set your desired bid and ask values in the configuration file.
2. Run the notifier: `npm start`

## Configuration
The configuration file is where you set the bid and ask values for the cryptocurrencies you're interested in. Here's an example of what the configuration file might look like:

```json
{
  "Bitcoin": {
    "bid": 50000,
    "ask": 60000
  },
  "Ethereum": {
    "bid": 3000,
    "ask": 4000
  }
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
