import { NestFactory } from '@nestjs/core';
import { NotificatoinModule } from './notificatoin.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RMQClient } from '@common/util/connection';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        NotificatoinModule,
        RMQClient,
    );
    await app.listen();
    console.log('Notificatoin service is running');
}
bootstrap();
