import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
/* 
requirement
1. client당 방은 하나만 들어갈 수 있음.


*/
@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private static readonly logger = new Logger(ChatGateway.name);
  constructor(private readonly ChatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new_user')
  async helloMessage(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('메세지받나요?');
    console.log(username);

    console.log('--');
    //console.log(client.);
    //client.join('hihi2');
    //socket io adpater를 달시 rooms 확인가능!! 근데 필요없음
    //console.log(this.server.sockets.adapter.rooms.get('hihi'));
    //console.log(this.server.sockets.adapter);
    var s = {
      안녕: 'ㅇㅇ',
      dd: '9000',
    };

    //   this.server.emit('hello_user', username + ' 슈웃');
  }

  afterInit() {
    ChatGateway.logger.debug(`Socket Server Init Complete`);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    ChatGateway.logger.debug(
      `${client.id}(${client.handshake.query['username']}) is connected!`,
    );

    client.data.roomid = 'lobby';
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    ChatGateway.logger.debug(`${client.id} is disconnected...`);
  }

  /*
    msgToserver Require 
    1. username
  */
  @SubscribeMessage('msgToServer')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { username: string; message?: string; imageurl?: string },
  ): void {
    this.ChatService.sendMessage(client, payload);
  }

  /*
    enterRoom Require 
    1. roomid
  */
  @SubscribeMessage('enterRoom')
  enterRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomid: string },
  ) {
    //룸아이디받으면끝!
    console.log('방입장');
    console.log(payload);

    this.ChatService.enterRoom(client, payload);
  }

  /*
    exitRoom Require 
    1. roomid
    2. username
  */
  @SubscribeMessage('exitRoom')
  async exitRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { username: string; roomid: string },
  ) {
    console.log('방퇴장 lobby');
    this.ChatService.exitRoom(client, payload);
  }
}
