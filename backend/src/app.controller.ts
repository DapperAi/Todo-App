import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly appService: AppService, private readonly jwtService: JwtService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('auth')
  authenticate(
    @Body() body: { emailId: string; password: string },
  ): Promise<string> {
    return this.appService.authenticateUser(body.emailId, body.password);
  }

  @Post('register')
  register(
    @Body() body: { emailId: string; password: string },
  ): Promise<string> {
    return this.appService.registerUser(body.emailId, body.password);
  }

  @Post('update-tasks')
  async updateTasks(
    @Body() body: { tasks: Task[] },
    @Req() request: any,
  ): Promise<any> {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'No token provided.',
      };

    try {
      const decoded = this.jwtService.verify(token);
      return await this.appService.updateUserTasks(decoded.email, body.tasks);
    } catch (error) {
      return { status: 401, message: 'Invalid token.' };
    }
  }
}
