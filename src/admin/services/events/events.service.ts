import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMINROLE } from 'src/Enums/AdminRoles';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { EmailService } from 'src/global-services/email/email.service';
import { MetaMapDTO } from 'src/webhook/metamap/metamap.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
  ) {}

  @OnEvent('VERIFICATION_SUBMITTED')
  async sendAdminsEmail(data: MetaMapDTO) {
    const admins = await this.adminRepo.find({
      where: { role: ADMINROLE.VERIFICATION },
    });
    if (admins.length) {
      for (let i = 0; i < admins.length; i++) {
        const mail = await this.emailService.sendVerificationCreatedEmail(
          admins[i].email,
          `A user with id: ${data.metadata.userId} just submitted a verification request`,
        );
        console.log(mail);
      }
    } else {
      return;
    }

    return data;
  }
}
