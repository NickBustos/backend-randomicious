import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

import * as bcryptsjs from 'bcryptjs';
import { hasUncaughtExceptionCaptureCallback } from 'process';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    console.log(createUser);

    try {
      const { password, ...userData } = createUser;

      const newUser = new this.userModel({
        password: bcryptsjs.hashSync(password, 10),
        ...userData,
      });

      await newUser.save();

      const { password: _, ...user } = newUser.toJSON();

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUser.email} already exist`);
      }
      throw new InternalServerErrorException('Error terrible');
    }
  }

  async login(loginUser: LoginUserDto) {
    const { email, password } = loginUser;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Credenciales no validas - email');
    }
    return 'Credenciales correctas';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
