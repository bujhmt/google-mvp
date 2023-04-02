import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Injector,
    Input, OnChanges,
    OnInit,
    Optional,
    Output,
    QueryList, SimpleChanges,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {Table, TableService} from 'primeng/table';
import {LazyLoadEvent, MenuItem, PrimeIcons} from 'primeng/api';
import {FlexTableColumn, FlexTableConfig} from '../../interfaces';
import {FlexTableCellDirective, FlexTableHeadDirective} from '../../directives';

const DEFAULT_ROWS_PER_PAGE = 100;
const MAX_ROWS_PER_PAGE = 1000;

@Component({
    selector: 'flex-table',
    templateUrl: './flex-table.component.html',
    styleUrls: ['./flex-table.component.scss'],
})
export class FlexTable<TEntity extends Record<string, any>> implements
    OnInit,
    OnChanges,
    AfterViewInit,
    AfterContentInit {
    @Input() config: FlexTableConfig<TEntity>;

    @Input() @Optional() entities: TEntity[] = [];
    @Output() entitiesChange = new EventEmitter<TEntity[]>();

    @Input() @Optional() total = 0;
    @Output() totalChange = new EventEmitter<number>();

    @Input() @Optional() selected: TEntity[] = [];
    @Output() selectedChange = new EventEmitter<TEntity[]>();

    @Input() @Optional() contextMenu: MenuItem[] = [];
    @Output() contextMenuChange = new EventEmitter<MenuItem[]>();

    @Input() @Optional() loading = false;
    @Input() @Optional() scrollHeight?: string;

    public selectedColumns: FlexTableColumn<keyof TEntity>[] = [];
    public rows = DEFAULT_ROWS_PER_PAGE;
    public frozenColumnsMap: Record<string, boolean> = {};
    public rowsPerPageOptions: number[] = [];
    public resetMenuContext: MenuItem[] = [
        {
            label: 'Reset Settings',
            icon: PrimeIcons.REFRESH,
            command: () => {
                this.table.clear();
                this.table.reset();
                this.table.clearState();
            },
        },
    ];

    public headsTemplatesMap: Record<string, TemplateRef<any>> = {};
    public cellsTemplatesMap: Record<string, TemplateRef<any>> = {};
    public templateTableInjector: Injector;

    @ViewChild('table', {static: true}) private readonly table: Table;
    @ContentChildren(FlexTableCellDirective) customCellsTemplates: QueryList<FlexTableCellDirective>;
    @ContentChildren(FlexTableHeadDirective) customHeadsTemplates: QueryList<FlexTableHeadDirective>;

    constructor(
         private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        if (!this.config) {
            throw new Error('Flex Table Config wasn\'t provided!');
        }

        const {rowsPerPage, maxRowsPerPage, columns} = this.config;

        this.selectedColumns = columns;
        this.rows = rowsPerPage || DEFAULT_ROWS_PER_PAGE;
        this.rowsPerPageOptions = this.getRowsPerPageSteps(
            this.rows,
            maxRowsPerPage ? Math.min(maxRowsPerPage, MAX_ROWS_PER_PAGE) : MAX_ROWS_PER_PAGE,
        );
    }

    ngOnChanges({selected}: SimpleChanges) {
        if (selected && !selected.isFirstChange()) {
            this.updateContextMenu();
        }
    }

    ngAfterViewInit() {
        this.changeDetectorRef.detectChanges();
    }

    ngAfterContentInit() {
        this.templateTableInjector = Injector.create({
            providers: [
                {
                    provide: Table,
                    useValue: this.table,
                },
                {
                    provide: TableService,
                    useValue: this.table.tableService,
                },
            ],
        });

        for (const {field, template} of this.customHeadsTemplates) {
            this.headsTemplatesMap[field] = template;
        }

        for (const {field, template} of this.customCellsTemplates) {
            this.cellsTemplatesMap[field] = template;
        }
    }

    public async loadData(event: LazyLoadEvent) {
        if (this.loading || !this.config.loader) {
            return;
        }

        try {
            this.loading = true;
            const data = await this.config.loader(event);

            const [entities, total] = data;

            this.entities = entities;
            this.entitiesChange.emit(entities);

            this.total = total || entities.length;
            this.totalChange.emit(this.total);

            return this.updateContextMenu();
        } catch {
            this.table.clearState();
        } finally {
            this.loading = false;
        }
    }

    public refresh() {
        return this.loadData(
            this.table.createLazyLoadMetadata(),
        );
    }

    public toggleColumnFroze(column: string) {
        this.frozenColumnsMap = {
            ...this.frozenColumnsMap,
            [column]: !this.frozenColumnsMap[column],
        };
    }

    public reset() {
        this.table.reset();
        this.selected = [];
        this.table.selection = [];
        this.table.saveState();
    }

    public setSelectedColumns(columns: FlexTableColumn<keyof TEntity>[]) {
        this.selectedColumns = this.config.columns.filter((column) => columns.includes(column));
    }

    public selectRow(entity: TEntity) {
        this.selected = this.selected.length > 1 ? [...this.selected, entity] : [entity];
        this.selectedChange.emit(this.selected);
        return this.updateContextMenu();
    }

    public async updateContextMenu() {
        if (!this.config.contextGenerator) {
            return;
        }

        const loadMetadata = this.table.createLazyLoadMetadata();
        this.contextMenu = await this.config.contextGenerator(
            loadMetadata,
            {reload: () => this.loadData(loadMetadata)},
        );
        this.contextMenuChange.emit(this.contextMenu);
    }

    private getRowsPerPageSteps(step: number, max = MAX_ROWS_PER_PAGE): number[] {
        const steps: number[] = [];

        for (let i = step; i < max; i += step) {
            steps.push(i);
        }

        steps.push(max);
        return steps;
    }
}
