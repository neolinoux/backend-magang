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
import { User as UserModel, PembimbingLapangan } from '@prisma/client';
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ userId: Number(id) });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req) {
    const token = req.headers['authorization'].split(' ')[1].toString();
    const payload = this.jwtService.decode(token);
    console.log(payload['id']);
    return this.usersService.user({ userId: payload['id'] });
  }

  @Get('pemlap')
  @UseGuards(JwtAuthGuard)
  async getAllPemlap(): Promise<UserModel[]> {
    return this.usersService.users({});
  }
  
  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ userId: Number(id) });
  }
}
