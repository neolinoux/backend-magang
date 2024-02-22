import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: email, id: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
