import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{
  constructor(private prisma: PrismaService) { }
  
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
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
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) throw new HttpException('User already exists', 409);

    const saltOrRounds = 10;

    const password = data.password;
    // console.log(password);

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    // console.log(hashedPassword);

    data.password = hashedPassword;

    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {

    try {
      const { data, where } = params;
  
      // find user
      const user = await this.prisma.user.findUnique({
        where,
      });
      
      // if user not found, throw exception
      if (!user) throw new NotFoundException('User not found');
      
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: data.email.toString(),
        }
      });

      if (userExists) {
        throw new HttpException('User already exists', 409);
      }

      // hash password
      if (data.password) {
        const saltOrRounds = 10;
        const password = data.password;
        const hashedPassword = await bcrypt.hash(password.toString(), saltOrRounds);
        data.password = hashedPassword.toString();
      }
  
      // update user
      return this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      return error;
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });

    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.delete({
      where,
    });
  }
}
