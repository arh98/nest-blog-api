import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { UsersService } from 'src/modules/users/providers/users.service';

@Injectable()
export class MeService {
    constructor(private readonly service: UsersService) {}

    async myProfile(myId: number) {
        return this.service.findOne(myId);
    }

    async deleteMe(myId: number) {
        await this.service.deActive(myId);
        return { message: 'User deleted successfully' };
    }

    async updateMe(myId: number, dto: UpdateUserDto) {
        return this.service.update(myId, dto);
    }
}
