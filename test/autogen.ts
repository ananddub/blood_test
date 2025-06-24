import { publishToDLQ } from '@common/nats';

publishToDLQ('notification', 'unknown', {
    phone: '1234567890',
    otp: '123456',
});
publishToDLQ('notification', 'otp-sent', {
    phone: '1234567890',
    otp: '123456',
});
