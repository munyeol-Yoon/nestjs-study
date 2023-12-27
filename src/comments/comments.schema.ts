import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  }) // swagger 어떤 객체를 넘겨야 하는지
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats', // 어떤 도큐먼트랑 연결 할 건지
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
    required: true,
  })
  @Prop({
    default: 0,
  })
  @IsNumber()
  @IsPositive() // 음수가 될 수 없게
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상 (게시물, 정보글)',
    required: true,
  }) // swagger 어떤 객체를 넘겨야 하는지
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats', // 어떤 도큐먼트랑 연결 할 건지
  })
  @IsNotEmpty()
  info: Types.ObjectId; // 어떤 정보에 댓글을 썼는지
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
