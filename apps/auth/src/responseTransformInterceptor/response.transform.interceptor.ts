import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                console.error(
                    err?.message,
                    err?.stack,
                    'ResponseTransformInterceptor',
                );
                return of({
                    code: err?.code || 500,
                    message: err?.message || 'Internal Server Error',
                    data: null,
                });
            }),
        );
    }
}
