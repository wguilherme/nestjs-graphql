import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { RedisModule } from '@app/redis';

@Module({
  imports: [RedisModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
