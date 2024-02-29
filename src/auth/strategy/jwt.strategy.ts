import {
  Injectable,
  UnauthorizedException
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
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: { userId: number }) {
    // get token from header
    const rawToken = req.headers['authorization'].split(' ')[1];
    // console.log(rawToken);
    
    // check if token is invalid
    const invalidToken = await this.prisma.invalidToken.findUnique({
      where: {
        token: rawToken
      }
    });
    
    // if token is invalid, return unauthorized
    if (invalidToken) {
      throw await new UnauthorizedException('token expired or invalid');
    }
    
    // check if user is valid
    const userId = payload['id'];
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId
      }
    });
    
    // if user is not valid, return unauthorized
    if (!user) {
      throw await new UnauthorizedException('user not found');
    }
    
    return user;
  }
}