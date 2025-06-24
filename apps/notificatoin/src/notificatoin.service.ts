import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificatoinService {
  getHello(): string {
    return 'Hello World!';
  }
}
