import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'class-validator';
import { Mahasiswa } from 'src/generated/nestjs-dto/mahasiswa.entity';

@Injectable()
export class MahasiswaService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findAll(){
    return this.prisma.mahasiswa.findMany({
      select: {
        userId: true,
        nim: true,
        nama: true,
        kelas: true,
        pembimbingLapangan: {
          select: {
            nama: true,
          }
        },
        dosenPembimbingMagang: {
          select: {
            nama: true,
          }
        },
        satker: {
          select: {
            nama: true,
          }
        },
        alamat: true,
      },
      orderBy: {
        user: {
          userId: 'asc',
        }
      },
    });
  }

  async findOne(nim: string) {
    console.log(nim);
    const user = await this.prisma.mahasiswa.findUnique({
      where: {
        nim: nim,
      },
    });

    if(!user){
      return {
        status: 'error',
        message: 'Data Mahasiswa Tidak Ditemukan',
      };
    }

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Diambil',
      data: user,
    };
  }

  async update(nim: string, mahasiswa: Mahasiswa) {
    const user = await this.prisma.mahasiswa.findUnique({
      where: {
        nim: nim,
      },
    });

    if(!user){
      return {
        status: 'error',
        message: 'Data Mahasiswa Tidak Ditemukan',
      };
    }

    try {
      const updatedUser = await this.prisma.mahasiswa.update({
        where: {
          nim: nim,
        },
        data: {
          nama: mahasiswa.nama,
          alamat: mahasiswa.alamat
        },
        select: {
          nim: true,
          nama: true,
          kelas: true,
          pembimbingLapangan: {
            select: {
              nama: true,
            }
          },
          dosenPembimbingMagang: {
            select: {
              nama: true,
            }
          },
          satker: {
            select: {
              nama: true,
            }
          },
          alamat: true,
        },
      });

      return {
        status: 'success',
        message: 'Data Mahasiswa Berhasil Diubah',
        data: updatedUser,
      };
    } catch (error) {
      throw new InternalServerErrorException('Gagal Memperbarui Data Mahasiswa');
    }
  }

  async remove(nim: string) {
    const user = await this.prisma.mahasiswa.findUnique({
      where: {
        nim: nim,
      },
      select: {
        nim: true,
        nama: true,
        kelas: true,
        pembimbingLapangan: {
          select: {
            nama: true,
          }
        },
        dosenPembimbingMagang: {
          select: {
            nama: true,
          }
        },
        satker: {
          select: {
            nama: true,
          }
        },
        alamat: true,
      },
    });

    if(!user){
      return {
        status: 'error',
        message: 'Data Mahasiswa Tidak Ditemukan',
      };
    }

    try {
      const userId = await this.prisma.mahasiswa.findUnique({
        where: {
          nim: nim,
        },
        select: {
          userId: true,
        },
      });

      await this.prisma.mahasiswa.delete({
        where: {
          nim: nim,
        },
      });

      await this.prisma.user.delete({
        where: {
          userId: userId.userId,
        },
      });

      return {
        status: 'success',
        message: 'Data Mahasiswa Berhasil Dihapus',
        data: user,
      };
    } catch (error) {
      throw new InternalServerErrorException('Gagal Menghapus Data Mahasiswa');
    }
  }

  async importExcel(files: Array<Express.Multer.File>) {
    //validate file
    const file = files[0];
    if(file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      return {
        status: 'error',
        message: 'File yang diupload bukan file excel',
      };
    }

    //parse file
    const excel = require('exceljs');
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.getWorksheet(1);

    // loop through each row
    let data = [];
    let error = [];

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);

      // check if user already exists
      const user = await this.prisma.user.findUnique({
        where: {
          email: row.getCell(1).value + '@stis.ac.id',
        },
      });

      if(user){
        error.push({
          row: i,
          message: 'Mahasiswa dengan NIM ' + row.getCell(1).value + ' sudah ada',
        });
      }
    }

    if(error.length > 0){
      return {
        status: 'error',
        message: 'Data Mahasiswa Gagal Ditambahkan',
        error: error,
      };
    }

    error = [];
    // loop through each row
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const mahasiswa = new Mahasiswa();

      // user mahasiswa will be login using oauth2, but for now we will create user manually
      const userId = await this.prisma.user.create({
        data: {
          email: row.getCell(1).value + '@stis.ac.id',
          password: 'mahasiswa',
        },
        select: {
          userId: true,
        },
      }).then((res) => res.userId);

      mahasiswa.userId = userId;
      mahasiswa.nim = row.getCell(1).value.toString();
      mahasiswa.nama = row.getCell(2).value;
      mahasiswa.prodi = row.getCell(3).value;
      mahasiswa.kelas = row.getCell(4).value;
      mahasiswa.nipDosen = row.getCell(5).value;
      mahasiswa.alamat = row.getCell(6).value;

      const errors = await validate(mahasiswa);
      if(errors.length > 0){
        error.push({
          row: i,
          message: errors,
        });
      } else {
        data.push(mahasiswa);
      }
    }

    if(error.length > 0){
      return {
        status: 'error',
        message: 'Data Mahasiswa Gagal Ditambahkan',
        error: error,
      };
    }

    // insert data
    try {
      this.prisma.mahasiswa.createMany({
        data: data,
        skipDuplicates: true,
      });


      let returnData = [];
      for (let i = 0; i < data.length; i++) {
        const mahasiswa = await this.prisma.mahasiswa.findUnique({
          where: {
            userId: data[i].userId,
          },
          select: {
            userId: true,
            nim: true,
            nama: true,
            kelas: true,
            pembimbingLapangan: {
              select: {
                nama: true,
              }
            },
            dosenPembimbingMagang: {
              select: {
                nama: true,
              }
            },
            satker: {
              select: {
                nama: true,
              }
            },
            alamat: true,
          },
        });

        returnData.push({
          status: 'success',
          message: 'Data Mahasiswa Berhasil Ditambahkan',
          data: mahasiswa,
        });
      }

      return {
        status: 'success',
        message: 'Data Mahasiswa Berhasil Ditambahkan',
        data: data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Gagal Menambahkan Data Mahasiswa', error);
    }
  }
}
