import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @GrpcMethod('EventService')
  createEvent(@Payload() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @GrpcMethod('EventService')
  findAllEvents() {
    return this.eventsService.findAll();
  }

  @GrpcMethod('EventService')
  findOneEvent(@Payload() tenantId: string) {
    return this.eventsService.findOne(tenantId);
  }
}
