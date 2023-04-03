import {FilterMetadata} from 'primeng/api';
import {PaginationPayload} from './pagination.payload';

export interface GetSculpturesPayload extends PaginationPayload {
    filters?: Record<string, FilterMetadata>;
}
