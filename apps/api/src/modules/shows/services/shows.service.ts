import {Injectable, Logger} from '@nestjs/common';
import {Client} from '@elastic/elasticsearch';
import {Show} from '@google-mvp/shared/model';
import {InjectClient} from '../../elasticsearch/decorators';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class ShowsService {
    private readonly logger = new Logger(ShowsService.name);
    private readonly index = 'shows';

    constructor(
        @InjectClient() private readonly elasticsearchClient: Client,
    ) {
    }

    public async getShows(query?: QueryDslQueryContainer, size = 100, from = 0): Promise<[Show[], number]> {
        const response = await this.elasticsearchClient.search<Show>({
            index: this.index,
            query,
            from,
            size,
        });

        const {hits: {hits, total}} = response;

        return [hits.map(({_source}) => _source), typeof total === 'number' ? total : total.value];
    }

    public async getShowById(id: string): Promise<Show | undefined> {
        const {_source} = await this.elasticsearchClient.get<Show>({
            index: this.index,
            id,
        });

        return _source;
    }

    public async createShow(document: Partial<Show>): Promise<string> {
        const {_id} = await this.elasticsearchClient.index<Partial<Show>>({
            index: this.index,
            document,
        });

        return _id;
    }

    public deleteShowById(id: string) {
        return this.elasticsearchClient.delete({index: this.index, id});
    }

    public async initializeIndex() {
        if (await this.elasticsearchClient.indices.exists({index: this.index})) {
            this.logger.warn(`${this.index} index already exists! Skipped.`);
            return;
        }

        this.logger.warn(`Creating ${this.index} index...`);
        await this.elasticsearchClient.indices.create({
            index: this.index,
            mappings: {
                properties: {
                    name: {type: 'keyword'},
                    actors: {type: 'keyword'},
                    cost: {type: 'integer'},
                    date: {type: 'date'},
                    description: {type: 'text'},
                    critics: {
                        type: 'text',
                        analyzer: 'english_analyzer',
                    },
                    annotation: {
                        type: 'text',
                        analyzer: 'quotes_analyzer',
                    },
                }
            },
            settings: {
                analysis: {
                    filter: {
                        english_stop: {
                            type: 'stop',
                            stopwords: '_english_'
                        },
                        english_keywords: {
                            type: 'keyword_marker',
                            keywords: ['example']
                        },
                        english_stemmer: {
                            type: 'stemmer',
                            language: 'english'
                        },
                        english_possessive_stemmer: {
                            type: 'stemmer',
                            language: 'possessive_english'
                        },
                        quotes_filter: {
                            'type': 'pattern_capture',
                            'preserve_original': true,
                            'patterns': [
                                '([^"]+)"'
                            ]
                        }
                    },
                    analyzer: {
                        english_analyzer: {
                            type: 'custom',
                            tokenizer: 'standard',
                            filter: [
                                'english_possessive_stemmer',
                                'lowercase',
                                'english_stop',
                                'english_keywords',
                                'english_stemmer'
                            ]
                        },
                        quotes_analyzer: {
                            type: 'custom',
                            tokenizer: 'standard',
                            filter: [
                                'lowercase',
                                'stop',
                                'snowball',
                                'quotes_filter'
                            ]
                        }
                    }
                }
            }
        })
    }
}
