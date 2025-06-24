import { AuthServiceController } from './../../../../libs/common/src/auth/auth';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProtoAuth } from '@common/index';
import { CreateUserDto } from './dto/create-auth.dto';
import { Validate } from 'class-validator';
import { Observable } from 'rxjs';
@Controller('auth')
export class AuthController implements AuthServiceController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    login(
        request: ProtoAuth.LoginUserDto,
    ):
        | Promise<ProtoAuth.LoginResponse>
        | Observable<ProtoAuth.LoginResponse>
        | ProtoAuth.LoginResponse {
        return this.authService.login(request);
    }

    @Post('register')
    register(
        request: ProtoAuth.CreateUserDto,
    ):
        | Promise<ProtoAuth.BasicResponse>
        | Observable<ProtoAuth.BasicResponse>
        | ProtoAuth.BasicResponse {
        return this.authService.register(request);
    }

    @Post('logout')
    logout(
        request: ProtoAuth.LogoutUserDto,
    ):
        | Promise<ProtoAuth.BasicResponse>
        | Observable<ProtoAuth.BasicResponse>
        | ProtoAuth.BasicResponse {
        return this.authService.logout(request);
    }

    @Post('verify-otp')
    verifyOtp(
        request: ProtoAuth.VerifyOtpDto,
    ):
        | Promise<ProtoAuth.BasicResponse>
        | Observable<ProtoAuth.BasicResponse>
        | ProtoAuth.BasicResponse {
        return this.authService.verifyOtp(request);
    }

    @Post('refresh-token')
    refreshToken(
        request: ProtoAuth.RefreshTokenDto,
    ):
        | Promise<ProtoAuth.TokenResponse>
        | Observable<ProtoAuth.TokenResponse>
        | ProtoAuth.TokenResponse {
        return this.authService.refreshToken(request);
    }
}
