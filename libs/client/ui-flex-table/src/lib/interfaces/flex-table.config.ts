import {LazyLoadEvent, MenuItem} from 'primeng/api';
import {FlexTableColumn} from './flex-table-column.interface';
import {FlexTableContextOptions} from './flex-table-context-options.interface';

export interface FlexTableConfig<TEntity extends Record<string, any>> {
    columns: FlexTableColumn<keyof TEntity>[];
    loader?: (event: LazyLoadEvent) => Promise<[entities: TEntity[], total?: number]>;
    contextGenerator?: (metadata: LazyLoadEvent, options: FlexTableContextOptions) => Promise<MenuItem[]> | MenuItem[];
    selection?: boolean;
    caption?: boolean;
    context?: boolean;
    dataKey?: keyof TEntity;
    stateKey?: string;
    rowsPerPage?: number;
    maxRowsPerPage?: number;
    stateStorage?: 'local' | 'session';
    columnResizeMode?: 'expand' | 'fit';
}
