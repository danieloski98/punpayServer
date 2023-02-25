import { RateMysqlEntity } from 'src/rate/rate.entity';
import { Entity } from 'typeorm';

@Entity('Rate')
export class RateEntity extends RateMysqlEntity {}
