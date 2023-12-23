import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';

// Module 데코레이터는 애플리케이션의 구조를 정의하는데 사용된다.
/**
 * imports : 다른 모듈들을 현재 모듈로 가져온다. imports 배열에 포함된 모듈들은 현재 모듈에서 사용할 수 있게 된다. -> 모듈간 의존성 관리
 * controllers : 현재 모듈에서 사용할 컨트롤러를 정의
 * providers : 현재 모듈에서 사용할 서비스나 프로바이더를 정의, 서비스는 비즈니스 로직을 수행하며 프로바이더는 다양한 기능을 제공할 수 있는 더 광범위한 개념
 * exports : 모듈에서 제공하는 프로바이더의 일부를 외부에 공개한다. 이를 사용하면 다른 모듈이 이 프로바이더를 사용할 수 있게 된다. -> 주로 재사용 가능한 로직을 다른 모듈과 공유할 때 사용(캡슐화)
 * global : 모듈을 글로벌 모듈로 만든다. 글로벌 모듈로 설정된 모듈은 애플리케이션의 모든 곳에서 가져올 필요 없이 사용할 수 있다. -> 공통적으로 사용되는 기능을 전역적으로 제공할 때 사용
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

/**
 * @Module 데코레이터에는 미들웨어를 위한 장소가 없다.
 * 대신 configure() 모듈 클래스의 메서드를 사용해 설정한다.
 * 미들웨어를 포함하는 모듈은 NestModule 인터페이스를 구현해야한다.
 * .apply 를 호출해 미들웨어를 활성화하고 .forRoutes 를 통해 'cats' 경로에 대한 요청에만 미들웨어를 적용한다.
 */
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    mongoose.set('debug', this.isDev); // mongoose 로그
  }
}
