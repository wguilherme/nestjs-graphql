import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @MessagePattern('notifications')
  @EventPattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: RedisContext) {
    console.log('new redis publish event received', data, context);
    console.log(`Channel: ${context.getChannel()}`);
  }

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }
}
