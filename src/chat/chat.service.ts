import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private readonly logger = new Logger('ChatService');

  sendMessage(client: Socket, data: Object): void {
    try {
      console.log(client.rooms);
      if (!data['username']) return;

      if (client.data.roomid != 'lobby')
        client.to(client.data.roomid).emit('msgToClient', data);
    } catch (error) {
      this.logger.debug(error);
    }
  }
  enterRoom(client: Socket, data: object): void {
    try {
      client.rooms.clear();

      client.data.roomid = data['roomid'];
      client.join(data['roomid']);
      data['message'] = `"${data['username']}"님이 방에 입장하셨습니다. `;
      client.to(client.data.roomid).emit('enterRoom', data);
    } catch (error) {
      this.logger.debug(error);
    }
  }
  exitRoom(client: Socket, data: Object): void {
    try {
      client.to(client.data.roomid).emit('exitRoom', {
        username: data['username'],
        message: `"${data['username']}"님이 방에 나가셨습니다. `,
      });
      client.rooms.clear();
      client.leave(client.data.roomid);
      client.data.roomid = 'lobby';
      client.join(client.id);
    } catch (error) {
      this.logger.debug(error);
    }
  }
}
