import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { MetaMapDTO } from './metamap.dto';
import { createHmac, timingSafeEqual } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MetamapService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  private async verify(signature, payloadBody) {
    const secret = this.configService.get('METAMAP_SECRET');
    const hash = createHmac('sha256', secret);
    const hashString = hash.update(payloadBody).digest('hex');
    return timingSafeEqual(Buffer.from(hashString), Buffer.from(signature));
  }

  async getMeta(metadata: MetaMapDTO) {
    console.log(metadata);
    switch (metadata.eventName) {
      case 'step_completed': {
        break;
      }
      case 'verification_completed': {
        break;
      }
      case 'verification_input_completed': {
        break;
      }

      case 'verification_started': {
        break;
      }

      case 'verification_updated': {
        break;
      }
    }

    return { message: 'date recieved' };
  }
}
