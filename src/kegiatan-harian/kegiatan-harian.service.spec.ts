import { Test, TestingModule } from '@nestjs/testing';
import { KegiatanHarianService } from './kegiatan-harian.service';

describe('KegiatanHarianService', () => {
  let service: KegiatanHarianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KegiatanHarianService],
    }).compile();

    service = module.get<KegiatanHarianService>(KegiatanHarianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
