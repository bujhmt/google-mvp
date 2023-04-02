import { Module } from '@nestjs/common';
import {ElasticsearchModule} from './modules/elasticsearch/elasticsearch.module';
import {SculpturesModule} from './modules/sculptures/sculptures.module';

@Module({
    imports: [
        ElasticsearchModule.forRoot({
            node: 'http://localhost:9200',
        }),
        SculpturesModule,
    ],
})
export class AppModule {}
