import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
  ) {}
  create(createEventDto: CreateEventDto) {
    return this.eventModel.create(createEventDto);
  }
  findAll() {
    return [
      {
        event_id: 1,
        tenantId: 1,
        eventName: 'test',
        exchangeName: 'test',
      },
    ];
  }
  findOne(tenantId: string) {
    return this.eventModel.findOne({ tenantId });
  }
}
