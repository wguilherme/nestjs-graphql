import { Resolver, Query } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message], { name: 'message' })
  findAll() {
    return this.messageService.findAll();
  }
}
