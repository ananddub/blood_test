import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProtoAuth } from '@common/index';
import { ReflectionService } from '@grpc/reflection';
import { ResponseTransformInterceptor } from './responseTransformInterceptor/response.transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AuthModule,
        {
            transport: Transport.GRPC,
            options: {
                package: [ProtoAuth.AUTH_PACKAGE_NAME],
                protoPath: [join(__dirname, '../auth.proto')],
                onLoadPackageDefinition: (pkg, server) => {
                    new ReflectionService(pkg).addToServer(server);
                },
            },
        },
    );
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    await app.listen();
}
bootstrap();
