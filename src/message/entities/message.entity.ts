import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  // id field
  @Field(() => Int, { description: 'Message id' })
  tenantId: number;

  // content field
  @Field(() => String, { description: 'Message content' })
  content: string;
}
