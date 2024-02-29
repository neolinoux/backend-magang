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

  async login(email: string, password: string, token: string) {
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

    //if there is a token, add it to the invalidToken table
    //this will keep every user using only one token at a time
    if (token) {
      this.prisma.invalidToken.create({
        data: {
          token: token
        }
      });
    }

    const payload = {
      id: user.userId
    };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async logout(token: string) {
    const targetToken = token.split(' ')[1];

    if (!targetToken) {
      throw await new UnauthorizedException('User not logged in');
    }

    await this.prisma.invalidToken.create({
      data: {
        token: targetToken
      }
    });

    return {
      message: 'Logout success',
      token: targetToken
    }
  }

  async me(token: string) {
    const targetToken = token.split(' ')[1];

    if (!targetToken) {
      throw await new UnauthorizedException('User not logged in');
    }

    const invalidToken = await this.prisma.invalidToken.findUnique({
      where: {
        token: targetToken
      }
    });

    if (invalidToken) {
      throw await new UnauthorizedException('User not logged in');
    }

    const payload = this.jwtService.decode(targetToken);

    return {
      id: payload['id'],
      email: payload['email'],
      role: payload['role']
    }
  }
}
