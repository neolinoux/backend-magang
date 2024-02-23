import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'].split(' ')[1];
    // console.log(token);
    const invalidToken = await this.prisma.invalidToken.findUnique({
      where: {
        token: token
      }
    });

    if (invalidToken) {
      res.status(401).send('Unauthorized');
      return;
    }
    
    next();
  }
}