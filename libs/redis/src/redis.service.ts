import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_SERVICE') private readonly client: ClientProxy) {}

  async emitEvent({ pattern, data }: { pattern: string; data: string }) {
    return this.client.emit<string>('notifications', data);
  }

  ping() {
    return this.client.connect();
  }
}
