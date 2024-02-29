import { Test, TestingModule } from '@nestjs/testing';
import { PemilihanPenempatanController } from './pemilihan-penempatan.controller';

describe('PemilihanPenempatanController', () => {
  let controller: PemilihanPenempatanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemilihanPenempatanController],
    }).compile();

    controller = module.get<PemilihanPenempatanController>(PemilihanPenempatanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
