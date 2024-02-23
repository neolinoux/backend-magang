import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
  Headers
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req) {
    const token = req.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(token);
    return this.usersService.user({ userId: payload['id'] });
  }

  @Get('pemlap')
  async getAllPemlap(): Promise<UserModel[]> {
    return this.usersService.users({
      where: {
        userRoles: {
          some: {
            roleId: 2
          }
        }
      }
    });
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
