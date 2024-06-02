import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

export const jwtSecret = 'rumahkacaantipeluru'

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    JwtStrategy,
    CaslAbilityFactory
  ],
})
export class AuthModule {}
