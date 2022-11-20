import * as dotenv from 'dotenv';

dotenv.config();

const path = `${__dirname}/../../.env.${process.env.NODE_ENV}`;

dotenv.config({ path });
