import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { MetaMapDTO } from './metamap.dto';
import { createHmac, timingSafeEqual } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { VerificationService } from 'src/verification/verification.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationService } from 'src/notification/notification.service';
import { ADMINROLE } from 'src/Enums/AdminRoles';

@Injectable()
export class MetamapService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService,
    private verificationService: VerificationService,
    private eventEmitter: EventEmitter2,
    private notificationService: NotificationService,
  ) {}

  private async verify(signature, payloadBody) {
    const secret = this.configService.get('METAMAP_SECRET');
    const hash = createHmac('sha256', secret);
    const hashString = hash.update(payloadBody).digest('hex');
    return timingSafeEqual(Buffer.from(hashString), Buffer.from(signature));
  }

  async getMeta() {}
}
