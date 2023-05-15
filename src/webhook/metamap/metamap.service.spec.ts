import { Test, TestingModule } from '@nestjs/testing';
import { MetamapService } from './metamap.service';

describe('MetamapService', () => {
  let service: MetamapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetamapService],
    }).compile();

    service = module.get<MetamapService>(MetamapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
