import { Controller, Post, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post('create')
  async signupUser(
    @Body() userData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  @Post('login')
  async loginUser(
    @Body() userData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.user({ email: userData.email });
  }

  @Put('update/:id')
  async updateUser(
    @Body() userData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.updateUser({
      where: { email: userData.email },
      data: { password: userData.password }
    });
  }
}
