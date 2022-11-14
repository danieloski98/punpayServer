import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheModel: Cache) {}
  async getHello() {
    await this.cacheModel.set('values', [1, 2, 4, 5]);
    const vals = await this.cacheModel.get('values');
    return vals;
  }
}
