import {QueryBuilder} from '../interfaces';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';
import {parseQueryValue} from '../helpers';

export class InQueryBuilder<TEntity> implements QueryBuilder<TEntity> {
    getQuery(field: Extract<keyof TEntity, string>, value: TEntity[typeof field]): QueryDslQueryContainer {
        return {
            terms: {
                [field]: Array.isArray(value) ? value : [value],
            }
        };
    }
}
