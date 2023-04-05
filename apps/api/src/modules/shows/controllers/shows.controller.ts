import {BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Query} from '@nestjs/common';
import {Show} from '@google-mvp/shared/model';
import {ShowsService} from '../services';
import {CreateShowDto, GetShowsDto} from '../dto';
import {BoolQueryBuilder} from '../../elasticsearch/query-builders';

@Controller('/shows')
export class ShowsController {
    private readonly logger = new Logger('Query');
    private readonly queryBuilder = new BoolQueryBuilder<Show>();

    constructor(
        private readonly showsService: ShowsService,
    ) {
    }

    @Get('/')
    public getShows(@Query() {take, skip, filters}: GetShowsDto): Promise<[Show[], number]> {
        const query = this.queryBuilder.getQuery(filters);
        this.logger.log(query);

        return this.showsService.getShows(query, take, skip);
    }

    @Get('/:id')
    public async getShowById(@Param('id') id: string): Promise<Show> {
        const show = await this.showsService.getShowById(id);

        if (!show) {
            throw new BadRequestException('show not found!');
        }

        return show;
    }

    @Post('/')
    public async createShow(@Body() showDto: CreateShowDto): Promise<Show> {
        const id = await this.showsService.createShow(showDto);

        return this.showsService.getShowById(id);
    }

    @Delete('/:id')
    public async deleteShowById(@Param('id') id: string): Promise<Show> {
        const show = await this.showsService.getShowById(id);

        if (!show) {
            throw new BadRequestException('show not found!');
        }

        await this.showsService.deleteShowById(id);

        return show;
    }
}
