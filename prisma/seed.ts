import { faker } from '@faker-js/faker';
import { PrismaClient, User, Roles } from '@prisma/client';
import { Roles as RolesEnum } from '../src/enum/roles.enum';
import { Permissions as PermissionsEnum } from '../src/enum/permissions.enum';

const prisma = new PrismaClient();

async function main() {
  // for (const key of Object.keys(RolesEnum)) {
  //   await prisma.roles.create({
  //     data: {
  //       roleName: RolesEnum[key],
  //     },
  //   });
  // }

  // for (const key of Object.keys(PermissionsEnum)) {
  //   await prisma.permissions.create({
  //     data: {
  //       permissionName: PermissionsEnum[key],
  //     },
  //   });
  // }

  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: 'admin',
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

  const amountOfUsers = 9;

  for (let i = 2; i <= amountOfUsers; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: 'password',
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