import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

@Controller()
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @MessagePattern()
  findAll() {
    return this.rabbitmqService.eventReceived();
  }
}
