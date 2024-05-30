import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto'
import { AuthEntity } from './entity/auth.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }
  
  // @Post('signup')
  // async signupUser(
  //   @Body() {
  //     email,
  //     password
  //   }: CreateUserDto,
  // ): Promise<UserModel> {
  //   return this.usersService.createUser({ email, password });
  // }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async loginUser(
    @Body() {
      email,
      password
    }: LoginDto,
    @Request() req: any
  ) {
    //check if there is no token in the header
    if (!req.headers['authorization']) {
      return this.authService.login(email, password, null);
    }

    //if there is a token in the header, pass it to the login method
    return this.authService.login(email, password, req.headers['authorization'].split(' ')[1].toString());
  }

  @Post('logout')
  async logoutUser(@Request() req) {
    return this.authService.logout(req.headers['authorization']);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getCurrentUser(@Request() req) {
    return this.authService.me(req.headers['authorization']);
  }
}
