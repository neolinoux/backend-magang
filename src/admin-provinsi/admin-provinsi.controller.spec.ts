import { Test, TestingModule } from '@nestjs/testing';
import { AdminProvinsiController } from './admin-provinsi.controller';
import { AdminProvinsiService } from './admin-provinsi.service';

describe('AdminProvinsiController', () => {
  let controller: AdminProvinsiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProvinsiController],
      providers: [AdminProvinsiService],
    }).compile();

    controller = module.get<AdminProvinsiController>(AdminProvinsiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
