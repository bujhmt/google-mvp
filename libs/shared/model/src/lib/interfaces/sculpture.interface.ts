export interface Sculpture {
    id: string;
    title: string;
    authors: string[];
    age: number;
    description?: string;
    history?: string;
    review?: string;
    cost?: number;
    createdAt: Date;
}
