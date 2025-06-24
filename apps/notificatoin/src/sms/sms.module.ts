import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { REDISClient } from '@common/util/connection';
import { SmsController } from './sms.controller';

@Module({
    controllers: [SmsController],
    providers: [SmsService, REDISClient],
})
export class SmsModule {}
