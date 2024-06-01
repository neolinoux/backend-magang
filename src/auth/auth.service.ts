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

  async login(
    email: string,
    password: string,
    token: string
  ) {
    const user = await this.prisma.user.findFirst({
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
        email: email,
        tahunAjaran: {
          isActive: true
        }
      },
    });

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
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
      id: user.userId,
      role: user.userRoles[0].role.roleName,
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
