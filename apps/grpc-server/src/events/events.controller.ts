import { ServerDuplexStream } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { from, concatMap, of, delay } from 'rxjs';
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

  @GrpcMethod('EventService', 'StreamEvents')
  async streamEvents(stream: ServerDuplexStream<any, any>) {
    console.log('stream', stream);

    const eventsArray = [
      {
        tenantId: 'tenant1',
        exchangeName: 'test1',
        eventName: 'test1',
      },
      {
        tenantId: 'tenant2',
        exchangeName: 'test2',
        eventName: 'test2',
      },
      {
        tenantId: 'tenant3',
        exchangeName: 'test3',
        eventName: 'test3',
      },
    ];

    return from(eventsArray).pipe(
      concatMap((event) => of({ event }).pipe(delay(2000))),
    );
  }
}
