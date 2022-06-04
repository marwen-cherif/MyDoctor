import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.email);

    // const hashKey = hashSync('test', 10);

    if (user && user.password && compareSync(payload.password, user.password)) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: { email: string; password: string }): Promise<any> {
    const result = await this.validateUser({
      email: user.email,
      password: user.password,
    });

    const payload = {
      email: user.email,
      password: user.password,
      userId: result.id,
    };

    if (result) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
