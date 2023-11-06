import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { SubscriptionController } from './subscription/subscription.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [RedisService],
  exports: [RedisService],
  controllers: [SubscriptionController],
})
export class RedisModule {}
