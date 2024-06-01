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
  
  const TahunAjaran = [
    '2022/2023',
    '2023/2024',
  ]
  
  await prisma.tahunAjaran.createMany({
    data: TahunAjaran.map((tahun) => ({
      tahun: tahun,
    })),
  });

  // set tahun ajaran aktif
  await prisma.tahunAjaran.update({
    where: {
      tahun: '2022/2023',
    },
    data: {
      isActive: true,
    },
  });

  const hashedPassword = await bcrypt.hash('makanenak', 10);

  await prisma.user.create({
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
          tahunAjaranId: (await prisma.tahunAjaran.findFirst({
            where: {
              isActive: true,
            },
          })).tahunAjaranId,
        },
      },
    },
  });

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
    'K/L/D lainnya'
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
    '00'
  ]

  for (let i = 0; i < provinsi.length; i++) {
    await prisma.provinsi.create({
      data: {
        nama: provinsi[i],
        kodeProvinsi: kodeProvinsi[i]
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