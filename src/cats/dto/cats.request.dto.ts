/**
 * DTO 는 계층간 데이터 교환을 위한 객체이다.
 * DB 에서 데이터를 얻어 service 나 controller 등으로 보낼 때 사용하는 객체
 * request 와 response 용 DTO 는 view 를 위한 클래스이다.
 */

import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// 클래스로 사용해야 데코레이터 패턴을 적용할 수 있고 상속 등 재사용성을 증가 시킬 수 있다.
export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
