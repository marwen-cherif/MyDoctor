import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
