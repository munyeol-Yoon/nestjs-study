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

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
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
  };
});
