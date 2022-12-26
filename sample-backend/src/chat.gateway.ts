import { OnModuleInit } from '@nestjs/common/interfaces/hooks';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AppService } from 'src/app.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnModuleInit {
  /**
   *
   */
  constructor(private readonly appService: AppService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('callMicroservice')
  getVehiclesOnLayoutID(@MessageBody() body: any): void {
    console.log(body);
    const response = this.appService.anti(body);
    this.server.emit('onMsc', {
      msg: 'New Message',
      content: response,
    });
    // return null;
  }
}
