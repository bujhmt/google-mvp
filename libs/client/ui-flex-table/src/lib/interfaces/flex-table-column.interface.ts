import {FilterMatchMode} from 'primeng/api';

export interface FlexTableColumn<TField> {
    field: TField;
    header?: string;
    tooltip?: string;
    tooltipPosition?: 'top' | 'bottom' | 'right' | 'left';
    showDelay?: number;
    frozen?: boolean;
    frozenAlign?: 'left' | 'right';
    sort?: boolean;
    sortField?: TField | string;
    filter?: boolean;
    filterField?: TField | string;
    filterPlaceholder?: string;
    filterMatchMode?: 'contains'
        | 'startsWith'
        | 'notContains'
        | 'endsWith'
        | 'equals'
        | 'notEquals'
        | 'in'
        | 'lt'
        | 'lte'
        | 'gt'
        | 'gte'
        | FilterMatchMode;
    filterShowMatchModes?: boolean;
    filterShowAddButton?: boolean;
    filterShowOperator?: boolean;
    filterType?: 'text' | 'numeric' | 'boolean' | 'date';
    maxWidth?: string;
}
