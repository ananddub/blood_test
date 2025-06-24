import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedreadserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
