import { Test, TestingModule } from '@nestjs/testing';
import { PembimbingLapanganController } from './pembimbing-lapangan.controller';
import { PembimbingLapanganService } from './pembimbing-lapangan.service';

describe('PembimbingLapanganController', () => {
  let controller: PembimbingLapanganController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PembimbingLapanganController],
      providers: [PembimbingLapanganService],
    }).compile();

    controller = module.get<PembimbingLapanganController>(PembimbingLapanganController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
