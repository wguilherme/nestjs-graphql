import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { PubSub } from 'graphql-subscriptions';

const ProviderPubSub = {
  provide: 'PUB_SUB',
  useValue: new PubSub(),
};

@Module({
  controllers: [RabbitmqController],
  providers: [RabbitmqService, ProviderPubSub],
  exports: [ProviderPubSub],
})
export class RabbitmqModule {}
