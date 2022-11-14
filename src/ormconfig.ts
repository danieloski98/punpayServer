import { DataSource } from 'typeorm';

// Using environment variables
import dotenv from 'dotenv';
dotenv.config();

const connectDB = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: process.env.DB_USER,
  port: +process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  url: process.env.DATABASE_URI,
  logging: false,
  synchronize: true,
  entities: ['./src/Entities/**/*.ts'],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default connectDB;
