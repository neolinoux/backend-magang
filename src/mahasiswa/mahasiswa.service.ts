import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'class-validator';
import { CreateMahasiswaDto } from 'src/generated/nestjs-dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from 'src/generated/nestjs-dto/update-mahasiswa.dto';
import { Mahasiswa } from 'src/generated/nestjs-dto/mahasiswa.entity';

@Injectable()
export class MahasiswaService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findAll(params: any) {
    return this.prisma.mahasiswa.findMany({
      select: {
        userId: true,
        nim: true,
        nama: true,
        kelas: true,
        prodi: true,
        dosenPembimbingMagang: {
          select: {
            nama: true,
          }
        },
        pembimbingLapangan: {
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
        tahunAjaran: {
          select: {
            tahun: true,
          }
        },
      },
      orderBy: {
        user: {
          userId: 'asc',
        }
      },
      where: {
        nim: params.nim,
        nama: params.nama,
        kelas: params.kelas,
        prodi: params.prodi,
        dosenPembimbingMagang: {
          nip: params.nipDosen,
        },
        pembimbingLapangan: {
          nip: params.nipPemlap,
        },
        satker: {
          kode: params.kodeSatker,
        },
        tahunAjaran: {
          tahun: params.tahun,
        },
      }
    });
  }

  async importExcel(files: Array<Express.Multer.File>) {
    //validate file
    const file = files[0];
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
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

    try {
      for (let i = 2; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i);
  
        // check if user already exists
        const mahasiswa = await this.prisma.mahasiswa.findUnique({
          where: {
            nim: row.getCell(1).value,
          },
        });
  
        if (mahasiswa) {
          error.push({
            row: i,
            message: 'Mahasiswa dengan NIM ' + row.getCell(1).value + ' sudah ada',
          });
        }
      }
      
      if (error.length > 0) {
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
        const mahasiswa = new CreateMahasiswaDto();
  
        mahasiswa.nim = row.getCell(1).value;
        mahasiswa.nama = row.getCell(2).value;
        mahasiswa.prodi = row.getCell(3).value;
        mahasiswa.kelas = row.getCell(4).value;
        mahasiswa.alamat = row.getCell(5).value;
        const tahunAjaran = row.getCell(6).value;
        const nipDosen = row.getCell(7).value;

        // create user mahasiswa
        // user mahasiswa will be login using oauth2, but for now we will create user manually
        const userMahasiswa = await this.prisma.user.create({
          data: {
            email: row.getCell(1).value + '@gmail.com',
            password: 'password',
            userRoles: {
              create: {
                roleId: 9,
              },
            },
            mahasiswa: {
              create: {
                nim: row.getCell(1).value,
                nama: row.getCell(2).value,
                kelas: row.getCell(4).value,
                prodi: row.getCell(3).value,
                alamat: row.getCell(5).value,
                tahunAjaran: {
                  connect: {
                    tahun: tahunAjaran,
                  },
                },
                dosenPembimbingMagang: {
                  connect: {
                    nip: nipDosen,
                  },
                },
              },
            },
          },
          select: {
            mahasiswa: {
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
                tahunAjaran: {
                  select: {
                    tahun: true,
                  }
                },
              },
            },
          },
        });

        const errors = await validate(userMahasiswa);
        if (errors.length > 0) {
          error.push({
            row: i - 2,
            message: errors,
          });
        } else {
          data[i - 2] = userMahasiswa;
        }
      }
  
      if (error.length > 0) {
        return {
          status: 'error',
          message: 'Data Mahasiswa Gagal Ditambahkan',
          error: error,
        };
      }
  
      return {
        status: 'success',
        message: 'Data Mahasiswa Berhasil Ditambahkan',
        data: data,
      };

    } catch (error) {
      return {
        status: 'error',
        message: 'Internal Server Error',
      };
    }

  } catch(error) {
    return {
      status: 'error',
      message: 'Internal Server Error',
    };
  }

  async update(nim: string, updateMahasiswaDto: UpdateMahasiswaDto) {
    try {
      const cekMahasiswa = await this.prisma.mahasiswa.findUnique({
        where: {
          nim: nim,
        },
      });
  
      if(!cekMahasiswa){
        return {
          status: 'error',
          message: 'Data Mahasiswa Tidak Ditemukan',
        };
      }

      const updatedMahasiswa = await this.prisma.mahasiswa.update({
        where: {
          nim: nim,
        },
        data: {
          dosenPembimbingMagang: {
            connect: {
              nip: updateMahasiswaDto.dosenPembimbingMagang.nip,
            },
          },
          pembimbingLapangan: {
            connect: {
              nip: updateMahasiswaDto.pembimbingLapangan.nip,
            },
          },
          satker: {
            connect: {
              kode: updateMahasiswaDto.satker.kode,
            },
          },
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
          tahunAjaran: {
            select: {
              tahun: true,
            }
          },
        },
      });

      return {
        status: 'success',
        message: 'Data Mahasiswa Berhasil Diupdate',
        data: updatedMahasiswa,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'request failed',
      };
    }
  }
}
