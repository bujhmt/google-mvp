import {QueryBuilder} from '../interfaces';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';
import {parseQueryValue} from '../helpers';

export class LtQueryBuilder<TEntity> implements QueryBuilder<TEntity> {
    getQuery(field: Extract<keyof TEntity, string>, value: TEntity[typeof field]): QueryDslQueryContainer {
        return {
            range: {
                [field]: {
                    lt: parseQueryValue(value) as number,
                }
            }
        };
    }
}
