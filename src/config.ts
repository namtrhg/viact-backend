import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export interface Configuration {
  nodeEnv: string;
  appName: string;
  auth: {
    accessTokenLifetime: string | number;
    secret: string;
  };
  typeorm: DataSourceOptions;
}

export const configFactory = (): Configuration => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: 'ViAct API',
  auth: {
    accessTokenLifetime: '30d',
    secret: 'secret',
  },
  typeorm: {
    type: 'mysql',
    url: process.env.CLEARDB_DATABASE_URL || 'mysql://root:root@localhost:3306/viact',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    migrations: [`${__dirname}/migrations/*.{ts,js}`],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    timezone: 'Z',
    // logging: true,
    synchronize: true,
  },
});

export default configFactory;
