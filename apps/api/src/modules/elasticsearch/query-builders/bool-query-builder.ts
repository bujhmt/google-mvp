import {EqualsQueryBuilder} from './equals.query-builder';
import {BadRequestException} from '@nestjs/common';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';
import {ContainsQueryBuilder} from './contains.query-builder';
import {Filter, QueryBuilder} from '../interfaces';
import {FilterOperator} from '../enums';
import {StartsWithQueryBuilder} from './starts-with.query-builder';
import {EndsWithQueryBuilder} from './ends-with.query-builder';
import {LtQueryBuilder} from './lt.query-builder';
import {LteQueryBuilder} from './lte.query-builder';
import {GtQueryBuilder} from './gt.query-builder';
import {GteQueryBuilder} from './gte.query-builder';
import {InQueryBuilder} from './in.query-builder';
import {MatchQueryBuilder} from './match.query-builder';

export class BoolQueryBuilder<TEntity> {
    private readonly matchModeAdaptersMap: Record<string, QueryBuilder<TEntity>> = {
        'equals': new EqualsQueryBuilder(),
        'notEquals': new EqualsQueryBuilder(),
        'contains': new ContainsQueryBuilder(),
        'notContains': new ContainsQueryBuilder(),
        'startsWith': new StartsWithQueryBuilder(),
        'endsWith': new EndsWithQueryBuilder(),
        'lt': new LtQueryBuilder(),
        'lte': new LteQueryBuilder(),
        'gt': new GtQueryBuilder(),
        'gte': new GteQueryBuilder(),
        'dateBefore': new LtQueryBuilder(),
        'dateAfter': new GtQueryBuilder(),
        'dateIs': new EqualsQueryBuilder(),
        'in': new InQueryBuilder(),
        'match': new MatchQueryBuilder(),
    };

    public getQuery(filters: Filter<TEntity>[]): QueryDslQueryContainer {
        const must: QueryDslQueryContainer[] = [];
        const should: QueryDslQueryContainer[] = [];

        for (const {field, value, operator, matchMode} of filters) {
            const query = this
                .getMathModeQueryBuilder(matchMode)
                .getQuery(field, value);

            if (operator === FilterOperator.AND) {
                must.push(query);
                continue;
            }

            if (operator === FilterOperator.OR) {
                should.push(query)
                continue;
            }
        }

        return {
            bool: {
                _name: BoolQueryBuilder.name,
                must,
                should,
            }
        };
    }

    private getMathModeQueryBuilder(mathMode: string): QueryBuilder<TEntity> {
        const matchModeAdapter = this.matchModeAdaptersMap[mathMode];

        if (!matchModeAdapter) {
            throw new BadRequestException(`Unknown ${mathMode} math mode operator!`);
        }

        return matchModeAdapter;
    }
}
