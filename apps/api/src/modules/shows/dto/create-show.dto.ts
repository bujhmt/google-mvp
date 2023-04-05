import {IsDate, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreateShowDto {
    @IsString()
    @MinLength(1)
    @MaxLength(64)
    name: string;

    @IsString({each: true})
    actors: string[];

    @IsDate()
    @IsOptional()
    @Transform(({value}) => typeof value === 'string' ? new Date(value) : value)
    date?: Date;

    @IsNumber()
    @Min(0)
    cost: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    critics?: string;

    @IsString()
    @IsOptional()
    annotation?: string;
}
