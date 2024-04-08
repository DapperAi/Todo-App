import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';


@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  getHello(): string {
    return 'Hello World!';
  }

  async authenticateUser(emailId: string, password: string): Promise<string> {
    const userKey = `user:${emailId}`;
    const storedPassword = await this.redis.get(userKey);
    if (storedPassword && storedPassword === password) {
      return `User ${emailId} authenticated successfully.`;
    } else {
      return `Authentication failed for user ${emailId}.`;
    }
  }
}
