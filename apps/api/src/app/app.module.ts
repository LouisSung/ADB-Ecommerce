import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { entities } from './typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: path.join(__dirname, '../ecommerce') }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST ?? configService.get('DB_HOST') ?? 'localhost',
        port: parseInt(process.env.DB_PORT) ?? configService.get<number>('DB_PORT') ?? 5432,
        username: process.env.DB_USERNAME ?? configService.get('DB_USERNAME') ?? 'postgres',
        password: process.env.DB_PASSWORD ?? configService.get('DB_PASSWORD') ?? '',
        database: process.env.DB_NAME ?? configService.get('DB_NAME') ?? 'ecommerce',
        entities: entities,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
