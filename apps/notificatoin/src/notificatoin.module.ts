import { Module } from '@nestjs/common';
import { NotificatoinController } from './notificatoin.controller';
import { NotificatoinService } from './notificatoin.service';
import { SmsModule } from './sms/sms.module';

@Module({
    imports: [SmsModule],
    controllers: [NotificatoinController],
    providers: [NotificatoinService],
})
export class NotificatoinModule {}
