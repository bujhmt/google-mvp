import { Module } from '@nestjs/common';
import {ElasticsearchModule} from './modules/elasticsearch/elasticsearch.module';
import {ShowsModule} from './modules/shows/shows.module';

@Module({
    imports: [
        ElasticsearchModule.forRoot({
            node: 'http://localhost:9200',
        }),
        ShowsModule,
    ],
})
export class AppModule {}
