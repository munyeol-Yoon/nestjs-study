import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}
  /**
   * mongoose 의존성 주입
   * @InjectModel 데코레이터는 해당 모델을 주입하기 위해 사용한다.
   * Cat.name 은 Cat 클래스의 이름을 동적으로 참조한다. 이는 Cat 모델을 주입할 provider 와 토큰을 지정한다.
   * private : 프로퍼티가 클래스 내부에서만 접근 가능함을 의미
   * readonly : 프로퍼티가 생성 후에 수정될 수 없음을 나타낸다.
   * Model<Cat> : mongoose 의 Model 인터페이스를 사용해 Cat 타입의 문서를 나타낸다. mongoose 모델의 메서드(find, save 등)에 접근 할 수 있다.
   */

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당 고양이는 이미 존재합니다.');
      //   throw new HttpException('해당 고양이는 이미 존재합니다.', 403); // 위와 같다.
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
