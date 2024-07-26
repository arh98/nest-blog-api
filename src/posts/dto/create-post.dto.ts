import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsDate,
    IsEnum,
    IsJSON,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { PostStatus } from '../enums/post-status.enum';
import { PostType } from '../enums/post-type.enum';
import { CreateMetaOptionDto } from '../../meta-options/dto/create-meta-option.dto';
import { Type } from 'class-transformer';

export class CreatePostDto {
    @ApiProperty({
        description: 'The title of the post',
        minLength: 4,
        example: 'My First Blog Post',})
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;


    @ApiProperty({
        description: 'The type of the post',
        enum: PostType,
        example: PostType.POST,})
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;


    @ApiProperty({
        description: 'The status of the post',
        enum: PostStatus,
        example: PostStatus.DRAFT,})
    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;


    @ApiProperty({
        description: 'The slug of the post',
        example: 'my-first-blog-post',})
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
            'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',})
    slug: string;


    @ApiPropertyOptional({
        description: 'The content of the post',
        example: 'This is the content of my first blog post.',})
    @IsOptional()
    @IsString()
    content?: string;


    @ApiPropertyOptional({
        description: 'Serialize your JSON object else a validation error will be thrown',
        example: '{\r\n "@context": "https://schema.org",\r\n "@type": "Person"\r\n }',})
    @IsOptional()
    @IsJSON()
    schema?: string;


    @ApiPropertyOptional({
        description: 'The URL of the featured image',
        format: 'uri',
        example: 'https://example.com/featured-image.jpg',})
    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;


    @ApiPropertyOptional({
        description: 'The date and time (ISO8601) when the post should be published',
        format: 'date-time',
        example: '2024-03-16T07:46:32+0000',})
    @IsDate()
    @IsOptional()
    publishOn?: Date;


    @ApiPropertyOptional({
        description: 'The tags associated with the post',
        type: [String],
        minLength: 3,
        example: ['nestjs', 'typescript'],})
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    tags?: string[];

    
    @ApiPropertyOptional({
        description: 'The meta options associated with the post',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },})
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateMetaOptionDto)
    metaOptions?: CreateMetaOptionDto;
}
