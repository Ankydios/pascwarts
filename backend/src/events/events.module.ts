import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Event } from './entities/event.entity';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Student])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
