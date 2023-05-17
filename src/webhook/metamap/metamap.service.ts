import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { MetaMapDTO } from './metamap.dto';
import { createHmac, timingSafeEqual } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { VerificationService } from 'src/verification/verification.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MetamapService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService,
    private verificationService: VerificationService,
    private eventEmitter: EventEmitter2,
  ) {}

  private async verify(signature, payloadBody) {
    const secret = this.configService.get('METAMAP_SECRET');
    const hash = createHmac('sha256', secret);
    const hashString = hash.update(payloadBody).digest('hex');
    return timingSafeEqual(Buffer.from(hashString), Buffer.from(signature));
  }

  async getMeta(metadata: MetaMapDTO) {
    switch (metadata.eventName) {
      case 'step_completed': {
        break;
      }
      case 'verification_completed': {
        // check if the user has verification
        const hasVerification =
          await this.verificationService.checkVerification(
            metadata.metadata.userId,
          );

        if (hasVerification) {
          break;
        } else {
          // create the verification
          const verification =
            await this.verificationService.createVerification({
              link: metadata.resource,
              metadata: metadata.metadata,
              userId: metadata.metadata.userId,
            });

          // emit email event
          this.eventEmitter.emit('VERIFICATION_SUBMITTED', metadata);
        }
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

    return { message: 'data recieved' };
  }
}
