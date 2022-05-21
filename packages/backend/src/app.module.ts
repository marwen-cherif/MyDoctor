import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppointmentService } from './appointment/appointment.service';
import { AppointmentController } from './appointment/appointment.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppointmentModule } from './appointment/appointment.module';
import { RolesGuard } from './auth/roles.guard';
import { ReminderService } from './appointment/reminder/reminder.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development.local', '.env'],
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*{.ts,.js}'],
      synchronize: process.env.ENV === 'localhost',
      timezone: process.env.TZ,
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    ScheduleModule.forRoot(),
    NotificationModule,
  ],
  controllers: [AppController, AppointmentController, UserController],
  providers: [
    AppService,
    AppointmentService,
    UserService,
    ReminderService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
