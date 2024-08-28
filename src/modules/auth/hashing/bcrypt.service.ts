import { Injectable } from '@nestjs/common';
import { HashingService } from './hash.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
    async hash(data: string | Buffer): Promise<string> {
        const slat = await genSalt();
        return hash(data, slat);
    }

    async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
        return compare(data, encrypted);
    }
}
