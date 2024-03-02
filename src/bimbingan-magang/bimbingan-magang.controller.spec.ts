import { Test, TestingModule } from '@nestjs/testing';
import { BimbinganMagangController } from './bimbingan-magang.controller';
import { BimbinganMagangService } from './bimbingan-magang.service';

describe('BimbinganMagangController', () => {
  let controller: BimbinganMagangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BimbinganMagangController],
      providers: [BimbinganMagangService],
    }).compile();

    controller = module.get<BimbinganMagangController>(BimbinganMagangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
