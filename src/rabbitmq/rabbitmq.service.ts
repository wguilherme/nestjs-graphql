import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  eventReceived(data: any) {
    console.log('eventReceived', data);
    return;
  }
}
