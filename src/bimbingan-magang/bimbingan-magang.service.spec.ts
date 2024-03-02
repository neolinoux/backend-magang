import { Test, TestingModule } from '@nestjs/testing';
import { BimbinganMagangService } from './bimbingan-magang.service';

describe('BimbinganMagangService', () => {
  let service: BimbinganMagangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BimbinganMagangService],
    }).compile();

    service = module.get<BimbinganMagangService>(BimbinganMagangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
