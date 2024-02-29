import { Test, TestingModule } from '@nestjs/testing';
import { PemilihanPenempatanService } from './pemilihan-penempatan.service';

describe('PemilihanPenempatanService', () => {
  let service: PemilihanPenempatanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PemilihanPenempatanService],
    }).compile();

    service = module.get<PemilihanPenempatanService>(PemilihanPenempatanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
