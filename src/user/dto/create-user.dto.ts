import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password không được để trống' })
    @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
    password: string;
}
