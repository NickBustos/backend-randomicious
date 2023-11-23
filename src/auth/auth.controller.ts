import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto, LoginUserDto, CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
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
