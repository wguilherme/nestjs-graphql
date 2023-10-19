import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  eventReceived(data: any) {
    return data;
  }
}
