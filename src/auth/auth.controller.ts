import { Controller, Post, Body, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards'
import { registerUserDto, LoginUserDto, CreateUserDto } from './dto';
import { LoginResponse } from './interfaces/login-response.interface';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.authService.create(createUser);
  }

  @Post('/login')
  login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }

  @Post('/register')
  register(@Body() registerUser: registerUserDto) {
    return this.authService.register(registerUser);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards ( AuthGuard )
  @Get('check-token')
  checkToken(@Request() req: Request): LoginResponse {

    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findUserById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
