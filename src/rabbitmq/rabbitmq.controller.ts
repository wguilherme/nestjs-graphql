import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Controller()
export class RabbitmqController {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @MessagePattern()
  findAll(data) {
    const response = this.rabbitmqService.eventReceived(data);
    this.pubSub.publish('output', {
      exampleField: 2,
      tenantId: 2,
      content: response,
    });
    return response;
  }
}
