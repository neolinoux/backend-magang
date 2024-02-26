import {
  Put,
  Get,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('users')
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      private jwtService: JwtService
      ) { }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.usersService.users({});
  }
  
  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req) {
    const token = req.headers['authorization'].split(' ')[1].toString();
    const payload = this.jwtService.decode(token);
    return this.usersService.user({ userId: payload['id'] });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ userId: Number(id) });
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.updateUser({
      where: { userId: Number(id) },
      data: {
        email: userData.email,
        password: userData.password
      }
    });
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ userId: Number(id) });
  }
}
