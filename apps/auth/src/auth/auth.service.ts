import {
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import {
    AuthServiceController,
    BasicResponse,
    CreateUserDto,
    LoginResponse,
    LoginUserDto,
    LogoutUserDto,
    RefreshTokenDto,
    TokenResponse,
    UserDto,
    VerifyOtpDto,
} from '@common/auth/auth';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { jwtConstants } from '../constant';
import Redis from 'ioredis';
import { REDIS_NAME } from '@common/micro.constant';
import { keyGen, OTP } from '@common/util/key.gen';
import { RMQ_EVENT, RMQ_SERVICE_NAME } from '@common/util/queyeNames';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class AuthService implements AuthServiceController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        @Inject(RMQ_SERVICE_NAME) private readonly rmqService: ClientRMQ,
        @Inject(REDIS_NAME) private readonly redis: Redis,
    ) {}
    async register(request: CreateUserDto): Promise<BasicResponse> {
        const userExist = await this.prisma.user.findUnique({
            where: { phone: request.phone },
        });
        if (userExist) {
            throw new ConflictException('User already exists');
        }
        await this.prisma.user.create({
            data: {
                name: request.name,
                phone: request.phone,
                language: request.language,
                address: request.address,
                phoneCode: request.phoneCode,
                referralCode: request.referralCode,
                referredBy: request.referredBy,
                coordinates: request.coordinates,
            },
        });
        this.rmqService.emit(RMQ_EVENT.OTP_SENT, {
            phone: request.phone,
        });
        return {
            code: 201,
            message: 'User registered',
        };
    }

    async login(request: LoginUserDto): Promise<LoginResponse> {
        const user = await this.prisma.user.findUnique({
            where: { phone: request.phone },
        });
        if (!user) {
            throw new UnauthorizedException('user does to exist');
        }
        const jwtid = uuidv4();
        const accessToken = await this.jwtService.signAsync(user);
        const refreshToken = await jwt.sign(user, jwtConstants.secret, {
            expiresIn: '7d',
            issuer: 'auth',
            jwtid,
        });
        await this.prisma.jWT.upsert({
            where: { userId: user.id },
            update: { jwt: jwtid },
            create: { userId: user.id, jwt: jwtid },
        });
        const expire7d = 1000 * 60 * 60 * 24 * 7;
        this.rmqService.emit(RMQ_EVENT.OTP_SENT, {
            phone: user.phone,
            message: 'User logged in',
        });
        return {
            code: 200,
            message: 'User logged in',
            data: {
                user: user as unknown as UserDto,
                tokens: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    expiresIn: expire7d,
                },
            },
        };
    }

    async logout(request: LogoutUserDto): Promise<BasicResponse> {
        await this.prisma.jWT.delete({
            where: { userId: request.id },
        });
        return {
            code: 200,
            message: 'User logged out',
        };
    }
    async verifyOtp(request: VerifyOtpDto): Promise<BasicResponse> {
        const key = keyGen(OTP.OTP, request.phone);
        const otp = await this.redis.get(key);
        const obj: {
            phone: string;
            otp: string;
            isVerified: boolean;
        } = JSON.parse(otp);
        if (!otp) {
            throw new UnauthorizedException('Invalid OTP or OTP expired');
        }
        if (obj.otp !== request.otp) {
            throw new UnauthorizedException('Invalid OTP or OTP expired');
        }
        obj.isVerified = true;
        await this.prisma.user.update({
            where: { phone: request.phone },
            data: { isVerified: true },
        });
        await this.redis.del(key);
        return {
            code: 200,
            message: 'OTP verified',
        };
    }

    async refreshToken(request: RefreshTokenDto): Promise<TokenResponse> {
        const decode = jwt.verify(
            request.refreshToken,
            jwtConstants.secret,
        ) as jwt.JwtPayload;
        if (!decode) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: decode.id as string },
        });
        if (!user) {
            throw new UnauthorizedException('user does to exist');
        }
        const accessToken = await this.jwtService.signAsync(user);

        const expire7d = 1000 * 60 * 60 * 24 * 7;
        return {
            code: 200,
            message: 'Token access refreshed',
            data: {
                accessToken: accessToken,
                refreshToken: null,
                expiresIn: expire7d,
            },
        };
    }
}
