import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      value.startTime = new Date(value.startTime);
      value.endTime = new Date(value.endTime);

      if (isNaN(value.startTime.getTime()) || isNaN(value.endTime.getTime())) {
        throw new BadRequestException('Invalid date format');
      }

      return value;
    } catch {
      throw new BadRequestException('Invalid date format');
    }
  }
}
