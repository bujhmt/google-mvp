import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';

export interface QueryBuilder<TEntity> {
    getQuery(field: keyof TEntity, value: TEntity[typeof field]): QueryDslQueryContainer;
}
