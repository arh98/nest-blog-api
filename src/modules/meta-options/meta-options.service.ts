import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetaOptionDto } from './dto/create-meta-option.dto';
import { MetaOption } from './entities/meta-option.entity';

@Injectable()
export class MetaOptionsService {
    constructor(
        @InjectRepository(MetaOption)
        private metaOpsRepo: Repository<MetaOption>,
    ) {}

    async create(dto: CreateMetaOptionDto) {
        const metaOption = this.metaOpsRepo.create(dto);
        return await this.metaOpsRepo.save(metaOption);
    }
}
