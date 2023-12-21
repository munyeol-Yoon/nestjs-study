import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // HttpException 을 잡아서 해당 필터에서 처리하도록 한다.
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * catch 메서드는 예외 필터에서 예외를 처리하는 메서드이다.
   * exception : 어떤 예외를 처리할 것인지
   * host : 요청의 컨텍스트 정보에 접근할 수 있게 한다.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // HTTP 특정 컨텍스트를 가져온다.
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // as 는 TS 의 타입 캐스팅, 이를 통해 반환된 값이 특정 타입임을 명시적으로 선언한다.
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };
    /**
     * 에러가 두가지 유형일 수 있다. 문자열 or 객체
     */

    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}
