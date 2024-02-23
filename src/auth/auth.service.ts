import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
      select: {
        userId: true,
        email: true,
        password: true,
        userRoles: {
          select: {
            roleId: true,
            role: {
              select: {
                roleName: true,
              },
            },
          }
        },
      },
      where: {
        email: email
      },
    });

    if (!user) {
      throw new NotFoundException(`email ${email} not registered`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: user.userId,
      email: email,
      role: user.userRoles[0].role.roleName
    };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async logout(token: string) {
    await this.prisma.invalidToken.create({
      data: {
        token: token
      }
    });

    return {
      message: 'Logout success'
    }
  }
}
