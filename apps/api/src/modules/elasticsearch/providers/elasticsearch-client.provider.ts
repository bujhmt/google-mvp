import {Provider} from '@nestjs/common';
import {ELASTICSEARCH_CLIENT} from '../constants';
import {ELASTICSEARCH_OPTIONS_TOKEN} from '../elasticsearch.module-definition';
import {Client, ClientOptions} from '@elastic/elasticsearch';

export const ElasticsearchClientProvider: Provider = {
    provide: ELASTICSEARCH_CLIENT,
    inject: [ELASTICSEARCH_OPTIONS_TOKEN],
    useFactory: (options: ClientOptions) => {
        return new Client(options);
    }
}
