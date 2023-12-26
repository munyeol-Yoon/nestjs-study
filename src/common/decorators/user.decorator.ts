import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
/**
 * createParamDecorator 를 통해 커스텀 데코레이터를 생성한다.
 *
 * data
 * - 데코레이터에 추가적인 정보를 제공할 때 사용된다.
 * ctx
 * - 현재 실행되고 있는 요청의 컨텍스트 이다.
 * - 요청, 응답 객체 등을 가져올 수 있다.
 * - ctx.switchToHttp().getRequest() 는 HTTP 요청에 관한 정보를 담고 있는 객체를 가져온다. 헤더, 쿼리 파라미터, 바디데이터, 인증된 사용자 정보 등이 포함된다.
 * return request.user
 * - 요청 객체에 포함된 user 프로퍼티를 반환한다. 일반적으로 user 객체는 passport JWT 인증에서 설정된다.
 */
