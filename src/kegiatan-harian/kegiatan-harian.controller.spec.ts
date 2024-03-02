import { Test, TestingModule } from '@nestjs/testing';
import { KegiatanHarianController } from './kegiatan-harian.controller';
import { KegiatanHarianService } from './kegiatan-harian.service';

describe('KegiatanHarianController', () => {
  let controller: KegiatanHarianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KegiatanHarianController],
      providers: [KegiatanHarianService],
    }).compile();

    controller = module.get<KegiatanHarianController>(KegiatanHarianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
