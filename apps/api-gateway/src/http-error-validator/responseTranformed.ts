import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();

        return next.handle().pipe(
            map((data) => {
                if (!data.code) {
                    console.log('code not implemented');
                    response.status(500); // yeh HTTP status code set kar raha hai
                    return {
                        code: 500,
                        message: 'Internal Server Error Code Not Implemented',
                        data: data,
                    };
                }

                response.status(data.code); // yeh bhi actual status code set karega
                return {
                    code: data.code,
                    message: data.message,
                    data: data.data,
                };
            }),
            catchError((err) => {
                const statusCode = err?.status || 500;
                response.status(statusCode);
                return of({
                    code: statusCode,
                    message: err?.message || 'Internal Server Error',
                    data: null,
                });
            }),
        );
    }
}
