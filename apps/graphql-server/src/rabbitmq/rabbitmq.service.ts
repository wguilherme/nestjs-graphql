import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  constructor(
    private readonly logger: Logger, // instantiate logger
  ) {}

  eventReceived(data: any) {
    this.logger.log('A new event was received!');
    return data;
  }

  getHello(): string {
    this.logger.log('Hello World!');
    return 'Hello World!';
  }
}
