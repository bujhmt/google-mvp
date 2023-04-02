import {ConfigurableModuleBuilder} from '@nestjs/common';
import {ClientOptions} from '@elastic/elasticsearch';

export const {
    ConfigurableModuleClass: ElasticsearchConfigurableModule,
    MODULE_OPTIONS_TOKEN: ELASTICSEARCH_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<ClientOptions>()
    .setClassMethodName('forRoot')
    .build()
