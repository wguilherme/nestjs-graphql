import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { LoggingInterceptor } from '../logger/logger.interceptor';

@UseInterceptors(LoggingInterceptor)
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
      tenantId: 2,
      content: response,
    });
    return response;
  }

  @Get('/hello')
  getHello(): string {
    return this.rabbitmqService.getHello();
  }
}
