import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => Int, { description: 'Message id', nullable: true })
  tenantId?: number;

  @Field(() => String, { description: 'Message content', nullable: true })
  content?: string;
}
