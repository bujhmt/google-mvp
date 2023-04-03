import {QueryBuilder} from '../interfaces';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';

export class ContainsQueryBuilder<TEntity> implements QueryBuilder<TEntity> {
    getQuery(field: Extract<keyof TEntity, string>, value: TEntity[typeof field]): QueryDslQueryContainer {
        return {
            fuzzy: {
                [field]: {
                    value: value as string,
                    fuzziness: 'AUTO',
                }
            }
        };
    }
}
