import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { SocketIoAdapter } from './socketIOAdaptor';
import { RedisIoAdapter } from './redisAdapter';
class Application {
  static instance: Application;
  private PORT: string;

  constructor(private server: NestExpressApplication) {
    if (Application.instance) return Application.instance;
    this.server = server;
    this.PORT = process.env.PORT || '3081';
    Application.instance = this;
  }

  async setMiddleware() {
    this.server.useWebSocketAdapter(new RedisIoAdapter(this.server));
    this.server.useStaticAssets(join(__dirname, '..', 'public'));
    this.server.setBaseViewsDir(join(__dirname, '..', 'views'));
    this.server.setViewEngine('hbs');
  }

  async bootstrap() {
    this.server.enableCors();
    this.setMiddleware();
    await this.server.listen(this.PORT);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);

  await app.bootstrap();
}

init().catch((error) => {
  new Logger('init').error(error);
});
