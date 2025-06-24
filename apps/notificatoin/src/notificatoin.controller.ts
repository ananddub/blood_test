import { Controller, Get } from '@nestjs/common';
import { NotificatoinService } from './notificatoin.service';

@Controller()
export class NotificatoinController {
  constructor(private readonly notificatoinService: NotificatoinService) {}

  @Get()
  getHello(): string {
    return this.notificatoinService.getHello();
  }
}
