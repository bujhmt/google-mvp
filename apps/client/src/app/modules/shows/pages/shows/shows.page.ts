import {Component, OnInit} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {firstValueFrom} from 'rxjs';
import {CreateShowPayload} from '../../payloads';
import {ShowsService} from '../../services';
import {ShowFormComponent} from '../../components';
import {Show} from '@google-mvp/shared/model';
import {FormBuilder, Validators} from '@angular/forms';
import {FilterMetadata} from 'primeng/api';

@Component({
    selector: 'sculptures-page',
    templateUrl: './shows.page.html',
    providers: [DialogService],
})
export class ShowsPage implements OnInit {
    public filtersForm = this.getFiltersForm();
    public shows: Show[] = [];
    public total = 0;

    constructor(
        private readonly dialogsService: DialogService,
        private readonly showsService: ShowsService,
        private readonly formBuilder: FormBuilder,
    ) {
    }

    async ngOnInit() {
        await this.fetchShows();
    }

    public async createShow() {
        const dialogRef = this.dialogsService.open(ShowFormComponent, {
            header: 'Create new Show',
            width: '60%',
            maximizable: true,
            dismissableMask: true,
        });

        const show: CreateShowPayload | void = await firstValueFrom(dialogRef.onClose);

        if (!show) {
            return;
        }

        const createdShow = await this.showsService.createShow(show);
        this.shows = [...this.shows, createdShow];
    }

    public async fetchShows() {
        const filtersMap = this.filtersForm.value;
        const filters: (FilterMetadata & { field: string })[] = [];

        if (filtersMap.name !== null) {
            filters.push({field: 'name', value: filtersMap.name, operator: 'and', matchMode: 'equals'});
        }

        if (filtersMap.fuzzyName !== null) {
            filters.push({field: 'name', value: filtersMap.fuzzyName, operator: 'and', matchMode: 'contains'});
        }

        if (filtersMap.costGte !== null) {
            filters.push({field: 'cost', value: filtersMap.costGte, operator: 'and', matchMode: 'gt'});
        }

        if (filtersMap.costLte !== null) {
            filters.push({field: 'cost', value: filtersMap.costLte, operator: 'and', matchMode: 'lt'});
        }

        if (filtersMap.dateAfter !== null) {
            filters.push({field: 'date', value: filtersMap.dateAfter, operator: 'and', matchMode: 'dateAfter'});
        }

        if (filtersMap.dateBefore !== null) {
            filters.push({field: 'date', value: filtersMap.dateBefore, operator: 'and', matchMode: 'dateBefore'});
        }

        if (filtersMap.actors !== null) {
            filters.push({field: 'actors', value: filtersMap.actors, operator: 'and', matchMode: 'in'});
        }

        if (filtersMap.description !== null) {
            filters.push({field: 'description', value: filtersMap.description, operator: 'and', matchMode: 'match'});
        }

        if (filtersMap.critics !== null) {
            filters.push({field: 'critics', value: filtersMap.critics, operator: 'and', matchMode: 'match'});
        }

        if (filtersMap.annotation !== null) {
            filters.push({field: 'annotation', value: filtersMap.annotation, operator: 'and', matchMode: 'match'});
        }

        const [shows, total] = await this.showsService.getShows({
            filters,
        });

        this.shows = shows;
        this.total = total;
    }


    public async resetFilters() {
        this.filtersForm = this.getFiltersForm();
        await this.fetchShows();
    }

    private getFiltersForm() {
        return this.formBuilder.group({
            name: [null, [Validators.minLength(1)]],
            fuzzyName: [null, [Validators.minLength(1)]],
            actors: [null, [Validators.minLength(1)]],
            costGte: [null, [Validators.min(0)]],
            costLte: [null, [Validators.min(0)]],
            dateAfter: [null],
            dateBefore: [null],
            critics: [null, [Validators.minLength(1)]],
            description: [null, [Validators.minLength(1)]],
            annotation: [null, [Validators.minLength(1)]],
        })
    }
}
