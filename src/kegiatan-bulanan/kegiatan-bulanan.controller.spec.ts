import { Test, TestingModule } from '@nestjs/testing';
import { KegiatanBulananController } from './kegiatan-bulanan.controller';
import { KegiatanBulananService } from './kegiatan-bulanan.service';

describe('KegiatanBulananController', () => {
  let controller: KegiatanBulananController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KegiatanBulananController],
      providers: [KegiatanBulananService],
    }).compile();

    controller = module.get<KegiatanBulananController>(KegiatanBulananController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
