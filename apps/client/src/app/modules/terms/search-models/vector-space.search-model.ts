import {SearchModel} from '../interfaces/search-model.interface';
import {Document} from '../interfaces';

interface TermFrequency {
    [term: string]: number;
}

export class VectorSpaceSearchModel implements SearchModel {
    private documents: Document[];
    private termFrequencies: TermFrequency[];

    constructor() {
        this.documents = [];
        this.termFrequencies = [];
    }

    private tokenize(text: string): string[] {
        return text.toLowerCase().match(/\b\w+\b/g) || [];
    }

    index(document: Document, indexTerms: string[]): void {
        this.documents.push(document);
        const termFrequency: TermFrequency = {};
        indexTerms.forEach((term) => {
            const tokens = this.tokenize(document.content);
            const count = tokens.filter((token) => token === term).length;
            termFrequency[term] = count / tokens.length;
        });
        this.termFrequencies.push(termFrequency);
    }

    private computeSimilarity(queryVector: TermFrequency, docIndex: number): number {
        const docVector = this.termFrequencies[docIndex];
        let dotProduct = 0;
        let queryMagnitude = 0;
        let docMagnitude = 0;
        Object.keys(queryVector).forEach((term) => {
            const queryWeight = queryVector[term];
            const docWeight = docVector[term] || 0;
            dotProduct += queryWeight * docWeight;
            queryMagnitude += queryWeight ** 2;
            docMagnitude += docWeight ** 2;
        });
        queryMagnitude = Math.sqrt(queryMagnitude);
        docMagnitude = Math.sqrt(docMagnitude);
        const cosineSimilarity = dotProduct / (queryMagnitude * docMagnitude);
        return cosineSimilarity;
    }

    search(query: string): Document[] {
        const queryTokens = this.tokenize(query);
        const queryVector: TermFrequency = {};
        queryTokens.forEach((token) => {
            queryVector[token] = (queryVector[token] || 0) + 1;
        });
        const similarityScores: number[] = this.termFrequencies.map((_, i) => {
            return this.computeSimilarity(queryVector, i);
        });
        const rankedDocuments = similarityScores
            .map((similarityScore, i) => ({
                ...this.documents[i],
                similarityScore,
            }))
            .sort((a, b) => b.similarityScore - a.similarityScore);
        return rankedDocuments;
    }
}
