import { TDto } from 'src/types/dtoType.type';

export interface IHandler<R extends TDto, T = void> {
  handle(dto: R): Promise<T>;
}
