import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LoginUserDto, registerUserDto } from './dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

import * as bcryptsjs from 'bcryptjs';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUser;

      const newUser = new this.userModel({
        password: bcryptsjs.hashSync(password, 10),
        ...userData,
      });

      await newUser.save();

      const { password: _, ...user } = newUser.toJSON();
      console.log(
        'WORKING WORKING WORKING WORKING WORKING WORKING WORKING WORKING WORKING WORKING WORKING WORKING',
      );
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `El email ${createUser.email} ya esta registrado`,
        );
        //throw new BadRequestException(error);
      }
      throw new InternalServerErrorException('Error terrible');
    }
  }

  async register(user: registerUserDto): Promise<LoginResponse> {
    const usuario = await this.create(user);

    return {
      user: usuario,
      token: this.getJWT({ id: usuario._id }),
    };
  }

  async login(loginUser: LoginUserDto): Promise<LoginResponse> {
    const { email, password } = loginUser;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Credenciales no validas - email');
    }
    if (!bcryptsjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales no validas - password');
    }

    const { password: _, ...rest } = user.toJSON();

    return { user: rest, token: this.getJWT({ id: user._id }) };
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJWT(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
