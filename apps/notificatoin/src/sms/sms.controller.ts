import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SmsService } from './sms.service';
import { RMQ_EVENT } from '@common/util/queyeNames';

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}
    @EventPattern()
    async handleAnyEvent(@Payload() data: any) {
        console.log('Any:', {
            data,
        });
    }

    @EventPattern(RMQ_EVENT.OTP_SENT)
    async handleOtp(@Payload() data: any) {
        try {
            console.log('📨 OTP:', data);
            await this.smsService.sendOtp(data.phone);
        } catch (e) {
            // await publishToDLQ('dlq-otp-sent', data);
        }
    }

    @EventPattern(RMQ_EVENT.NOTIFICATION_SENT)
    async handleNotification(@Payload() data: any) {
        try {
            console.log('🔔 Notification:', data);
        } catch (e) {
            // await publishToDLQ('dlq-sms-send', data);
        }
    }

    @EventPattern(RMQ_EVENT.PAYMENT_INITIATED)
    async handlePaymentStart(@Payload() data: any) {
        try {
            console.log('💰 Payment Start:', data);
        } catch (e) {
            // await publishToDLQ('dlq-payment-initiated', data);
        }
    }

    @EventPattern(RMQ_EVENT.PAYMENT_COMPLETED)
    async handlePaymentSuccess(@Payload() data: any) {
        try {
            console.log('✅ Payment Completed:', data);
        } catch (e) {
            // await publishToDLQ('dlq-payment-completed', data);
        }
    }

    @EventPattern(RMQ_EVENT.PAYMENT_FAILED)
    async handlePaymentFail(@Payload() data: any) {
        console.log('❌ Payment Failed:', data);
    }

    @EventPattern(RMQ_EVENT.USER_REGISTERED_PENDING)
    async handleUserRegister(@Payload() data: any) {
        try {
            console.log('🧑 User Registered:', data);
        } catch (e) {
            // await publishToDLQ('dlq-user-registered-pending', data);
        }
    }

    @EventPattern(RMQ_EVENT.USER_VERIFIED)
    async handleUserVerified(@Payload() data: any) {
        console.log('🆗 User Verified:', data);
    }

    @EventPattern(RMQ_EVENT.USER_UPDATED)
    async handleUserUpdated(@Payload() data: any) {
        console.log('🔄 User Updated:', data);
    }

    @EventPattern(RMQ_EVENT.USER_ROLLBACK)
    async handleUserRollback(@Payload() data: any) {
        console.log('↩️ User Rollback:', data);
    }

    @EventPattern(RMQ_EVENT.LAB_REGISTERED)
    async handleLabRegistered(@Payload() data: any) {
        console.log('🏥 Lab Registered:', data);
    }

    @EventPattern(RMQ_EVENT.LAB_APPROVED)
    async handleLabApproved(@Payload() data: any) {
        console.log('✅ Lab Approved:', data);
    }

    @EventPattern(RMQ_EVENT.TEST_BOOKED)
    async handleTestBooked(@Payload() data: any) {
        console.log('📅 Test Booked:', data);
    }

    @EventPattern(RMQ_EVENT.TEST_STATUS_UPDATED)
    async handleTestStatus(@Payload() data: any) {
        console.log('📊 Test Status Updated:', data);
    }

    @EventPattern(RMQ_EVENT.TEST_CANCELLED)
    async handleTestCancelled(@Payload() data: any) {
        console.log('❌ Test Cancelled:', data);
    }

    @EventPattern(RMQ_EVENT.REPORT_UPLOADED)
    async handleReport(@Payload() data: any) {
        try {
            console.log('📄 Report Uploaded:', data);
        } catch (e) {
            // await publishToDLQ('dlq-report-uploaded', data);
        }
    }

    @EventPattern(RMQ_EVENT.AUDIT_LOGGED)
    async handleAuditLog(@Payload() data: any) {
        console.log('📜 Audit Logged:', data);
    }

    @EventPattern(RMQ_EVENT.REVIEW_SUBMITTED)
    async handleReview(@Payload() data: any) {
        console.log('⭐ Review Submitted:', data);
    }

    @EventPattern(RMQ_EVENT.DOCUMENT_UPLOADED)
    async handleDocument(@Payload() data: any) {
        console.log('📁 Document Uploaded:', data);
    }

    @EventPattern(RMQ_EVENT.PROMO_CREATED)
    async handlePromo(@Payload() data: any) {
        console.log('🎁 Promo Created:', data);
    }

    @EventPattern(RMQ_EVENT.CONFIG_UPDATED)
    async handleConfigUpdate(@Payload() data: any) {
        console.log('⚙️ Config Updated:', data);
    }
}
