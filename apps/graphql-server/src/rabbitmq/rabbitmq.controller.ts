import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';
import { PubSub } from 'graphql-subscriptions';

@Controller()
export class RabbitmqController {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Post('send')
  async send(@Body() data: any) {
    this.rabbitmqService.eventReceived(data);
    this.pubSub.publish('MESSAGE', { message: data });
  }

  @MessagePattern()
  findAll(data) {
    const response = this.rabbitmqService.eventReceived(data);
    this.pubSub.publish('output', {
      tenantId: 2,
      content: response,
    });
    return response;
  }
}
