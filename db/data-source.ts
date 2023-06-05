import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

console.log(process.env.NODE_ENV);

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  database: 'punpay',
  entities: ['./dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['./dist/db/migrations/*.js'],
  ssl:
    process.env.NODE_ENV === 'development'
      ? false
      : { rejectUnauthorized: false },
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
