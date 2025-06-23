import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Series } from '../series/series.entity';
import { User } from '../users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Series],
    synchronize: false,
    dropSchema: false,
    autoLoadEntities: true,
};
