import { Test, TestingModule } from '@nestjs/testing';
import { SatkerController } from './satker.controller';
import { SatkerService } from './satker.service';

describe('SatkerController', () => {
  let controller: SatkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SatkerController],
      providers: [SatkerService],
    }).compile();

    controller = module.get<SatkerController>(SatkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
