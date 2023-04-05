import {FilterMetadata} from 'primeng/api';
import {PaginationPayload} from './pagination.payload';

export interface GetShowsPayload extends PaginationPayload {
    filters?: FilterMetadata[];
}
