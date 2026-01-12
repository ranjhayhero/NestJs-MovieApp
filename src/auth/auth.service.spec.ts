import { describe, it, expect } from 'vitest';
import { AuthService, User } from './auth.service';

describe('AuthService', () => {
  const authService = new AuthService();

  describe('validateUser', () => {
    const validUser: User = {
      id: '1',
      username: 'validuser',
      email: 'valid@example.com',
      password: 'ValidPass123'
    };

    it('should validate a correct user', () => {
      expect(() => authService.validateUser(validUser)).not.toThrow();
    });

    it('should throw error for null/undefined user', () => {
      expect(() => authService.validateUser(null)).toThrow('User cannot be null or undefined');
      expect(() => authService.validateUser(undefined)).toThrow('User cannot be null or undefined');
    });

    it('should throw error for short username', () => {
      const invalidUser = { ...validUser, username: 'ab' };
      expect(() => authService.validateUser(invalidUser)).toThrow('Username must be at least 3 characters long');
    });

    it('should throw error for invalid email', () => {
      const invalidUser = { ...validUser, email: 'invalid-email' };
      expect(() => authService.validateUser(invalidUser)).toThrow('Invalid email address');
    });

    it('should throw error for short password', () => {
      const invalidUser = { ...validUser, password: 'short' };
      expect(() => authService.validateUser(invalidUser)).toThrow('Password must be at least 8 characters long');
    });

    it('should throw error for password without letter and number', () => {
      const invalidUser = { ...validUser, password: 'onlyletters' };
      expect(() => authService.validateUser(invalidUser)).toThrow('Password must contain at least one letter and one number');
    });
  });
});