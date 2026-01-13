import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    jwtService = {
      sign: vi.fn().mockReturnValue('mock_jwt_token')
    } as any;

    authService = new AuthService(jwtService);
  });

  it('should successfully login with correct credentials', async () => {
    const result = await authService.login('testuser', 'correctpassword');
    
    expect(result).toEqual({
      access_token: 'mock_jwt_token'
    });
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: 1,
      username: 'testuser'
    });
  });

  it('should throw UnauthorizedException for incorrect username', async () => {
    await expect(
      authService.login('wronguser', 'correctpassword')
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for incorrect password', async () => {
    await expect(
      authService.login('testuser', 'wrongpassword')
    ).rejects.toThrow(UnauthorizedException);
  });
});