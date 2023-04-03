import {Injectable, Logger} from '@nestjs/common';
import {Client} from '@elastic/elasticsearch';
import {Sculpture} from '@google-mvp/shared/model';
import {InjectClient} from '../../elasticsearch/decorators';
import {QueryDslQueryContainer} from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class SculpturesService {
    private readonly logger = new Logger(SculpturesService.name);
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

        this.logger.log(response);

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

    public async initializeIndex() {
        // await this.elasticsearchClient.indices.delete({index: this.index});

        if (await this.elasticsearchClient.indices.exists({index: this.index})) {
            this.logger.warn(`${this.index} index already exists! Skipped.`);
            return;
        }

        this.logger.warn(`Creating ${this.index} index...`);
        await this.elasticsearchClient.indices.create({
            index: this.index,
            mappings: {
                properties: {
                    title: {type: 'keyword'},
                    authors: {type: 'keyword'},
                    age: {type: 'integer'},
                    cost: {type: 'integer'},
                    createdAt: {type: 'date'},
                    description: {type: 'text'},
                    history: {
                        type: 'text',
                        analyzer: 'english_analyzer',
                    },
                    review: {
                        type: 'text',
                        analyzer: 'review_analyzer',
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
                        review_filter: {
                            type: 'pattern_capture',
                            preserve_original: true,
                            patterns: ['([0-9]+)/([0-9]+)'],
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
                        review_analyzer: {
                            type: 'custom',
                            tokenizer: 'standard',
                            filter: [
                                'review_filter',
                                'english_stop',
                                'lowercase'
                            ],
                        },
                    }
                }
            }
        })
    }
}
