import { describe, it, expect, beforeEach } from 'vitest';
import { MockUserService } from './mocks/user.service.mock';
import { CreateUserDto } from '../dto/create-user.dto';

describe('User Registration', () => {
  let userService: MockUserService;

  beforeEach(() => {
    userService = new MockUserService();
  });

  it('should successfully register a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'strongpassword123',
      username: 'testuser'
    };

    const registeredUser = await userService.create(createUserDto);

    expect(registeredUser).toBeDefined();
    expect(registeredUser.email).toBe(createUserDto.email);
    expect(registeredUser.username).toBe(createUserDto.username);
    expect(registeredUser.id).toBeDefined();
  });

  it('should prevent registration with duplicate email', async () => {
    const createUserDto: CreateUserDto = {
      email: 'duplicate@example.com',
      password: 'strongpassword123',
      username: 'testuser'
    };

    // First registration
    await userService.create(createUserDto);

    // Attempt duplicate registration
    await expect(userService.create(createUserDto)).rejects.toThrow('Email already exists');
  });

  it('should validate email format', async () => {
    const invalidEmails = [
      'invalid-email',
      'invalid@',
      '@invalid.com',
      'invalid@example'
    ];

    for (const email of invalidEmails) {
      const createUserDto: CreateUserDto = {
        email,
        password: 'strongpassword123',
        username: 'testuser'
      };

      await expect(userService.create(createUserDto)).rejects.toThrow('Invalid email format');
    }
  });

  it('should require strong password', async () => {
    const weakPasswords = [
      'short',
      'no_numbers',
      'NO_LOWERCASE',
      '12345678'
    ];

    for (const password of weakPasswords) {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password,
        username: 'testuser'
      };

      await expect(userService.create(createUserDto)).rejects.toThrow('Password is too weak');
    }
  });
});