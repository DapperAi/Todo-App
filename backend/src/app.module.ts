import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AppController],
  imports: [
    JwtModule.register({
      secret: 'secretKey', // Use an environment variable in production
      signOptions: { expiresIn: '60m' },
    }),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
