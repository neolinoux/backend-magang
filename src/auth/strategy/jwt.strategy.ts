import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '../auth.module';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.usersService.findOne(payload.userId.toString());

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async isAdmin(payload: { userId: number }) {
    const user = await this.usersService.findOne(payload.userId.toString());

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}