import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { RedisService } from '../redis.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly redisService: RedisService) {}

  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: RedisContext) {
    console.log('new redis publish event received', data, context);
    console.log(`Channel: ${context.getChannel()}`);
  }
}
