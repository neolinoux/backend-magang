import { Test, TestingModule } from '@nestjs/testing';
import { SatkerService } from './satker.service';

describe('SatkerService', () => {
  let service: SatkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SatkerService],
    }).compile();

    service = module.get<SatkerService>(SatkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
