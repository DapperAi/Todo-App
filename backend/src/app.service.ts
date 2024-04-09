import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  // eslint-disable-next-line prettier/prettier
  constructor(@InjectRedis() private readonly redis: Redis) { }

  getHello(): string {
    return 'Hello World!';
  }

  async authenticateUser(emailId: string, password: string): Promise<any> {
    const userKey = `user:${emailId}`;
    const storedPassword = await this.redis.get(userKey);
    if (!storedPassword)
      return {
        success: false,
        message: `User ${emailId} does not exist.`,
      };
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (isMatch) {
      return {
        success: true,
        message: `User ${emailId} authenticated successfully.`,
      };
    }
    return {
      success: false,
      message: `Authentication failed for user ${emailId}`,
    };
  }

  async registerUser(emailId: string, password: string): Promise<any> {
    const userKey = `user:${emailId}`;
    const isAlreadyRegistered = (await this.redis.get(userKey)) != null;
    if (!isAlreadyRegistered) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.redis.set(`user:${emailId}`, hashedPassword);
      return {
        success: true,
        message: `User ${emailId} registered successfully.`,
      };
    }

    return {
      success: false,
      message: `User ${emailId} already registered.`,
    };
  }
}
