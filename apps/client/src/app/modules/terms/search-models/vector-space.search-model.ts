import {SearchModel} from '../interfaces/search-model.interface';
import {Document} from '../interfaces';
import {Tokenizer} from '../utils';

export class VectorSpaceSearchModel implements SearchModel {
    private readonly tokenizer = new Tokenizer();
    private readonly documentsFrequenciesMap = new Map<Document, Record<string, number>>();
    private readonly documentsVectors = new Map<Document, number[]>();
    private readonly k = 0.5;

    index(document: Document, indexTerms: string[]): void {
        const tokens = this.tokenizer.tokenize(document.content);

        const documentTermFrequency = tokens.reduce<Record<string, number>>(
            (acc, token) => ({...acc, [token]: (acc[token] || 0) + 1}),
            {},
        );
        this.documentsFrequenciesMap.set(document, documentTermFrequency);

        const maxTermFrequency = Math.max(...Object.values(documentTermFrequency));
        const maxDocumentsTermFrequency = Math.max(...tokens.map((token) => this.getDocumentsTermFrequency(token)));

        const documentVector: number[] = [];
        for (const term of indexTerms.map((term) => term.trim().toLowerCase())) {
            // tf, double normalization
            const tf = this.k + 0.5 * (documentTermFrequency[term] || 0) / maxTermFrequency;

            // idf
            const idf = Math.log(maxDocumentsTermFrequency / (1 + this.getDocumentsTermFrequency(term)));

            documentVector.push(tf * idf);
        }

        this.documentsVectors.set(document, documentVector);
    }

    private getDocumentsTermFrequency(term: string): number {
        return Array.from(this.documentsFrequenciesMap.values())
            .reduce((acc, frequenciesMap) => acc + (frequenciesMap[term] ? 1 : 0), 0)
    }

    private cosineSimilarity(documentVector: number[], queryVector: number[]): number {
        if (documentVector.length !== queryVector.length) {
            throw new Error('Vectors must be of equal length');
        }

        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;

        for (let i = 0; i < documentVector.length; i++) {
            dotProduct += documentVector[i] * queryVector[i];
            norm1 += documentVector[i] ** 2;
            norm2 += queryVector[i] ** 2;
        }

        const normProduct = Math.sqrt(norm1) * Math.sqrt(norm2);
        const similarity = dotProduct / normProduct;

        return similarity;
    }

    search(query: string): Document[] {
        const terms = this.tokenizer.tokenize(query);

        const queryTermFrequency = terms.reduce<Record<string, number>>(
            (acc, token) => ({...acc, [token]: (acc[token] || 0) + 1}),
            {},
        );

        const maxTermFrequency = Math.max(...Object.values(queryTermFrequency));
        const maxDocumentsTermFrequency = Math.max(...terms.map((token) => this.getDocumentsTermFrequency(token)));

        const queryVector: number[] = [];
        for (const term of terms) {
            // tf, double normalization
            const tf = this.k + 0.5 * (queryTermFrequency[term] || 0) / maxTermFrequency;
            // idf
            const idf = Math.log(maxDocumentsTermFrequency / this.getDocumentsTermFrequency(term));
            queryVector.push(tf * idf);
        }

        return Array.from(this.documentsVectors.entries())
            .map(([document, documentVector]) => {
                return {
                    ...document,
                    similarityScore: this.cosineSimilarity(documentVector, [
                        ...queryVector,
                        ...Array.from({length: Math.max(documentVector.length - queryVector.length, 0)}, () => 0),
                    ]),
                }
            })
            .sort((a, b) => b.similarityScore - a.similarityScore);

    }
}
