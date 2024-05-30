import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { da } from '@faker-js/faker';

@Injectable()
export class UsersService{
  constructor(private prisma: PrismaService) { }

  async user(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    return {
      status: 'Success',
      message: 'User berhasil ditemukan',
      data: user
    };
  }

  async users(params) {
    const users = await this.prisma.user.findMany({
      where: {
        userId: parseInt(params.userId) || undefined,
        email: {
          contains: params.email,
        },
      },
    });

    return {
      status: 'Success',
      message: 'User berhasil ditemukan',
      data: users
    }
  }

  async updateUser(
    userId: number,
    userData: {
      email: string,
      password: string
    }
  ) {
    const tes = await this.prisma.user.findUniqueOrThrow({
      where: {
        userId: userId,
      },
    });

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        email: userData.email,
        password: hashedPassword,
      },
    });

    return {
      status: 'Success',
      message: 'User berhasil diupdate',
      data : user
    };
  }

  async deleteUser(userId: number) {
    await this.prisma.user.findFirstOrThrow({
      where: {
        userId: userId,
      },
    });

    await this.prisma.user.delete({
      where: {
        userId: userId,
      },
    });

    return {
      status: 'Success',
      message: 'User berhasil dihapus',
    };
  }
}
