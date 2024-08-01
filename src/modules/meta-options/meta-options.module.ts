import { Module } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './entities/meta-option.entity';

@Module({
    controllers: [MetaOptionsController],
    providers: [MetaOptionsService],
    imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptionsModule {}
