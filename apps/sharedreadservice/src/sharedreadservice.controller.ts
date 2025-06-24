import { Controller, Get } from '@nestjs/common';
import { SharedreadserviceService } from './sharedreadservice.service';

@Controller()
export class SharedreadserviceController {
  constructor(private readonly sharedreadserviceService: SharedreadserviceService) {}

  @Get()
  getHello(): string {
    return this.sharedreadserviceService.getHello();
  }
}
