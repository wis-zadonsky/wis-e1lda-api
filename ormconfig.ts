import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  database: 'wis_eda',
  port: 5432,
  username: 'postgres',
  password: 'password',
  entities: ['dist/src/**/*entity.js'],
  migrations: ['migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
};
