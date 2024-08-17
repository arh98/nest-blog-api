import {
    BadRequestException,
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const ParamId = createParamDecorator(
    (data: string, ctx: ExecutionContext): number => {
        const request = ctx.switchToHttp().getRequest();
        const param = data || 'id';
        const val = parseInt(request.params[param], 10);
        if (Number.isNaN(val)) {
            throw new BadRequestException(
                `Invalid ID: ${request.params[param]}`,
            );
        }
        return val;
    },
);
