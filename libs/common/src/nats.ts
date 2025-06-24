import amqplib from 'amqplib';

const RABBITMQ_URL = 'amqp://user:password@localhost:5672'; // ya env se le
export async function publishToDLQ(
    queue: string,
    message: string,
    payload: any,
) {
    const conn = await amqplib.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();

    try {
        await channel.assertQueue(queue, { durable: true });

        const finalPayload = {
            message,
            payload,
            timestamp: new Date().toISOString(),
        };

        const messageBuffer = Buffer.from(JSON.stringify(finalPayload));
        channel.sendToQueue(queue, messageBuffer, { persistent: true });

        console.log(`✅ DLQ: [${queue}] ←`, finalPayload);
    } catch (err) {
        console.error(`❌ Failed to publish to DLQ [${queue}]:`, err);
    } finally {
        await channel.close();
        await conn.close();
    }
}
