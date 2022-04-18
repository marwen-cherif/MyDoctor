import { Controller, Request, Get, Post, Logger, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './decorators/public';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AppController.name);

  @Public()
  @Post('auth/login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
