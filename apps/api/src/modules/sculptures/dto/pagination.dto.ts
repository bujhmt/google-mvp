import {IsNumber, IsOptional, Max, Min} from 'class-validator';
import {Transform} from 'class-transformer';

export class PaginationDto {
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Transform(({value}) => value && typeof value === 'string' ? parseInt(value, 10) : value)
    skip = 0;

    @IsNumber()
    @Min(0)
    @Max(1000)
    @IsOptional()
    @Transform(({value}) => value && typeof value === 'string' ? parseInt(value, 10) : value)
    take = 10;
}
