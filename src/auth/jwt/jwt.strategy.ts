import { CatsRepository } from 'src/cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * jwtFromRequest :
   * - JWT 추출 방법 지정
   * - ExtractJwt.fromAuthHeaderAsBearerToken() 은 HTTP 요청 헤더의 Bearer 토큰에서 JWT 를 추출
   * secretOrKey :
   * - 비밀키
   * ignoreExpiration :
   * - 이 옵션이 false 로 설정되면 만료된 토큰을 거부한다.
   */

  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  /**
   * JWT 의 페이로드가 유효한지 확인하는 메서드
   * 이 메서드는 인증된 사용자에 대한 정보를 반환하고 추후 요청 객체에서 사용할 수 있다.
   */
  async validate(payload: Payload) {
    // 디코딩된 payload 를 받는다.
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) {
      return cat; // request.user 안에 cat 이 들어가게 됨
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
