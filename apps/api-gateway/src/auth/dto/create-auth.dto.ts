import { ProtoAuth } from '@common/index';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements ProtoAuth.CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    role?: ProtoAuth.Role | undefined;

    @ApiProperty()
    @IsString()
    language?: string | undefined;

    @ApiProperty()
    @IsString()
    address?: string | undefined;

    @ApiProperty()
    @IsString()
    phoneCode?: string | undefined;

    @ApiProperty()
    @IsString()
    referralCode?: string | undefined;

    @ApiProperty()
    @IsString()
    referredBy?: string | undefined;

    @ApiProperty()
    @IsString()
    coordinates?: string | undefined;
}
