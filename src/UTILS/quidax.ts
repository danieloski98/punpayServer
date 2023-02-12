/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Quidax = require('quidax-node');
require('dotenv').config();

const quidax = new Quidax(process.env.QDX_SECRET);

export { quidax };
