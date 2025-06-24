import {
    CreateUserDto,
    ResponseUserDto,
    ResponseUserList,
    UpdateUserDto,
    UserDto,
} from '@common/auth/auth';
import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
    OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Redis from 'ioredis';
import { REDIS_NAME } from '@common/micro.constant';
import { RMQ_EVENT, RMQ_SERVICE_NAME } from '@common/util/queyeNames';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(RMQ_SERVICE_NAME) private readonly rmqService: ClientRMQ,
    ) { }
    onModuleInit() {
        this.rmqService.connect();
    }
    async create(request: CreateUserDto): Promise<ResponseUserDto> {
        const userExist = await this.prisma.user.findUnique({
            where: { phone: request.phone },
        });
        if (userExist) {
            new ConflictException('User already exists');
        }
        const user = (await this.prisma.user.create({
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
        })) as unknown as UserDto;
        return { code: 201, message: 'User created', data: user };
    }

    async findAll(): Promise<ResponseUserList> {
        const users =
            (await this.prisma.user.findMany()) as unknown as UserDto[];
        console.log('sended bro dont worry');
        // this.rmqService.emit(RMQ_EVENT.OTP_SENT, { phone: users[0].phone });
        return { code: 200, message: 'Users found', data: users };
    }

    async findOne(id: string): Promise<ResponseUserDto> {
        const user = (await this.prisma.user.findUnique({
            where: { id },
        })) as unknown as UserDto;
        if (!user) {
            throw new NotFoundException('User not found');
        }
        console.log('user sended');
        return { code: 200, message: 'User found', data: user };
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<ResponseUserDto> {
        const user = (await this.prisma.user.findUnique({
            where: { id },
        })) as unknown as UserDto;
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.prisma.user.update({
            where: { id },
            data: {
                name: updateUserDto.name,
                phone: updateUserDto.phone,
                language: updateUserDto.language,
                address: updateUserDto.address,
                phoneCode: updateUserDto.phoneCode,
                referralCode: updateUserDto.referralCode,
                referredBy: updateUserDto.referredBy,
                coordinates: updateUserDto.coordinates,
            },
        });
        return { code: 200, message: 'User updated', data: user };
    }

    async remove(id: string): Promise<ResponseUserDto> {
        const user = (await this.prisma.user.findUnique({
            where: { id },
        })) as unknown as UserDto;
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.prisma.user.delete({
            where: { id },
        });
        return { code: 200, message: 'User deleted', data: user };
    }
}
