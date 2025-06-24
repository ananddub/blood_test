import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@common/auth/auth';
import { AUTH_CLIENT } from '../constant';
import { ProtoAuth } from '@common/index';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        ClientsModule.register([
            {
                name: ProtoAuth.AUTH_PACKAGE_NAME,
                transport: Transport.GRPC,
                options: {
                    package: AUTH_PACKAGE_NAME,
                    protoPath: join(__dirname, '../auth.proto'),
                },
            },
        ]),
    ],
})
export class AuthModule {}
