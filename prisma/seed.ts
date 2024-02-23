import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Roles as RolesEnum } from '../src/enum/roles.enum';
import { Permissions as PermissionsEnum } from '../src/enum/permissions.enum';

const prisma = new PrismaClient();

async function main() {
  for (const key of Object.keys(RolesEnum)) {
    await prisma.roles.create({
      data: {
        roleName: RolesEnum[key],
      },
    });
  }

  for (const key of Object.keys(PermissionsEnum)) {
    await prisma.permissions.create({
      data: {
        permissionName: PermissionsEnum[key],
      },
    });
  }

  const saltOrRounds = 10;
  const adminPassword = 'admin';
  const hashedPassword = await bcrypt.hash(adminPassword, saltOrRounds);

  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: hashedPassword,
      userRoles: {
        create: {
          role: {
            connect: {
              roleId: 1,
            },
          },
        },
      },
    },
  });

  const userPassword = 'admin';
  const hashedUserPassword = await bcrypt.hash(userPassword, saltOrRounds);
  const amountOfUsers = 9;

  for (let i = 2; i <= amountOfUsers; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: hashedUserPassword,
        userRoles: {
          create: {
            role: {
              connect: {
                roleId: i,
              },
            },
          },
        }
      },
    });
  }

  // await prisma.pembimbingLapangan.create({
  //   data: {
  //     nip: faker.string.numeric(18),
  //     nama: faker.person.firstName(),
  //     userId: 4,
  //   },
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });