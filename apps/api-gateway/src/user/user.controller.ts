import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProtoAuth } from '@common/index';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: ProtoAuth.CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll({});
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne({ id });
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: ProtoAuth.UpdateUserDto,
    ) {
        return this.userService.update({ id, ...updateUserDto });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove({ id });
    }
}
