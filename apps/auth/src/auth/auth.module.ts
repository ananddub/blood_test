import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constant';
import { REDISClient, RMQClient } from '@common/util/connection';
import { ClientsModule } from '@nestjs/microservices';

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
    controllers: [AuthController],
    providers: [AuthService, REDISClient],
})
export class AuthModule {}
