import { Test, TestingModule } from '@nestjs/testing';
import { TimMagangService } from './tim-magang.service';

describe('TimMagangService', () => {
  let service: TimMagangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimMagangService],
    }).compile();

    service = module.get<TimMagangService>(TimMagangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
