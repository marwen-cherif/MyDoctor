import { Module } from '@nestjs/common';
import { NotificationService } from '../../notification/notification.service';

@Module({
  imports: [NotificationService],
})
export class ReminderModule {}
