import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

console.log(process.env.NODE_ENV);

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'daniel',
  password: process.env.NODE_ENV === 'development' ? 'Daniel98$' : 'daniel98',
  database: 'punpay',
  entities: ['./dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['./dist/db/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
