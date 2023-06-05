import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

console.log(process.env.NODE_ENV);

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host:
    process.env.NODE_ENV === 'development' ? 'localhost' : process.env.DB_PORT,
  username: 'daniel',
  password: process.env.NODE_ENV === 'development' ? 'Daniel98$' : 'daniel98',
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
