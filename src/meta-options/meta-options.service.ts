import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetaOptionDto } from './dto/create-meta-option.dto';
import { UpdateMetaOptionDto } from './dto/update-meta-option.dto';
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

    findAll() {
        return `This action returns all metaOptions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} metaOption`;
    }

    update(id: number, dto: UpdateMetaOptionDto) {
        return `This action updates a #${id} metaOption`;
    }

    remove(id: number) {
        return `This action removes a #${id} metaOption`;
    }
}
