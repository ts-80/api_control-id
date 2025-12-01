import { Test, TestingModule } from '@nestjs/testing';
import { IdfaceService } from './idface.service';

describe('IdfaceService', () => {
  let service: IdfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdfaceService],
    }).compile();

    service = module.get<IdfaceService>(IdfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
