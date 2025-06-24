import { REDIS_NAME } from '@common/micro.constant';
import { keyGen, OTP, OtpGen } from '@common/util/key.gen';
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class SmsService {
    constructor(@Inject(REDIS_NAME) private readonly redis: Redis) {}
    async sendOtp(phone: string) {
        const otp = OtpGen(6);
        const key = keyGen(OTP.OTP, phone);
        const obj: {
            phone: string;
            otp: string;
            isVerified: boolean;
            createdAt: number;
        } = {
            phone,
            otp,
            isVerified: false,
            createdAt: Date.now(),
        };
        const min5 = 1000 * 60 * 5;
        await this.redis.setex(key, min5, JSON.stringify(obj));
        return otp;
    }
}
