require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby:{
      url: process.env.API_URL,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
};
