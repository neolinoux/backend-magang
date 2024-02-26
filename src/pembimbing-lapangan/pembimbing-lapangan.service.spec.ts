import { Test, TestingModule } from '@nestjs/testing';
import { PembimbingLapanganService } from './pembimbing-lapangan.service';

describe('PembimbingLapanganService', () => {
  let service: PembimbingLapanganService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PembimbingLapanganService],
    }).compile();

    service = module.get<PembimbingLapanganService>(PembimbingLapanganService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
