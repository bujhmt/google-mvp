import {Filter} from '../interfaces';

export class FiltersTransformer<TEntity extends Record<string, any>> {
    public transform(filtersMap: Record<keyof TEntity, Omit<Filter<TEntity>, 'field'>[]>): Filter<TEntity>[] {
        const filters: Filter<TEntity>[] = [];

        for (const [field, rules] of Object.entries(filtersMap || {})) {
            const fieldRules = rules
                .filter((rule) => rule.value !== '' && rule.value !== undefined)
                .map((rule) => ({...rule, field}));

            filters.push(...fieldRules);
        }

        return filters;
    }
}
