import { Test, TestingModule } from '@nestjs/testing';
import { IdfaceController } from './idface.controller';

describe('IdfaceController', () => {
  let controller: IdfaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdfaceController],
    }).compile();

    controller = module.get<IdfaceController>(IdfaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
