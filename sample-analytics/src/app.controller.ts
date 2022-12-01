import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserEvent } from './create-user.event';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    const sike = { email: 'life' };
    this.communicationClient.emit('anti', sike);
    this.appService.handleUserCreated(data);
  }

  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics() {
    return this.appService.getAnalytics();
  }

  @EventPattern('anToCo')
  anToCo() {
    return this.communicationClient.send({ cmd: 'anToCo' }, {});
  }

  @MessagePattern({ cmd: 'coToAn' })
  coToAn(sike) {
    console.log({ cmd: 'coToAn' }, sike);
  }

  @EventPattern('anti')
  setAnti() {
    console.log('midsec');
    this.communicationClient.emit('anti', {});
  }
}
