import {Sculpture} from '@google-mvp/shared/model';
import {IsObject, IsOptional} from 'class-validator';
import {PaginationDto} from './pagination.dto';
import {Filter} from '../../elasticsearch/interfaces';

export class GetSculpturesDto extends PaginationDto {
    @IsObject()
    @IsOptional()
    filters?: Record<string, Filter<Sculpture>[]>;
}
