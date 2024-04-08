import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('auth')
  authenticate(@Body() body: { emailId: string; password: string }): string {
    return this.appService.authenticateUser(body.emailId, body.password);
  }
}
