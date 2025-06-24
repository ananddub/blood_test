import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpErrorValidatorMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: () => void) {
        try {
            res.setHeader('Content-Type', 'application/json');
            const data: any = await next();
            if (!data.status) {
                console.log('status not implemented');
                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error Status Not Implemented',
                    data: data,
                });
                return;
            }
            console.log('your data is ', data);
            res.status(data.status).json(data);
            return;
        } catch (e) {
            res.status(e.status || 500).json({
                status: e.status || 500,
                message: e.message || 'Internal Server Error',
                data: null,
            });
        }
    }
}
