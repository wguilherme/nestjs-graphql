import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  app.enableCors({
    origin: 'http://localhost:3001', // Ou de onde quer que sua aplicação cliente esteja vindo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
