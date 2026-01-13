import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string): Promise<{ access_token: string }> {
    // Mock user validation (replace with actual user repository/service logic)
    const user: User = {
      id: 1,
      username: 'testuser',
      password: 'correctpassword'
    };

    if (username !== user.username || password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}