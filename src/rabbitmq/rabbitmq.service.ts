import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  eventReceived() {
    console.log('eventReceived');
  }
}
