import { Controller, Post, Body, Put, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiOAuth2 } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.updateUser({
      where: { userId: Number(id) },
      data: { password: userData.password }
    });
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ userId: Number(id) });
  }
}
