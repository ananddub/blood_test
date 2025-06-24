import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from './http-error-validator/responseTranformed';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('API GATEWAY')
        .setDescription('The API GATEWAY API description')
        .setVersion('1.0')
        .addTag('api-gateway')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
