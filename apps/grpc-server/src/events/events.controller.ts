import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @GrpcMethod('EventService')
  async createEvent(@Payload() createEventDto: CreateEventDto) {
    const createdEvent = await this.eventsService.create(createEventDto);

    const createdEventFormatted = {
      event: {
        event_id: String(createdEvent._id),
        tenantId: createdEvent.tenantId,
        exchangeName: createdEvent.exchangeName,
        eventName: createdEvent.eventName,
      },
    };

    return createdEventFormatted;
  }

  @GrpcMethod('EventService')
  findAllEvents() {
    return {
      event: this.eventsService.findAll(),
    };
  }

  @GrpcMethod('EventService')
  findOneEvent(@Payload() tenantId: string) {
    return this.eventsService.findOne(tenantId);
  }
}
