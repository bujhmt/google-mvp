import {Show} from '@google-mvp/shared/model';
import {IsArray, IsOptional} from 'class-validator';
import {PaginationDto} from './pagination.dto';
import {Filter} from '../../elasticsearch/interfaces';

export class GetShowsDto extends PaginationDto {
    @IsArray()
    @IsOptional()
    filters: Filter<Show>[] = [];
}
