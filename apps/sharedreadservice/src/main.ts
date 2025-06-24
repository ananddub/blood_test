import { NestFactory } from '@nestjs/core';
import { SharedreadserviceModule } from './sharedreadservice.module';

async function bootstrap() {
  const app = await NestFactory.create(SharedreadserviceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
