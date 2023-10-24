import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  constructor(
    private readonly logger: Logger, // instantiate logger
  ) {}

  eventReceived(data: any) {
    return data;
  }

  getHello(): string {
    this.logger.log('Hello World!');
    return 'Hello World!';
  }
}
