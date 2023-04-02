import {ElasticsearchConfigurableModule} from './elasticsearch.module-definition';
import {Global, Module} from '@nestjs/common';
import {ElasticsearchClientProvider} from './providers';


@Global()
@Module({
    providers: [
        ElasticsearchClientProvider,
    ],
    exports: [
        ElasticsearchClientProvider,
    ],
})
export class ElasticsearchModule extends ElasticsearchConfigurableModule {
}
