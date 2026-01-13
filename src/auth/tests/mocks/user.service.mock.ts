import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';

export class MockUserService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Email validation
    if (!this.isValidEmail(createUserDto.email)) {
      throw new Error('Invalid email format');
    }

    // Duplicate email check
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Password strength validation
    if (!this.isStrongPassword(createUserDto.password)) {
      throw new Error('Password is too weak');
    }

    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
    
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isStrongPassword(password: string): boolean {
    // Require at least 8 characters, mix of letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }
}