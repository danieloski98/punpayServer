import { Test, TestingModule } from '@nestjs/testing';
import { RefundserviceService } from './refundservice.service';

describe('RefundserviceService', () => {
  let service: RefundserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefundserviceService],
    }).compile();

    service = module.get<RefundserviceService>(RefundserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
