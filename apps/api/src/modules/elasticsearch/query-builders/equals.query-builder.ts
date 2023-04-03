import {QueryBuilder} from '../interfaces';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';
import {parseQueryValue} from '../helpers';

export class EqualsQueryBuilder<TEntity> implements QueryBuilder<TEntity>{
    getQuery(field: Extract<keyof TEntity, string>, value: TEntity[typeof field]): QueryDslQueryContainer {
        return {term: {[field]: parseQueryValue(value)}};
    }
}
