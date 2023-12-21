import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
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
  getAllCat() {
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
