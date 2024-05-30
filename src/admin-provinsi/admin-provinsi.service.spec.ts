import { Test, TestingModule } from '@nestjs/testing';
import { AdminProvinsiService } from './admin-provinsi.service';

describe('AdminProvinsiService', () => {
  let service: AdminProvinsiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminProvinsiService],
    }).compile();

    service = module.get<AdminProvinsiService>(AdminProvinsiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
