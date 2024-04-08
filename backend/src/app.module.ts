import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  imports: [
    RedisModule.forRoot({
      config: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
