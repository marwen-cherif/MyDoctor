import { Injectable } from '@nestjs/common';
import { User } from './User';

@Injectable()
export class UserService {
  async findOne(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }
  async findOneById(userId: string): Promise<User | undefined> {
    return User.findOne({ relations: ['roles'], where: { id: userId } });
  }
}
