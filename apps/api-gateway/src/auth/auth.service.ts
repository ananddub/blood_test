import { Inject, Injectable } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@common/auth/auth';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_CLIENT } from '../constant';
import { ProtoAuth } from '@common/index';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class AuthService implements ProtoAuth.AuthServiceController {
    private authService: AuthServiceClient;
    constructor(@Inject(AUTH_CLIENT) private client: ClientGrpc) {}
    onModuleInit() {
        this.authService =
            this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }
    login(
        request: ProtoAuth.LoginUserDto,
    ):
        | Promise<ProtoAuth.LoginResponse>
        | Observable<ProtoAuth.LoginResponse>
        | ProtoAuth.LoginResponse {
        return this.authService.login(request);
    }
    register(
        request: ProtoAuth.CreateUserDto,
    ):
        | Promise<ProtoAuth.BasicResponse>
        | Observable<ProtoAuth.BasicResponse>
        | ProtoAuth.BasicResponse {
        return this.authService.register(request);
    }
    logout(
        request: ProtoAuth.LogoutUserDto,
    ):
        | Promise<ProtoAuth.BasicResponse>
        | Observable<ProtoAuth.BasicResponse>
        | ProtoAuth.BasicResponse {
        return this.authService.logout(request);
    }
    verifyOtp(
        request: ProtoAuth.VerifyOtpDto,
    ):
        | Promise<ProtoAuth.BasicResponse>
        | Observable<ProtoAuth.BasicResponse>
        | ProtoAuth.BasicResponse {
        return this.authService.verifyOtp(request);
    }
    refreshToken(
        request: ProtoAuth.RefreshTokenDto,
    ):
        | Promise<ProtoAuth.TokenResponse>
        | Observable<ProtoAuth.TokenResponse>
        | ProtoAuth.TokenResponse {
        return this.authService.refreshToken(request);
    }
}
