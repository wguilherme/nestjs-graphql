import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { instance } from './logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'output',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
