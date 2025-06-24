import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserServiceClient } from '@common/auth/auth';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_CLIENT } from '../constant';
import { ProtoAuth } from '@common/index';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class UserService {
    private userService: UserServiceClient;
    constructor(@Inject(AUTH_CLIENT) private client: ClientGrpc) {}
    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>(
            ProtoAuth.USER_SERVICE_NAME,
        );
    }
    async create(request: ProtoAuth.CreateUserDto): Promise<any> {
        try {
            return lastValueFrom(this.userService.create(request));
        } catch (e) {
            console.log(e);
            throw new HttpException(e.message, e.status);
        }
    }

    update(
        request: ProtoAuth.UpdateUserDto,
    ):
        | Promise<ProtoAuth.ResponseUserDto>
        | Observable<ProtoAuth.ResponseUserDto>
        | ProtoAuth.ResponseUserDto {
        return this.userService.update(request);
    }
    findOne(
        request: ProtoAuth.GetUserDto,
    ):
        | Promise<ProtoAuth.ResponseUserDto>
        | Observable<ProtoAuth.ResponseUserDto>
        | ProtoAuth.ResponseUserDto {
        return this.userService.findOne(request);
    }
    async findAll(
        request: ProtoAuth.Empty,
    ): Promise<ProtoAuth.ResponseUserList> {
        try {
            const value = await lastValueFrom(
                this.userService.findAll(request),
            );

            return value;
        } catch (e) {
            console.log('error is called bro ');
            throw new HttpException(e.message, e.status);
        }
    }
    async remove(
        request: ProtoAuth.DeleteUserDto,
    ): Promise<ProtoAuth.ResponseUserDto> {
        try {
            const user = await lastValueFrom(this.userService.remove(request));
            return user;
        } catch (e) {
            console.log(e);
            throw new HttpException(e.message, e.status);
        }
    }
}
