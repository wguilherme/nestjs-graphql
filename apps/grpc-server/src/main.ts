import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EventsModule } from './events/events.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventsModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'com.events',
        protoPath: [join(__dirname, 'events', 'proto', 'events.proto')],
      },
    },
  );

  await app.listen();
}
bootstrap();
