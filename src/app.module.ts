import {
  ClassSerializerInterceptor,
  INestApplication,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { attachRequestMiddleware } from 'common/middlewares/attach-request.middleware';

import { AuthModule } from './auth/auth.module';
import configFactory from './config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configFactory] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const ormConfig = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!ormConfig) {
          throw new Error('TypeORM config not found');
        }
        return ormConfig;
      },
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

/**
 * Init nest app for testing or live run
 */
export function initNestApp(app: INestApplication) {
  app.use(attachRequestMiddleware);

  // enable URI Versioning
  app.enableVersioning();

  // enable transforming entity class to json
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get('Reflector')));

  // enable class validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}
