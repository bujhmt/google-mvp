import {Injectable} from '@nestjs/common';
import {Client} from '@elastic/elasticsearch';
import {Sculpture} from '@google-mvp/shared/model';
import {InjectClient} from '../../elasticsearch/decorators';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class SculpturesService {
    private readonly index = 'sculptures';

    constructor(
        @InjectClient() private readonly elasticsearchClient: Client,
    ) {
    }

    public async getSculptures(query?: QueryDslQueryContainer, size = 100, from = 0): Promise<[Sculpture[], number]> {
        const response = await this.elasticsearchClient.search<Sculpture>({
            index: this.index,
            query,
            from,
            size,
        });

        const {hits: {hits, total}} = response;

        return [hits.map(({_source}) => _source), typeof total === 'number' ? total : total.value];
    }

    public async getSculptureById(id: string): Promise<Sculpture | undefined> {
        const {_source} = await this.elasticsearchClient.get<Sculpture>({
            index: this.index,
            id,
        });

        return _source;
    }

    public async createSculpture(data: Partial<Sculpture>): Promise<string> {
        const {_id} = await this.elasticsearchClient.index<Partial<Sculpture>>({
            index: this.index,
            document: {...data, createdAt: new Date()},
        });

        return _id;
    }

    public deleteSculptureById(id: string) {
        return this.elasticsearchClient.delete({index: this.index, id});
    }
}
