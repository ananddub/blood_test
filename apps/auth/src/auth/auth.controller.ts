import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    AuthServiceController,
    AuthServiceControllerMethods,
    BasicResponse,
    CreateUserDto,
    LoginResponse,
    LoginUserDto,
    LogoutUserDto,
    RefreshTokenDto,
    TokenResponse,
    VerifyOtpDto,
} from '@common/auth/auth';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
    constructor(private readonly authService: AuthService) {}
    login(
        request: LoginUserDto,
    ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse {
        return this.authService.login(request);
    }
    register(
        request: CreateUserDto,
    ): Promise<BasicResponse> | Observable<BasicResponse> | BasicResponse {
        return this.authService.register(request);
    }
    logout(
        request: LogoutUserDto,
    ): Promise<BasicResponse> | Observable<BasicResponse> | BasicResponse {
        return this.authService.logout(request);
    }
    verifyOtp(
        request: VerifyOtpDto,
    ): Promise<BasicResponse> | Observable<BasicResponse> | BasicResponse {
        return this.authService.verifyOtp(request);
    }
    refreshToken(
        request: RefreshTokenDto,
    ): Promise<TokenResponse> | Observable<TokenResponse> | TokenResponse {
        return this.authService.refreshToken(request);
    }
}
