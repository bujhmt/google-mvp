import {SearchModel} from '../interfaces/search-model.interface';
import {Document} from '../interfaces';
import {Tokenizer} from '../utils';

export class VectorSpaceSearchModel implements SearchModel {
    private readonly tokenizer = new Tokenizer();
    private readonly documentsFrequenciesMap = new Map<Document, Record<string, number>>();
    private readonly documentsVectors = new Map<Document, number[]>();

    index(newDocument: Document, indexTerms: string[]): void {
        const tokens = this.tokenizer.tokenize(newDocument.content);

        const newDocumentTermFrequency = tokens.reduce<Record<string, number>>(
            (acc, token) => ({...acc, [token]: (acc[token] || 0) + 1}),
            {},
        );
        this.documentsFrequenciesMap.set(newDocument, newDocumentTermFrequency);

        this.documentsVectors.clear();
        for (const [document, documentTermFrequency] of this.documentsFrequenciesMap.entries()) {
            const documentVector: number[] = [];

            for (const term of indexTerms.map((term) => term.trim().toLowerCase())) {
                const tf = Math.log(1 + (documentTermFrequency[term] || 0));
                const idf = Math.log(this.documentsFrequenciesMap.size / (1 + this.getDocumentsTermFrequency(term))) + 1;

                documentVector.push(tf * idf);
            }

            console.log('Document vector: ', documentVector)
            this.documentsVectors.set(document, documentVector);
        }
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

        const queryVector: number[] = [];
        for (const term of terms) {
            const tf = Math.log(1 + (queryTermFrequency[term] || 0));
            const idf = Math.log(Object.keys(this.documentsFrequenciesMap).length / (1 + this.getDocumentsTermFrequency(term))) + 1;
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
