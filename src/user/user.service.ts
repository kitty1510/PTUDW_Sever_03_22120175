import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './schemas/user.schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ){}

  /**
   * Phương thức CREATE (Tạo mới)
   */
  async create (createUserDto: CreateUserDto) {
    // Thêm người dùng mới vào "cơ sở dữ liệu"
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  /**
   * phương thức find one (Tìm một) 
   * @param id 
   * @returns 
   */
  async findOne(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
  
  

  
}