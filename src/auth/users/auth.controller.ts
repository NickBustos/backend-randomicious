import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
  ForbiddenException,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guards';
import { registerUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from './entities/user.entity';
import { CurrentUserId } from '../decorators/current-user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }

  @Post('/register')
  register(@Body() registerUser: registerUserDto) {
    return this.authService.register(registerUser);
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request): LoginResponse {
    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id }),
    };
  }

  // Cada usuario solo puede ver su propio perfil
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUserId() currentUserId: string) {
    if (id !== currentUserId) {
      throw new ForbiddenException();
    }
    return this.authService.findUserById(id);
  }

  // Cada usuario solo puede editar su propio perfil
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUserId() currentUserId: string,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: /(png|jpeg|jpg)$/ }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    image?: Express.Multer.File,
  ) {
    if (id !== currentUserId) {
      throw new ForbiddenException();
    }
    return this.authService.update(id, updateUserDto, image);
  }
}
