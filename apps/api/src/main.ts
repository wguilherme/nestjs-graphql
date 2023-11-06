import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { type MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  // refatorar
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  await app.startAllMicroservices();

  await app.listen(3002);
}
bootstrap();
