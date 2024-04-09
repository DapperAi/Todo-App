import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './dto';

@Controller()
export class AppController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly appService: AppService) { }

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
  updateTasks(
    @Body() body: { emailId: string; tasks: Task[] },
  ): Promise<string> {
    return this.appService.updateUserTasks(body.emailId, body.tasks);
  }
}
