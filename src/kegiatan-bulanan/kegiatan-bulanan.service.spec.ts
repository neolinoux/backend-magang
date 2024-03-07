import { Test, TestingModule } from '@nestjs/testing';
import { KegiatanBulananService } from './kegiatan-bulanan.service';

describe('KegiatanBulananService', () => {
  let service: KegiatanBulananService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KegiatanBulananService],
    }).compile();

    service = module.get<KegiatanBulananService>(KegiatanBulananService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
