import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';
import { Task } from './dto';

@Injectable()
export class AppService {
  // eslint-disable-next-line prettier/prettier
  constructor(@InjectRedis() private readonly redis: Redis, private readonly jwtService: JwtService) { }

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
      const payload = { email: emailId };
      const token = this.jwtService.sign(payload);
      return {
        success: true,
        message: `User ${emailId} authenticated successfully.`,
        token: token,
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

  async getUserTasks(emailId: string): Promise<any> {
    const userKey = `user:${emailId}`;
    const isUserRegistered = (await this.redis.get(userKey)) != null;
    if (!isUserRegistered) {
      throw new Error('User not registered');
    }
    const userTasksKey = `tasks:${emailId}`;
    const tasks = await this.redis.get(userTasksKey);
    return {
      success: true,
      tasks: tasks,
    };
  }

  async updateUserTasks(emailId: string, tasks: Task[]): Promise<any> {
    const userKey = `user:${emailId}`;
    const isUserRegistered = (await this.redis.get(userKey)) != null;
    if (!isUserRegistered) {
      throw new Error('User not registered');
    }
    const userTasksKey = `tasks:${emailId}`;
    const serializedTasks = JSON.stringify(tasks);
    await this.redis.set(userTasksKey, serializedTasks);
    return {
      success: true,
      message: `Tasks for user ${emailId} updated successfully.`,
    };
  }
}
