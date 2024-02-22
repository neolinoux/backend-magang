import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }
  
  @Post('signup')
  async signupUser(
    @Body() userData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async loginUser(
    @Body() {email, password}: LoginDto,
  ) {
    return this.authService.login(email, password);
  }
}
