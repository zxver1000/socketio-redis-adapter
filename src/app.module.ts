import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    //  MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot({ isGlobal: true }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
