import { Test, TestingModule } from '@nestjs/testing';
import { DosenPembimbingMagangController } from './dosen-pembimbing-magang.controller';
import { DosenPembimbingMagangService } from './dosen-pembimbing-magang.service';

describe('DosenPembimbingMagangController', () => {
  let controller: DosenPembimbingMagangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosenPembimbingMagangController],
      providers: [DosenPembimbingMagangService],
    }).compile();

    controller = module.get<DosenPembimbingMagangController>(DosenPembimbingMagangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
