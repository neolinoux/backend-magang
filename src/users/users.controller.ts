import {
  Put,
  Get,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }

  @Get()
  async getUsersBy(
    @Query() params: {
      userId: number,
      email: string
    }
  ) {
    return this.usersService.users(params);
  }
  
  @Get('me')
  async getCurrentUser(@Request() req) {
    const token = req.headers['authorization'].split(' ')[1].toString();
    const payload = this.jwtService.decode(token);
    return this.usersService.user(payload['id']);
  }

  @Put('update/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() userData: {
      email: string;
      password: string
    },
  ) {
    return this.usersService.updateUser(+userId, userData);
  }

  @Delete('delete/:userId')
  async deleteUser(
    @Param('userId') userId: number
  ) {
    return this.usersService.deleteUser(+userId);
  }
}
