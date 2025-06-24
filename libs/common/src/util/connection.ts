import {
    ClientProviderOptions,
    ClientsModule,
    RmqOptions,
    Transport,
} from '@nestjs/microservices';
import { RABITMQ_URL } from 'apps/notificatoin/src/constant';
import { MicroServiceClient, REDIS_NAME } from '@common/micro.constant';
import Redis from 'ioredis';
import { RMQ_SERVICE_NAME } from './queyeNames';

export const RMQClient: RmqOptions & ClientProviderOptions = {
    name: RMQ_SERVICE_NAME,
    transport: Transport.RMQ,
    options: {
        urls: [RABITMQ_URL],
        queue: MicroServiceClient.NOTIFICATION_CLIENT,
        prefetchCount: 1,
        queueOptions: {
            durable: true,
        },
    },
};

export const REDISClient = {
    provide: REDIS_NAME,
    useFactory: () => {
        return new Redis({
            host: 'localhost',
            port: 6379,
            password: '',
        });
    },
};
