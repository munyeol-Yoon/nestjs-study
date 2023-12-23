import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'gmakin36@gmail.com',
    description: 'email',
    required: true,
  }) // swagger 어떤 객체를 넘겨야 하는지
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'munyeol',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Qwer123$',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'data:image/jpeg;base64,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',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

/**
 * mongoose 스키마의 가상 필드 정의
 * Cat 모델의 인스턴스에서 특정 데이터를 선택적으로 노출시키는데 사용한다.
 * virtual : CatSchema 에 readOnlyData 라는 가상 필드를 정의
 * get function : 가상 필드의 값은 get 함수를 통해 결정된다. 이 함수는 Cat 인스턴스의 컨텍스트인 this 에서 호출된다.
 *
 * 데이터 캡슐화 및 가공에 사용된다. 사용자에게 노출하고 싶은 특정 필드만을 선택적으로 반환한다.
 * 복잡한 연산을 수행할때도 사용된다. 계산이 필요한 필드나 다른 필드의 값을 기반으로 한 동적인 값을 생성할 때 사용될 수 있다.
 */
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
