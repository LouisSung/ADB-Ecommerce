import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neo4jModule } from '@nhogs/nestjs-neo4j';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { entities } from './typeorm';

import { CancelModule } from './entity/cancel/cancel.module';
import { OrderModule } from './entity/order/order.module';
import { ProductModule } from './entity/product/product.module';
import { ReturnModule } from './entity/return/return.module';
import { ShipmentModule } from './entity/shipment/shipment.module';
import { StorageModule } from './entity/storage/storage.module';
import { SupplierModule } from './entity/supplier/supplier.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: path.join(__dirname, '../ecommerce') }),
    Neo4jModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        scheme: 'neo4j',
        host: process.env.NEO4j_HOST ?? configService.get('NEO4j_HOST') ?? 'localhost',
        port: parseInt(process.env.NEO4J_PORT) ?? configService.get<number>('NEO4J_PORT') ?? 7687,
        username: process.env.NEO4j_USERNAME ?? configService.get('NEO4j_USERNAME') ?? 'neo4j',
        password: process.env.NEO4j_PASSWORD ?? configService.get('NEO4j_PASSWORD') ?? '',
        database: process.env.NEO4J_DB_NAME ?? configService.get('NEO4J_DB_NAME') ?? 'neo4j',
      }),
      global: true
    }),
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
    CancelModule,
    OrderModule,
    ProductModule,
    ReturnModule,
    ShipmentModule,
    StorageModule,
    SupplierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
