import {Document} from './document.interface';

export interface SearchModel {
    index(document: Document, indexTerms: string[]): void;
    search(query: string): Document[];
}
