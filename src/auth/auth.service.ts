import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Request
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async login(
    email: string,
    password: string,
    token: string
  ) {
    const user = await this.prisma.user.findFirstOrThrow({
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
        AND: [
          {
            email: email
          },
          {
            tahunAjaran: {
              isActive: true
            }
          }
        ]
      },
    }).catch(() => {
      throw new NotFoundException('Invalid credentials');
    })

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
      roleId: user.userRoles[0].roleId,
    };

    const tokenCreated = this.jwtService.sign(payload);

    return {
      message: 'Login success',
      token: tokenCreated
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
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload['roleId']);

    // const targetToken = token.split(' ')[1];

    // if (!targetToken) {
    //   throw await new UnauthorizedException('User not logged in');
    // }

    // const invalidToken = await this.prisma.invalidToken.findUnique({
    //   where: {
    //     token: targetToken
    //   }
    // });

    // if (invalidToken) {
    //   throw await new UnauthorizedException('User not logged in');
    // }

    // const payload = this.jwtService.decode(targetToken);

    return payload;
  }
}
