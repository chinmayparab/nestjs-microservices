import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMUNICATION',
        transport: Transport.TCP,
      },
      {
        name: 'ANALYTICS',
        transport: Transport.TCP,
        options: { port: 7002 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
