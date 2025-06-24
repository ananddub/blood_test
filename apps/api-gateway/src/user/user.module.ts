import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProtoAuth } from '@common/index';
import { AUTH_CLIENT } from '../constant';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        ClientsModule.register([
            {
                name: AUTH_CLIENT,
                transport: Transport.GRPC,
                options: {
                    package: ProtoAuth.AUTH_PACKAGE_NAME,
                    protoPath: join(__dirname, '../auth.proto'),
                },
            },
        ]),
    ],
})
export class UserModule {}
