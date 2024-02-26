import { fa, faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
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

  // const saltOrRounds = 10;
  // const adminPassword = 'admin';
  // const hashedPassword = await bcrypt.hash(adminPassword, saltOrRounds);

  // await prisma.user.create({
  //   data: {
  //     email: 'admin@admin.com',
  //     password: hashedPassword,
  //     userRoles: {
  //       create: {
  //         role: {
  //           connect: {
  //             roleId: 1,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // const userPassword = 'user';
  // const hashedUserPassword = await bcrypt.hash(userPassword, saltOrRounds);
  // const amountOfUsers = 9;

  // for (let i = 2; i <= amountOfUsers; i++) {
  //   await prisma.user.create({
  //     data: {
  //       email: faker.internet.email(),
  //       password: hashedUserPassword,
  //       userRoles: {
  //         create: {
  //           role: {
  //             connect: {
  //               roleId: i,
  //             },
  //           },
  //         },
  //       }
  //     },
  //   });
  // }

  // const kelas = [
  //   '4SI1',
  //   '4SI2',
  //   '4SI3',
  //   '4SD1',
  //   '4SD2',
  //   '4SK1',
  //   '4SK2',
  //   '4SK3',
  //   '4SK4',
  //   '4SK5',
  //   '4SE1',
  //   '4SE2',
  //   '4SE3',
  //   '4SE4',
  //   '4SE5',
  // ]

  const prodi = [
    'DIV Komputasi Statistik',
    'DIV Statistik',
    'DIII Statistik',
  ]

  // for (let i = 0; i < prodi.length; i++) {
  //   for (let j = 0; j < kelas.length; j++) {
  //     const mahasiswa = await prisma.user.create({
  //       data: {
  //         email: faker.internet.email({ 
  //           firstName: `mahasiswa`,
  //           lastName: `${i}${j}`,
  //           provider:'gmail.com'
  //         }),
  //         password: 'mahasiswa',
  //       },
  //     });

  //     const id = Number(mahasiswa.userId);

  //     await prisma.mahasiswa.create({
  //       data: {
  //         nama: faker.person.firstName(),
  //         nim : faker.string.numeric(9),
  //         kelas: kelas[j],
  //         alamat: faker.location.streetAddress(),
  //         prodi: prodi[i],
  //         user: {
  //           connect: {
  //             userId: id,
  //           },
  //         },
  //       },
  //     });
  //   }
  // }
  
  const hashedDosPemPassword = await bcrypt.hash('dosen', 10);

  for (let i = 0; i < prodi.length; i++){
    const dosen = await prisma.dosenPembimbingMagang.create({
      data: {
        nip: faker.string.numeric(9),
        user: {
          create: {
            email: faker.internet.email(),
            password: hashedDosPemPassword,
          },
        },
        nama: faker.person.firstName(),
        prodi: prodi[i],
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });