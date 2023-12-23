import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

/**
 * interceptor
 * NestJS 에서 인터셉터는 컨트롤러 핸들러의 실행 전 후에 특정 로직을 추가하는데 사용된다
 * 이를 통해 메서드 실행 전후의 추가 작업, 변환, 예외처리 등을 수행할 수 있다.
 */

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    /**
     * context : 요청의 실행 컨텍스트를 제공, 요청에 대한 세부 정보에 접근할 수 있다.
     * next : CallHandler 인스턴스로, 컨트롤러 핸들러를 실행한다. next.handle() 을 호출해 핸들러의 로직을 계속 진행 할 수 있다.
     */

    console.log('Before...'); // pre-controller

    // const now = Date.now();

    // return next
    //   .handle()
    //   .pipe(tap(() => console.log(`After ${Date.now() - now}ms`))); // post-request

    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    ); // data -> response 에 대한 인자를 받는다.

    /**
     * pipe : RxJS 의 Observable 에서 여러 연산자를 연결하는 방법을 제공한다.
     * tap : Observable 의 값을 사용해 부수 효과를 생성하는 연산자, 지금 코드는 로그를 출력하는데 사용되고 있음
     */
  }
}

/**
 * 인터셉터는 애플리케이션의 성능 모니터링, 로깅, 데이터 변환 등 다양한 목적으로 사용할 수 있다.
 * NestJS 인터셉터는 AOP(Aspect-Oriented Programming) 패러다임을 구현하며, 애플리케이션의 유연성과 재사용성을 높여준다.
 */
