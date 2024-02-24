import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // if there is no token, return unauthorized
    if (!req.headers['authorization'].split(' ')[1]) {
      return await res.status(401).send('Unauthorized');
    }

    const token = req.headers['authorization'].split(' ')[1];
    // console.log(req.headers['authorization']);

    // if the token is in the invalidToken table, return unauthorized
    const invalidToken = await this.prisma.invalidToken.findUnique({
      where: {
        token: token
      }
    });

    if (invalidToken) {
      return await res.status(401).send('Unauthorized');
    }
    
    // if the token is valid, continue
    next();
  }
}