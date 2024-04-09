import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Task, UserTask } from './dto';
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
    const res = this.appService.authenticateUser(body.emailId, body.password);
    console.log('authentication request served successfully');
    return res;
  }

  @Post('register')
  register(
    @Body() body: { emailId: string; password: string },
  ): Promise<string> {
    const res = this.appService.registerUser(body.emailId, body.password);
    console.log('register user request served successfully');
    return res;
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
      body.tasks.forEach((t) => {
        const ut = new UserTask(t);
        if (!ut.validate()) {
          throw new Error('Invalid task body');
        }
      });
      const res = await this.appService.updateUserTasks(
        decoded.email,
        body.tasks,
      );
      console.log('update-tasks request served successfully');
      return res;
    } catch (error) {
      console.log(error);
      return { status: 401, message: error.message };
    }
  }

  @Get('tasks')
  async getTasks(@Req() request: any): Promise<any> {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'No token provided.',
      };

    try {
      const decoded = this.jwtService.verify(token);
      const res = await this.appService.getUserTasks(decoded.email);
      console.log('tasks fetch request served successfully');
      return res;
    } catch (err) {
      return { status: 401, message: 'Invalid token.' };
    }
  }
}
