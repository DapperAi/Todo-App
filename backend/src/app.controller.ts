import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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
    @Body() body: { tasks: Task[] },
    @Req() request: any,
  ): Promise<string> {
    // Code for extracting email from JWT and calling updateUserTasks with it will be implemented here.
  }
}
