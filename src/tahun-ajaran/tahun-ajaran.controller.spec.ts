import { Test, TestingModule } from '@nestjs/testing';
import { TahunAjaranController } from './tahun-ajaran.controller';
import { TahunAjaranService } from './tahun-ajaran.service';

describe('TahunAjaranController', () => {
  let controller: TahunAjaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TahunAjaranController],
      providers: [TahunAjaranService],
    }).compile();

    controller = module.get<TahunAjaranController>(TahunAjaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
