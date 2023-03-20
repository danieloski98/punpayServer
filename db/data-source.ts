import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'daniel',
  password: 'daniel98',
  database: 'punpay',
  entities: ['./dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['./dist/db/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
