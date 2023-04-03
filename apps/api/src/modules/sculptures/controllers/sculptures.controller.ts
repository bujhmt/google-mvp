import {BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Query} from '@nestjs/common';
import {Sculpture} from '@google-mvp/shared/model';
import {SculpturesService} from '../services';
import {CreateSculptureDto, GetSculpturesDto} from '../dto';
import {FiltersTransformer} from '../../elasticsearch/transformers';
import {BoolQueryBuilder} from '../../elasticsearch/query-builders';

@Controller('/sculptures')
export class SculpturesController {
    private readonly logger = new Logger('Query');
    private readonly filtersTransformer = new FiltersTransformer<Sculpture>();
    private readonly queryBuilder = new BoolQueryBuilder<Sculpture>();

    constructor(
        private readonly sculpturesService: SculpturesService,
    ) {
    }

    @Get('/')
    public getSculptures(@Query() {take, skip, filters}: GetSculpturesDto): Promise<[Sculpture[], number]> {
        const rules = this.filtersTransformer.transform(filters);
        const query = this.queryBuilder.getQuery(rules);
        this.logger.log(query);

        return this.sculpturesService.getSculptures(query, take, skip);
    }

    @Get('/:id')
    public async getSculptureById(@Param('id') id: string): Promise<Sculpture> {
        const sculpture = await this.sculpturesService.getSculptureById(id);

        if (!sculpture) {
            throw new BadRequestException('Sculpture not found!');
        }

        return sculpture;
    }

    @Post('/')
    public createSculpture(@Body() sculptureDto: CreateSculptureDto): Promise<string> {
        return this.sculpturesService.createSculpture(sculptureDto);
    }

    @Delete('/:id')
    public async deleteSculptureById(@Param('id') id: string): Promise<Sculpture> {
        const sculpture = await this.sculpturesService.getSculptureById(id);

        if (!sculpture) {
            throw new BadRequestException('Sculpture not found!');
        }

        await this.sculpturesService.deleteSculptureById(id);

        return sculpture;
    }
}
