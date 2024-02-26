import { Test, TestingModule } from '@nestjs/testing';
import { DosenPembimbingMagangService } from './dosen-pembimbing-magang.service';

describe('DosenPembimbingMagangService', () => {
  let service: DosenPembimbingMagangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DosenPembimbingMagangService],
    }).compile();

    service = module.get<DosenPembimbingMagangService>(DosenPembimbingMagangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
