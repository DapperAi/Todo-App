import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) { }

  getHello(): string {
    return 'Hello World!';
  }

  async authenticateUser(emailId: string, password: string): Promise<string> {
    const userKey = `user:${emailId}`;
    const storedPassword = await this.redis.get(userKey);
    if (!storedPassword) return `User ${emailId} does not exist.`;
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (isMatch) {
    if (storedPassword && storedPassword === password) {
      return `User ${emailId} authenticated successfully.`;
    }
    return `Authentication failed for user ${emailId}.`;
  }

  async registerUser(emailId: string, password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.redis.set(`user:${emailId}`, hashedPassword);
    return `User ${emailId} registered successfully.`;
      return `Authentication failed for user ${emailId}.`;
    }
  }
}
