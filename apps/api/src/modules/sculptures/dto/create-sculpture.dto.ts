import {IsNumber, IsOptional, IsString, MaxLength, Min, MinLength} from 'class-validator';

export class CreateSculptureDto {
    @IsString()
    @MinLength(1)
    @MaxLength(64)
    title: string;

    @IsString({each: true})
    authors: string[];

    @IsNumber()
    @Min(1)
    age: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    cost?: number;

    @IsString()
    @IsOptional()
    @MinLength(1)
    description?: string;

    @IsString()
    @IsOptional()
    @MinLength(1)
    history?: string;

    @IsString()
    @IsOptional()
    @MinLength(1)
    review?: string;
}
