import { Resolver, Query, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(() => [Message], { name: 'message' })
  findAll() {
    return this.messageService.findAll();
  }

  @Subscription(() => Message, {
    name: 'outputResolve',
    description:
      'Subscription that sends a message whenever an event is received from RabbitMQ.',
  })
  outputResolve() {
    console.log('chegou aqui');
    return this.pubSub.asyncIterator('output');
  }
}
