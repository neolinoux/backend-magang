import { Test, TestingModule } from '@nestjs/testing';
import { TahunAjaranService } from './tahun-ajaran.service';

describe('TahunAjaranService', () => {
  let service: TahunAjaranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TahunAjaranService],
    }).compile();

    service = module.get<TahunAjaranService>(TahunAjaranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
