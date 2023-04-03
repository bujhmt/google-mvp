import {QueryBuilder} from '../interfaces';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';

export class StartsWithQueryBuilder<TEntity> implements QueryBuilder<TEntity> {
    getQuery(field: Extract<keyof TEntity, string>, value: TEntity[typeof field]): QueryDslQueryContainer {
        return {
            wildcard: {
                [field]: {
                    value: `${value}*`,
                }
            }
        };
    }
}
