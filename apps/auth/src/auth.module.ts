import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule as UserAuth } from './auth/auth.module';

@Global()
@Module({
    imports: [UserModule, PrismaModule, UserAuth],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
