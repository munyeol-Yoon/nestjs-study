import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '532432',
    description: 'id',
  }) // swagger 어떤 객체를 넘겨야 하는지
  id: string;
}
