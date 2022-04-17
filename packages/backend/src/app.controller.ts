import { Controller, Request, Get, Post, Logger } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './decorators/public';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AppController.name);

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
