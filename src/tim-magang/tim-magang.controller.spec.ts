import { Test, TestingModule } from '@nestjs/testing';
import { TimMagangController } from './tim-magang.controller';
import { TimMagangService } from './tim-magang.service';

describe('TimMagangController', () => {
  let controller: TimMagangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimMagangController],
      providers: [TimMagangService],
    }).compile();

    controller = module.get<TimMagangController>(TimMagangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
