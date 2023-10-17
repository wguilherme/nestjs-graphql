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
        tenantId: createdEvent.tenantId,
        exchangeName: createdEvent.exchangeName,
        eventName: createdEvent.eventName,
      },
    };

    return createdEventFormatted;
  }

  @GrpcMethod('EventService')
  async findAllEvents() {
    const event = await this.eventsService.findAll();
    return { event };
  }

  @GrpcMethod('EventService')
  async findOneEvent(@Payload() payload: any) {
    const event = await this.eventsService.findOne(payload.tenantId);
    return {
      event,
    };
  }
}
