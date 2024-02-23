import {
  Headers,
  Injectable,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '../auth.module';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { email: string }, @Request() req: any){
    const user = await this.usersService.findOne(payload.email);

    // const token = req.headers['authorization'].split(' ')[1];

    // const invalidToken = await this.prisma.invalidToken.findUnique({
    //   where: {
    //     token: token
    //   }
    // });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}