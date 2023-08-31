import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import { INestApplication } from '@nestjs/common';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server, ServerOptions } from 'socket.io';
export class SocketIoAdapter extends IoAdapter {
  static instance: SocketIoAdapter;
  protected redisAdapter;
  constructor(app: INestApplication) {
    if (SocketIoAdapter.instance) return SocketIoAdapter.instance;

    super(app);
    //  const configService = app.get(ConfigurationService);
    const pubClient = createClient({
      legacyMode: true,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    const subClient = pubClient.duplicate();

    pubClient.connect().catch(console.error);
    subClient.connect().catch(console.error);

    this.redisAdapter = createAdapter(pubClient, subClient);
    SocketIoAdapter.instance = this;
  }

  static getinstance() {
    return this.instance;
  }

  async createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options) as Server;

    /*
    const article = {
      id: '123456',
      name: 'Using Redis Pub/Sub with Node.js',
      blog: 'Logrocket Blog',
    };
    await this.pub.publish('받아', JSON.stringify(article));
    await this.sub.subscribe('받아', (me) => {
      console.log('매세지왓나용');
      console.log(me);
    });
     */
    server.adapter(this.redisAdapter);

    return server;
  }
}
