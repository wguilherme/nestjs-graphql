import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}
  intercept(context, next) {
    console.log('Before...');

    return next.handle().pipe(
      map((value) => {
        console.log(`After... ${Date.now()} - ${value}`);
        this.pubSub.publish('output', {
          tenantId: 2,
          content: value,
        });
        return value;
      }),
    );
  }
}
