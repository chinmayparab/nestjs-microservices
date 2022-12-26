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
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    console.log('reached');
    this.appService.handleUserCreated(data);
  }

  @EventPattern('anti')
  antipattern(id) {
    console.log('antiseptic', id);
  }

  @MessagePattern({ cmd: 'anToCo' })
  anToCo() {
    console.log('antoco success');
  }

  @EventPattern('coToAn')
  coToAn(sike) {
    console.log('sam-comms', sike);
    this.analyticsClient.send({ cmd: 'coToAn' }, sike);
    return 'progress';
  }
}
