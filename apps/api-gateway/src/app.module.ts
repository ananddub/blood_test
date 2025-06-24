import {
    MiddlewareConsumer,
    Module,
    NestModule,
    OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { HttpErrorValidatorMiddleware } from './http-error-validator/http-error-validator.middleware';
import { UserModule } from './user/user.module';

@Module({
    imports: [AuthModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
