import { ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constant';
import { RMQClient } from '@common/util/connection';

// grpc
// redis ,rabimq rpc
//master db,slave db

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '15m' },
        }),
        ClientsModule.register([RMQClient]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [],
})
export class UserModule {}
