/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const Fluidcoins = require('@fluidcoins/sdk');

const fluidcoins = new Fluidcoins(process.env.FLUID_COIN_SECRET);

export default fluidcoins;
