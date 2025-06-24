import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
    CreateUserDto,
    DeleteUserDto,
    Empty,
    GetUserDto,
    ResponseUserDto,
    ResponseUserList,
    UpdateUserDto,
    UserServiceControllerMethods,
} from '@common/auth/auth';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@UserServiceControllerMethods()
export class UserController {
    constructor(private readonly userService: UserService) {}
    create(
        request: CreateUserDto,
    ):
        | Promise<ResponseUserDto>
        | Observable<ResponseUserDto>
        | ResponseUserDto {
        return this.userService.create(request);
    }
    update(
        request: UpdateUserDto,
    ):
        | Promise<ResponseUserDto>
        | Observable<ResponseUserDto>
        | ResponseUserDto {
        return this.userService.update(request.id, request);
    }

    findOne(
        request: GetUserDto,
    ):
        | Promise<ResponseUserDto>
        | Observable<ResponseUserDto>
        | ResponseUserDto {
        return this.userService.findOne(request.id);
    }

    findAll(
        request: Empty,
    ):
        | Promise<ResponseUserList>
        | Observable<ResponseUserList>
        | ResponseUserList {
        return this.userService.findAll();
    }

    remove(
        request: DeleteUserDto,
    ):
        | Promise<ResponseUserDto>
        | Observable<ResponseUserDto>
        | ResponseUserDto {
        return this.userService.remove(request.id);
    }
}
