import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Roles as RolesEnum } from '../src/enum/roles.enum';
import { Permissions as PermissionsEnum } from '../src/enum/permissions.enum';
import { TahunAjaran } from '../src/generated/nestjs-dto/tahunAjaran.entity';
import { TahunAjaranDosen } from '../src/generated/nestjs-dto/tahunAjaranDosen.entity';

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
  
  // const TahunAjaran = [
  //   '2022/2023',
  //   '2023/2024',
  // ]
  
  // await prisma.tahunAjaran.createMany({
  //   data: TahunAjaran.map((tahun) => ({
  //     tahun: tahun,
  //   })),
  // });

  const saltOrRounds = 10;
  const adminPassword = 'makanenak';
  const hashedPassword = await bcrypt.hash(adminPassword, saltOrRounds);

  //set one tahun ajaran active
  await prisma.tahunAjaran.update({
    where: {
      tahunAjaranId: 1,
    },
    data: {
      isActive: true,
    },
  });

  //get active tahun ajaran
  const tahunAjaran = await prisma.tahunAjaran.findFirst({
    where: {
      isActive: true,
    },
  });

  console.log(tahunAjaran);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: hashedPassword,
      userRoles: {
        create: {
          roleId: 1,
        },
      },
      tahunAjaran: {
        connect: {
          tahunAjaranId: tahunAjaran.tahunAjaranId,
        },
      },
    },
  });

  // const tahunAjaran = [
  //   '2022/2023',
  //   '2023/2024',
  // ]

  // const prodi = [
  //   'DIV Komputasi Statistik',
  //   'DIV Statistik',
  //   'DIII Statistik',
  // ]

  // const nimProdi = [
  //   '212011',
  //   '222011',
  //   '112011'
  // ]

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

  // const hashedDosPemPassword = await bcrypt.hash('makanenak', 10);
  // const hashedMahaPassword = await bcrypt.hash('makanenak', 10);

  // for (let k = 0; k < tahunAjaran.length; k++) {
    
  //   const tahunAjaranCreate = await prisma.tahunAjaran.create({
  //     data: {
  //       tahun: tahunAjaran[k],
  //     },
  //     select: {
  //       tahunAjaranId: true,
  //     },
  //   });

  //   for (let i = 0; i < prodi.length; i++) {
  //     const userDosen = await prisma.user.create({
  //       data: {
  //         email: faker.internet.email({
  //           allowSpecialCharacters: false,
  //           firstName: 'dosen',
  //           lastName: `${k + 1}${i + 1}`,
  //         }),
  //         password: hashedDosPemPassword,
  //         userRoles: {
  //           create: {
  //             roleId: 3,
  //           },
  //         },
  //         dosenPembimbingMagang: {
  //           create: {
  //             nip: faker.string.numeric(9),
  //             nama: 'dosen' + `${i + 1}`,
  //             prodi: prodi[i],
  //           },
  //         },
  //       },
  //       select: {
  //         dosenPembimbingMagang: true,
  //       },
  //     });

  //     const TahunAjaranDosenCreate = await prisma.tahunAjaranDosen.create({
  //       data: {
  //         tahunAjaran: {
  //           connect: {
  //             tahunAjaranId: tahunAjaranCreate.tahunAjaranId,
  //           },
  //         },
  //         dosen: {
  //           connect: {
  //             dosenId: userDosen.dosenPembimbingMagang.dosenId,
  //           },
  //         },
  //       },
  //     });

  //     for (let j = 0; j < kelas.length; j++) {
  //       const userMahasiswa = await prisma.user.create({
  //         data: {
  //           email: 'mahasiswa' + `${k + 1}${i + 1}${j + 1}` + '@email.com',
  //           password: hashedMahaPassword,
  //           userRoles: {
  //             create: {
  //               roleId: 9,
  //             },
  //           },
  //           mahasiswa: {
  //             create: {
  //               nim: nimProdi[i] + `${k + 1}${i + 1}${j + 1}`,
  //               nama: 'mahasiswa' + `${k + 1}${i + 1}${j + 1}`,
  //               kelas: kelas[j],
  //               prodi: prodi[i],
  //               alamat: faker.location.streetAddress(),
  //               dosenPembimbingMagang: {
  //                 connect: {
  //                   nip: userDosen.dosenPembimbingMagang.nip,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //         select: {
  //           mahasiswa: true,
  //         },
  //       });

  //       const TahunAjaranMahasiswaCreate = await prisma.tahunAjaranMahasiswa.create({
  //         data: {
  //           tahunAjaran: {
  //             connect: {
  //               tahunAjaranId: tahunAjaranCreate.tahunAjaranId,
  //             },
  //           },
  //           mahasiswa: {
  //             connect: {
  //               mahasiswaId: userMahasiswa.mahasiswa.mahasiswaId,
  //             },
  //           },
  //         },
  //       });
  //     }
  //   }
  // }

  // const provinsi = [
  //   'Aceh',
  //   'Sumatera Utara',
  //   'Sumatera Barat',
  //   'Riau',
  //   'Kepulauan Riau',
  //   'Jambi',
  //   'Bengkulu',
  //   'Sumatera Selatan',
  //   'Bangka Belitung',
  //   'Lampung',
  //   'Banten',
  //   'DKI Jakarta',
  //   'Jawa Barat',
  //   'Jawa Tengah',
  //   'DI Yogyakarta',
  //   'Jawa Timur',
  //   'Bali',
  //   'Nusa Tenggara Barat',
  //   'Nusa Tenggara Timur',
  //   'Kalimantan Barat',
  //   'Kalimantan Tengah',
  //   'Kalimantan Selatan',
  //   'Kalimantan Timur',
  //   'Kalimantan Utara',
  //   'Gorontalo',
  //   'Sulawesi Barat',
  //   'Sulawesi Selatan',
  //   'Sulawesi Tenggara',
  //   'Sulawesi Tengah',
  //   'Sulawesi Utara',
  //   'Maluku',
  //   'Maluku Utara',
  //   'Papua Barat',
  //   'Papua',
  //   'K/L/D lainnya'
  // ]

  // const kodeProvinsi = [
  //   '11',
  //   '12',
  //   '13',
  //   '14',
  //   '15',
  //   '16',
  //   '17',
  //   '18',
  //   '19',
  //   '21',
  //   '31',
  //   '32',
  //   '33',
  //   '34',
  //   '35',
  //   '36',
  //   '51',
  //   '52',
  //   '53',
  //   '61',
  //   '62',
  //   '63',
  //   '64',
  //   '65',
  //   '71',
  //   '72',
  //   '73',
  //   '74',
  //   '75',
  //   '76',
  //   '81',
  //   '82',
  //   '91',
  //   '94',
  //   '00'
  // ]

  // for (let i = 0; i < provinsi.length; i++) {

  //   const prov = await prisma.provinsi.create({
  //     data: {
  //       nama: provinsi[i],
  //       kodeProvinsi: kodeProvinsi[i]
  //     },
  //     select: {
  //       provinsiId: true,
  //       kodeProvinsi: true,
  //     },
  //   });

  //   const adminProv = await prisma.adminProvinsi.create({
  //     data: {
  //       user: {
  //         create: {
  //           email: 'adminProv' + `${i + 1}` + '@email.com',
  //           password: hashedPassword,
  //           userRoles: {
  //             create: {
  //               roleId: 2,
  //             },
  //           },
  //         },
  //       },
  //       provinsi: {
  //         connect: {
  //           kodeProvinsi: prov.kodeProvinsi,
  //         },
  //       },
  //     },
  //     select: {
  //       adminProvinsiId: true,
  //     },
  //   });

  //   for (let j = 0; j < 10; j++) {
  //     const kabkot = await prisma.kabupatenKota.create({
  //       data: {
  //         nama: 'kabkot ' + `${provinsi[i]}${j + 1}`,
  //         kodeKabupatenKota: `${i + 1}` + `${j + 1}`,
  //         provinsi: {
  //           connect: {
  //             kodeProvinsi: kodeProvinsi[i],
  //           },
  //         },
  //       },
  //       select: {
  //         kodeKabupatenKota: true,
  //       },
  //     });

  //     const adminSatker = await prisma.adminSatker.create({
  //       data: {
  //         user: {
  //           create: {
  //             email: 'adminSatker' + kabkot.kodeKabupatenKota + '@email.com',
  //             password: hashedPassword,
  //             userRoles: {
  //               create: {
  //                 roleId: 8,
  //               },
  //             },
  //           },
  //         },
  //       },
  //       select: {
  //         adminSatkerId: true,
  //       },
  //     });

  //     const satker = await prisma.satker.create({
  //       data: {
  //         nama: 'satker ' + `${provinsi[i]}${j + 1}`,
  //         kode: kabkot.kodeKabupatenKota,
  //         email: `satker` + kabkot.kodeKabupatenKota + `@email.com`,
  //         provinsi: {
  //           connect: {
  //             kodeProvinsi: prov.kodeProvinsi,
  //           },
  //         },
  //         adminProvinsi: {
  //           connect: {
  //             adminProvinsiId: adminProv.adminProvinsiId,
  //           },
  //         },
  //         kabupatenKota: {
  //           connect: {
  //             kodeKabupatenKota: kabkot.kodeKabupatenKota,
  //           },
  //         },
  //         alamat: faker.location.streetAddress(),
  //         adminSatker: {
  //           connect: {
  //             adminSatkerId: adminSatker.adminSatkerId,
  //           },
  //         },
  //       },
  //       select: {
  //         satkerId: true,
  //       },
  //     });
  //   }
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });