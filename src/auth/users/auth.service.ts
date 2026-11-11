import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  registerUserDto,
} from './dto';
import { User } from './entities/user.entity';
import { isValidObjectId, Model } from 'mongoose';

import * as bcryptsjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { LoginResponse } from '../interfaces/login-response.interface';

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
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `El email ${createUser.email} ya esta registrado`,
        );
      }
      throw new InternalServerErrorException('No se pudo crear el usuario');
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    image?: Express.Multer.File,
  ) {
    if (!isValidObjectId(id) || !(await this.userModel.exists({ _id: id }))) {
      throw new NotFoundException('User not found');
    }

    const updateFields: any = {
      name: updateUserDto.name,
      description: updateUserDto.description,
    };

    if (updateUserDto.recipesCreated) {
      updateFields.recipesCreated = updateUserDto.recipesCreated;
    }
    if (updateUserDto.savedRecipes) {
      updateFields.savedRecipes = updateUserDto.savedRecipes;
    }

    if (image) {
      updateFields.image = {
        data: image.buffer,
        contentType: image.mimetype,
      };
    }

    const updated = await this.userModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    // Nunca devolver el hash de la contraseña
    const { password, ...rest } = updated.toJSON();
    return rest;
  }

  async register(user: registerUserDto): Promise<LoginResponse> {
    const usuario = await this.create(user);

    return {
      user: usuario,
      token: this.getJwtToken({ id: usuario._id }),
    };
  }

  async login(loginUser: LoginUserDto): Promise<LoginResponse> {
    const { email, password } = loginUser;
    const user = await this.userModel.findOne({ email });

    // Mismo mensaje en los dos casos para no revelar qué emails están registrados
    if (!user || !bcryptsjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    const { password: _, ...rest } = user.toJSON();

    return { user: rest, token: this.getJwtToken({ id: user._id }) };
  }

  async findUserById(id: string) {
    if (!isValidObjectId(id)) return null;

    const user = await this.userModel.findById(id);
    if (!user) return null;

    const { password, ...rest } = user.toJSON();
    return rest;
  }

  getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
