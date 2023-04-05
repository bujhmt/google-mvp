import {SearchModel} from '../interfaces/search-model.interface';
import {Tokenizer} from '../utils';
import {Document} from '../interfaces';

export class StandardBooleanSearchModel implements SearchModel {
    private readonly tokenizer = new Tokenizer();
    private readonly indexMap: Record<string, Document[]> = {};

    public index(document: Document, indexTerms: string[]) {
        const tokens = this.tokenizer.tokenize(document.content);

        for (const term of indexTerms.map((token) => token.trim().toLowerCase())) {
            this.indexMap[term] = [
                ...(this.indexMap[term] || []),
                ...(tokens.includes(term) ? [document] : []),
            ]
        }
    }

    public search(query: string): Document[] {
        const tokens = this.tokenizer.tokenize(query);

        return tokens.reduce<Document[]>((acc, token) => [
            ...acc,
            ...(this.indexMap[token] || []),
        ], [])
    }
}
