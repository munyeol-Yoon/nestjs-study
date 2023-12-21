import {
  Controller,
  Delete,
  Get,
  HttpException,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // 해당 컨트롤러에서 전달된 에러가 filter 로 처리된다.
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  /**
   * private readonly catsService: CatsService;
   *
   * constructor(){
   *  this.catsService = new CatsService();
   * }
   *
   * 이렇게 인스턴스를 직접 생성할 수도 있다. 하지만 이는 결합도가 증가하고, 유닛테스트가 어려우며, 유연성과 재사용성이 떨어진다.
   *
   */

  @Get()
  // @UseFilters(HttpExceptionFilter) // 해당 라우터에서 전달된 에러가 filter 로 처리된다.
  getAllCat() {
    // 기본 에러 처리
    throw new HttpException('api is broken', 401);
    // 커스텀
    // throw new HttpException({ success: false, message: 'api is broken' }, 401);
    // 다른곳에서도 비슷한 예외처리를 한다면 반복되고 비효율적이다. 재사용성을 고려해 필터링을 거쳐 리스폰스로 반환해주는 형식으로 만들 수 있다.
    return 'all cat';
  }

  @Get(':id')
  getOneCat() {
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
