import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(id: number) {
        const tag = await this.TagsRepo.findOneBy({ id });
        if (!tag) throw new NotFoundException('Tag not found');
        return tag;
    }

    async update(id: number, dto: UpdateTagDto) {
        const tag = await this.findOne(id);
        return await this.TagsRepo.save(this.mapDtoToTag(tag, dto));
    }

    async remove(id: number) {
        const tag = await this.findOne(id);
        await this.TagsRepo.remove(tag);
    }

    async softRemove(id: number) {
        return await this.TagsRepo.softDelete(id);
    }

    private mapDtoToTag(tag: Tag, dto: UpdateTagDto): Tag {
        tag.name = dto.name ?? tag.name;
        tag.slug = dto.slug ?? tag.slug;
        tag.description = dto.description ?? tag.description;
        tag.schema = dto.schema ?? tag.schema;
        tag.featuredImage = dto.featuredImage ?? tag.featuredImage;
        return tag;
    }
}
