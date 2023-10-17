import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitmqService {
  constructor(private readonly client: ClientProxy) {}

  eventReceived(data: any) {
    return data;
  }

  async publishEvent(data: any) {
    await lastValueFrom(this.client.emit('event_pattern', data));
  }
}
