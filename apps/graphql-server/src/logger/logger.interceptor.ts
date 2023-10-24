import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
// import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}
  intercept(context, next) {
    console.log('Before...', context);

    this.pubSub.publish('output', {
      tenantId: 2,
      content: 'teste',
    });

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
