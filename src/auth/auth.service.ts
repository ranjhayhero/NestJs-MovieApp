import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  // Simulated user database (in a real app, this would be a database)
  private users: User[] = [
    {
      id: 1,
      username: 'testuser',
      password: '$2b$10$x2qz5RkSMGoPyCvqDDZN5uD5v1zU.5WdAQq/fX8ycQJzBKlBnKIXS', // hashed 'password123'
    },
  ];

  async login(username: string, password: string): Promise<string> {
    // Find user by username
    const user = this.users.find(u => u.username === username);

    // Check if user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { sub: user.id, username: user.username }, 
      'SECRET_KEY', // In a real app, use an environment variable
      { expiresIn: '1h' }
    );

    return token;
  }
}