import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { StudentsModule } from './students/students.module';
import { HousesModule } from './houses/houses.module';
import { SchoolClassesModule } from './school-classes/school-classes.module';
// import { EventsModule } from './events/events.module';
// import { AuthModule } from './auth/auth.module';

import { Student } from './students/entities/student.entity';
import { House } from './houses/entities/house.entity';
import { SchoolClass } from './school-classes/entities/school-class.entity';
import { Event } from './events/entities/event.entity';
import { User } from './entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Student, House, Event, SchoolClass, User],
        synchronize: true, // À désactiver en production
        logging: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
      global: true,
    }),
    StudentsModule,
    HousesModule,
    SchoolClassesModule,
    EventsModule,
    EventsModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
