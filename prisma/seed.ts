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
  const adminPassword = 'makanenak';
  const hashedPassword = await bcrypt.hash(adminPassword, saltOrRounds);

  // const testUser = await prisma.user.create({
  //   data: {
  //     email: 'test@gmail.com',
  //     password: hashedPassword,
  //   },
  // });

  // const userRolesTest = await prisma.userRoles.create({
  //   data: {
  //     roleId: 1,
  //     userId: testUser.userId,
  //   },
  // });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: hashedPassword,
      userRoles: {
        create: {
          roleId: 1,
        },
      },
    },
  });

  const kelas = [
    '4SI1',
    '4SI2',
    '4SI3',
    '4SD1',
    '4SD2',
    '4SK1',
    '4SK2',
    '4SK3',
    '4SK4',
    '4SK5',
    '4SE1',
    '4SE2',
    '4SE3',
    '4SE4',
    '4SE5',
  ]

  const prodi = [
    'DIV Komputasi Statistik',
    'DIV Statistik',
    'DIII Statistik',
  ]

  const tahunAjaran = [
    // '2019/2020',
    // '2020/2021',
    // '2021/2022',
    '2022/2023',
    '2023/2024',
  ]

  await prisma.tahunAjaran.createMany({
    data: tahunAjaran.map((tahun) => ({
      tahun: tahun,
    })),
  });

  const hashedDosPemPassword = await bcrypt.hash('makanenak', 10);
  const hashedMahaPassword = await bcrypt.hash('makanenak', 10);

  for (let k = 0; k < tahunAjaran.length; k++) {
    for (let i = 0; i < prodi.length; i++) {
      const userDosen = await prisma.user.create({
        data: {
          email: faker.internet.email({
            allowSpecialCharacters: false,
            firstName: 'dosen',
            lastName: `${k + 1}${i + 1}`,
          }),
          password: hashedDosPemPassword,
          userRoles: {
            create: {
              roleId: 3,
            },
          },
          dosenPembimbingMagang: {
            create: {
              nip: faker.string.numeric(9),
              nama: 'dosen' + `${i + 1}`,
              prodi: prodi[i],
              tahunAjaran: {
                connect: {
                  tahun: tahunAjaran[k],
                },
              },
            },
          },
        },
        select: {
          dosenPembimbingMagang: true,
        },
      });

      for (let j = 0; j < kelas.length; j++) {
        const userMahasiswa = await prisma.user.create({
          data: {
            email: faker.internet.email(),
            password: hashedMahaPassword,
            userRoles: {
              create: {
                roleId: 9,
              },
            },
            mahasiswa: {
              create: {
                nim: faker.string.numeric(9),
                nama: 'mahasiswa' + `${i + 1}${j + 1}`,
                kelas: kelas[j],
                prodi: prodi[i],
                alamat: faker.location.streetAddress(),
                tahunAjaran: {
                  connect: {
                    tahun: tahunAjaran[k],
                  },
                },
                dosenPembimbingMagang: {
                  connect: {
                    nip: userDosen.dosenPembimbingMagang.nip,
                  },
                },
              },
            },
          },
        });
      }
    }
  }

  const provinsi = [
    'Aceh',
    'Sumatera Utara',
    'Sumatera Barat',
    'Riau',
    'Kepulauan Riau',
    'Jambi',
    'Bengkulu',
    'Sumatera Selatan',
    'Bangka Belitung',
    'Lampung',
    'Banten',
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'DI Yogyakarta',
    'Jawa Timur',
    'Bali',
    'Nusa Tenggara Barat',
    'Nusa Tenggara Timur',
    'Kalimantan Barat',
    'Kalimantan Tengah',
    'Kalimantan Selatan',
    'Kalimantan Timur',
    'Kalimantan Utara',
    'Gorontalo',
    'Sulawesi Barat',
    'Sulawesi Selatan',
    'Sulawesi Tenggara',
    'Sulawesi Tengah',
    'Sulawesi Utara',
    'Maluku',
    'Maluku Utara',
    'Papua Barat',
    'Papua',
  ]

  const kodeProvinsi = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '21',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '51',
    '52',
    '53',
    '61',
    '62',
    '63',
    '64',
    '65',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '81',
    '82',
    '91',
    '94',
  ]

  for (let i = 0; i < provinsi.length; i++) {

    const prov = await prisma.provinsi.create({
      data: {
        nama: provinsi[i],
        kodeProvinsi: kodeProvinsi[i]
      },
    });

    const adminProv = await prisma.user.create({
      data: {
        email: faker.internet.email({
          allowSpecialCharacters: false,
          firstName: 'adminProv',
          lastName: `${i + 1}`,
        }),
        password: hashedPassword,
        userRoles: {
          create: {
            roleId: 2,
          },
        },
        adminProvinsi: {
          create: {
            provinsi: {
              connect: {
                kodeProvinsi: kodeProvinsi[i],
              },
            },
          },
        },
      },
      select: {
        adminProvinsi: true,
      },
    });

    for (let j = 0; j < 10; j++) {
      const kabkot = await prisma.kabupatenKota.create({
        data: {
          nama: 'kabkot ' + `${provinsi[i]}${j + 1}`,
          kodeKabupatenKota: faker.string.numeric(100),
          provinsi: {
            connect: {
              kodeProvinsi: kodeProvinsi[i],
            },
          },
        },
      });

      const satker = await prisma.satker.create({
        data: {
          nama: 'satker ' + `${provinsi[i]}${j + 1}`,
          kode: faker.string.numeric(100),
          email: faker.internet.email({
            allowSpecialCharacters: false,
            firstName: 'satker',
            lastName: `${provinsi[i]}${j + 1}`,
          }),
          adminProvinsi: {
            connect: {
              adminProvinsiId: adminProv.adminProvinsi.adminProvinsiId,
            },
          },
          kabupatenKota: {
            connect: {
              kodeKabupatenKota: kabkot.kodeKabupatenKota,
            },
          },
          provinsi: {
            connect: {
              kodeProvinsi: kodeProvinsi[i],
            },
          },
          alamat: faker.location.streetAddress(),
        },
      });

      const adminSatker = await prisma.user.create({
        data: {
          email: faker.internet.email({
            allowSpecialCharacters: false,
            firstName: 'adminSatker',
            lastName: `${i + 1}${j + 1}`,
          }),
          password: hashedPassword,
          userRoles: {
            create: {
              roleId: 8,
            },
          },
          adminSatker: {
            create: {
              satker: {
                connect: {
                  satkerId: satker.satkerId,
                },
              },
            },
          },
        },
      });
    }
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