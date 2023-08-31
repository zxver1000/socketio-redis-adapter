import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  providers: [ChatGateway, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
