import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * NestFactory 는 create 메서드를 사용해 인스턴스를 생성한다. AppModule 을 인자로 받아, 애플리케이션의 모든 모듈, 컨트롤러, 서비스 등을 초기화하고 HTTP 서버를 설정
   * NestFactory 는 NestJS 애플리케이션의 생명주기를 관리하는 핵심 클래스로, 애플리케이션의 생성, 설정 및 실행을 책임진다.
   * create<T extends INestApplication = INestApplication>(module: any, options?: NestApplicationOptions): Promise<T>;
   * create<T extends INestApplication = INestApplication>(module: any, httpAdapter: AbstractHttpAdapter, options?: NestApplicationOptions): Promise<T>;
   * createMicroservice<T extends object>(moduleCls: any, options?: NestMicroserviceOptions & T): Promise<INestMicroservice>;
   */

  app.useGlobalPipes(new ValidationPipe()); // class validation 등록
  app.useGlobalFilters(new HttpExceptionFilter()); // 이 애플리케이션에 에러 필터링을 추가해 준다.

  /**
   * DocumentBuilder : swagger 문서의 설정을 구축하는데 사용
   * build : 설정을 완료하고 swagger 문서 설정 객체를 생성
   *
   * SwaggerModule.createDocument(app, config) :
   * SwaggerModule 의 createDocument 를 사용해 Swagger 문서를 생성한다.
   * OpenAPIObject : 생성된 swagger 문서의 타입 지정
   * SwaggerModule.setup() : Swagger UI 설정
   * 첫번째 인자 : swagger ui 가 호스팅될 경로
   * 두번째 인자 : 인스턴스
   * 세번째 인자 : 생성된 swagger 문서
   */
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true, // url
    credentials: true, // front 에서도 이 부분들 true 로
  });

  const PORT = process.env.PORT;

  await app.listen(PORT);
}
bootstrap();
