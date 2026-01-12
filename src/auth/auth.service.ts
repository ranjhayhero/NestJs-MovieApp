export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export class AuthService {
  /**
   * Validates a user based on given criteria
   * @param user User object to validate
   * @returns true if user is valid, throws error otherwise
   */
  validateUser(user: User): boolean {
    // Check if user object exists
    if (!user) {
      throw new Error('User cannot be null or undefined');
    }

    // Validate username
    if (!user.username || user.username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
      throw new Error('Invalid email address');
    }

    // Validate password
    if (!user.password || user.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Additional password complexity check
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(user.password)) {
      throw new Error('Password must contain at least one letter and one number');
    }

    return true;
  }
}