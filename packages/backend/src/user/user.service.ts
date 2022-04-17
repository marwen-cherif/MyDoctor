import { Injectable } from '@nestjs/common';
import { User } from '../entity/User';

@Injectable()
export class UserService {
  async findOne(email: string): Promise<User | undefined> {
    return User.findOneBy({ email });
  }
}
