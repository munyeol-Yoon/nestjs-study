import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // LoggerMiddleware 클래스를 정의하고 NestMiddleware 인터페이스 구현

  /**
   * Logger 는 NestJS 가 제공하는 로깅 서비스
   * 애플리케이션 내에서 메시지를 로깅하는데 사용된다.
   * 이 클래스는 다양한 로깅레벨을 제공한다. (log, error, warn 등등)
   * */
  private logger = new Logger('HTTP');

  /**
   * 인터페이스의 use 메서드 구현, 이 메서드는 HTTP 요청 처리 파이프라인의 일부이다. 각 요청이 라우트 핸들러에 도달하기 전에 실행된다.
   */
  use(req: Request, res: Response, next: NextFunction) {
    /**
     * res.on
     * res 객체는 HTTP 응답을 나타낸다.
     * on 메서드는 이벤트 리스너를 추가하는 메서드이다. 이 메서드를 사용해 특정 이벤트가 발생했을 때 실행할 콜백 함수를 등록할 수 있다.
     * on 메서드는 첫 번째 매개변수로 이벤트 이름을 받고, 두 번째 매개변수로 해당 이벤트가 발생했을 때 실행할 콜백 함수를 받는다.
     * 'finish' 이벤트는 HTTP 응답이 완전히 전송되고 종료되었을 때 발생한다. 즉, 응답 데이터가 클라이언트에게 전달되고 응답 과정이 끝났을 때 이 이벤트가 트리거 된다.
     */

    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });

    next(); // next 함수 호출을 통해 요청 처리 파이프라인을 게속 진행
  }
}
