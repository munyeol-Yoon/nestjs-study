import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter) // 해당 컨트롤러에서 전달된 에러가 filter 로 처리된다.
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}

// export class CatsController {
//   constructor(private readonly catsService: CatsService) {}
//   /**
//    * private readonly catsService: CatsService;
//    *
//    * constructor(){
//    *  this.catsService = new CatsService();
//    * }
//    *
//    * 이렇게 인스턴스를 직접 생성할 수도 있다. 하지만 이는 결합도가 증가하고, 유닛테스트가 어려우며, 유연성과 재사용성이 떨어진다.
//    *
//    */

//   @Get()
//   // @UseFilters(HttpExceptionFilter) // 해당 라우터에서 전달된 에러가 filter 로 처리된다.
//   getAllCat() {
//     // 기본 에러 처리
//     // throw new HttpException('api is broken', 401);
//     // 커스텀
//     // throw new HttpException({ success: false, message: 'api is broken' }, 401);
//     // 다른곳에서도 비슷한 예외처리를 한다면 반복되고 비효율적이다. 재사용성을 고려해 필터링을 거쳐 리스폰스로 반환해주는 형식으로 만들 수 있다.
//     return { cats: 'all cat' };
//   }

//   @Get(':id')
//   getOneCat(@Param('id', ParseIntPipe) param: number) {
//     /**
//      * 기본적으로 param 은 string 으로 전달된다.
//      * id 를 number 타입으로 쓸 때가 많은데 이를 바꿔주는 것을 pipe를 통해 해결할 수 있다. -> @Param('id', ParseIntPipe) param
//      * https://docs.nestjs.com/pipes
//      */
//     console.log(param);
//     console.log(typeof param); // string
//     return 'one cat';
//   }

//   @Post()
//   createCat() {
//     return 'create cat';
//   }

//   @Put(':id')
//   updateCat() {
//     return 'update cat';
//   }

//   @Patch(':id')
//   updatePartialCat() {
//     return 'update';
//   }

//   @Delete(':id')
//   deleteCat() {
//     return 'delete cat';
//   }
// }
