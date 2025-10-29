import { Injectable,ConflictException } from '@nestjs/common';
import { RegisterDto as CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service'; // Giả sử bạn có service này
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}



  // // 2. Dùng để tạo JWT
  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId }; // 'sub' là viết tắt của subject
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async register(createAuthDto: CreateAuthDto) {
    // Mã hóa mật khẩu trước khi lưu
    const email = createAuthDto.email;

    const existingUser = await this.userService.findOne(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const newUser = await this.userService.create({
      ...createAuthDto,
      password: hashedPassword,
    });
    const { password, ...result } = newUser.toObject(); // Bỏ password ra khỏi kết quả
    return result;
  }
}
