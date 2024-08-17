import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from './interfaces/paginated.interface';

@Injectable()
export class PaginationService {
    constructor(
        @Inject(REQUEST)
        private readonly req: Request,
    ) {}
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        source: Repository<T> | SelectQueryBuilder<T>,
        relations: string[] = [],
    ) {
        const { limit, page } = paginationQuery;
        const skippedItems = (page - 1) * limit;

        let results: T[];
        let totalItems: number;

        if (source instanceof Repository) {
            [results, totalItems] = await source.findAndCount({
                skip: skippedItems,
                take: limit,
                relations,
            });
        } else if (source instanceof SelectQueryBuilder) {
            [results, totalItems] = await source
                .skip(skippedItems)
                .take(limit)
                .getManyAndCount();
        } else {
            throw new Error(
                'Invalid source type. Expected Repository or SelectQueryBuilder.',
            );
        }

        const baseURL = this.req.protocol + '://' + this.req.headers.host + '/';
        const url = new URL(this.req.url, baseURL);

        const totalPages = Math.ceil(totalItems / paginationQuery.limit);
        const nextPage =
            paginationQuery.page === totalPages
                ? paginationQuery.page
                : paginationQuery.page + 1;
        const previousPage =
            paginationQuery.page === 1
                ? paginationQuery.page
                : paginationQuery.page - 1;

        const finalResponse: Paginated<T> = {
            data: results,
            meta: {
                itemsPerPage: paginationQuery.limit,
                totalItems: totalItems,
                currentPage: paginationQuery.page,
                totalPages: Math.ceil(totalItems / paginationQuery.limit),
            },
            links: {
                first: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=1`,
                last: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
                current: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
                next: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
                previous: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
            },
        };

        return finalResponse;
    }
}
