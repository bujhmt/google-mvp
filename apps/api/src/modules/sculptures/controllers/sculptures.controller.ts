import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {Sculpture} from '@google-mvp/shared/model';
import {SculpturesService} from '../services';
import {CreateSculptureDto, GetSculpturesDto} from '../dto';

@Controller('/sculptures')
export class SculpturesController {
    constructor(
        private readonly sculpturesService: SculpturesService,
    ) {
    }

    @Get('/')
    public async getSculptures(@Query() {take, skip}: GetSculpturesDto): Promise<[Sculpture[], number]> {
        const [sculptures, total] = await this.sculpturesService.getSculptures(take, skip);

        return [sculptures, total];
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
