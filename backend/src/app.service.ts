import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  authenticateUser(emailId: string, password: string): string {
    // Placeholder for authentication logic
    return `User ${emailId} authenticated successfully.`;
  }
}
