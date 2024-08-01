import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly TagsRepo: Repository<Tag>,
    ) {}

    async create(dto: CreateTagDto) {
        return await this.TagsRepo.save(this.TagsRepo.create(dto));
    }

    findAll() {
        return this.TagsRepo.find();
    }

    findMultiple(ids: number[]) {
        const tags = this.TagsRepo.find({
            where: {
                id: In(ids),
            },
        });
        return tags;
    }

    findOne(id: number) {
        return this.TagsRepo.findBy({ id });
    }

    update(id: number, dto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    async remove(id: number) {
        return await this.TagsRepo.delete(id);
    }

    async softRemove(id: number) {
        return await this.TagsRepo.softDelete(id);
    }
}
