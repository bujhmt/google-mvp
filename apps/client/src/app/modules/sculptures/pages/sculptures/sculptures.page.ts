import {Component, ViewChild} from '@angular/core';
import {FlexTable, FlexTableConfig} from '@google-mvp/client/ui-flex-table';
import {Sculpture} from '@google-mvp/shared/model';
import {DialogService} from 'primeng/dynamicdialog';
import {SculptureFormComponent} from '../../components';
import {firstValueFrom} from 'rxjs';
import {CreateSculpturePayload} from '../../payloads';
import {SculpturesService} from '../../services';

@Component({
    selector: 'sculptures-page',
    templateUrl: './sculptures.page.html',
    providers: [DialogService],
})
export class SculpturesPage {
    @ViewChild('sculpturesTable') private readonly sculpturesTable: FlexTable<Sculpture>;

    public sculpturesFlexTableConfig: FlexTableConfig<Sculpture> = {
        selection: false,
        caption: false,
        dataKey: 'id',
        stateKey: 'sculptures',
        stateStorage: 'local',
        columnResizeMode: 'fit',
        columns: [
            {
                field: 'title',
                header: 'Title',
                filterType: 'text',
                frozen: false,
            },
            {
                field: 'age',
                header: 'Age',
                filterType: 'numeric',
                frozen: false,
            },
            {
                field: 'authors',
                header: 'Authors',
                filterType: 'text',
                filterMatchMode: 'in',
                filterShowOperator: false,
                filterShowAddButton: false,
                filterShowMatchModes: false,
                frozen: false,
            },
            {
                field: 'description',
                header: 'Description',
                filterType: 'text',
                frozen: false,
            },
            {
                field: 'cost',
                header: 'Cost',
                filterType: 'numeric',
                frozen: false,
            },
            {
                field: 'createdAt',
                header: 'Create Date',
                filterType: 'date',
                frozen: false,
            },
        ],
        loader: async ({first, rows}) => {
            const [sculptures, total] = await this.sculpturesService.getSculptures({
                skip: first,
                take: rows,
            })


            return [sculptures, total];
        }
    }

    constructor(
        private readonly dialogsService: DialogService,
        private readonly sculpturesService: SculpturesService,
    ) {
    }

    public async createSculpture() {
        const dialogRef = this.dialogsService.open(SculptureFormComponent, {
            header: 'Create new Sculpture',
            width: '90%',
            maximizable: true,
            dismissableMask: true,
        });

        const sculpture: CreateSculpturePayload | void = await firstValueFrom(dialogRef.onClose);

        if (!sculpture) {
            return;
        }

        await this.sculpturesService.createSculpture(sculpture);
        await this.sculpturesTable.refresh();
    }
}
