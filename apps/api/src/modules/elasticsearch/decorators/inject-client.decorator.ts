import {Inject} from '@nestjs/common';
import {ELASTICSEARCH_CLIENT} from '../constants';

export function InjectClient() {
    return Inject(ELASTICSEARCH_CLIENT);
}
