export interface Filter<TEntity> {
    field: keyof TEntity;
    value: TEntity[keyof TEntity];
    matchMode: string;
    operator: string;
}
