import { Module } from '@nestjs/common';
import { SharedreadserviceController } from './sharedreadservice.controller';
import { SharedreadserviceService } from './sharedreadservice.service';

@Module({
  imports: [],
  controllers: [SharedreadserviceController],
  providers: [SharedreadserviceService],
})
export class SharedreadserviceModule {}
