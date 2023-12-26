import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
/**
 * JwtAuthGuard 는 AuthGuard 를 확장하고 특정 라우트에 대한 접근 제어를 담당한다.
 *
 * AuthGuard('jwt') 는 jwt 전략을 사용해 인증을 처리한다. 이는 JwtStrategy 를 사용하겠다는 의미
 * JwtAuthGuard 는 데코레이터로서 사용되고 특정 라우트(또는 컨트롤러)에 적용된다.
 *
 * 이 가드가 적용된 라우트에 대한 요청은 JwtStrategy 를 통해 인증되어야 한다.
 */

/**
 * 동작 과정
 * 1. 클라이언트는 HTTP 요청과 함께 JWT 를 Authorization 헤더에 포함시켜 서버에 보낸다.
 * 2. 요청이 들어오는 라우트에 JwtAuthGuard 가 적용되어 있다면, JwtStrategy 가 요청을 가로챈다.
 * 3. JwtStrategy 는 요청 헤더에서 JWT 를 추출하고, 설정된 비밀키를 사용해 토큰의 유효성을 검증한다.
 * 4. 토큰이 유효한 경우 validate 메서드를 호출한다. 이 메서드는 페이로드를 사용해 사용자 정보를 확인하고 유효한 사용자 정보를 request.user 에 설정한다.
 * 5. JwtAuthGuard 가 성공적으로 인증을 마치면, 요청은 해당 라우트의 핸들러로 이동한다. 이 때 request.user는 인증된 사용자의 정보를 포함한다.
 *
 */
