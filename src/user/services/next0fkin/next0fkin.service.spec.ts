import { Test, TestingModule } from '@nestjs/testing';
import { Next0fkinService } from './next0fkin.service';

describe('Next0fkinService', () => {
  let service: Next0fkinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Next0fkinService],
    }).compile();

    service = module.get<Next0fkinService>(Next0fkinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
