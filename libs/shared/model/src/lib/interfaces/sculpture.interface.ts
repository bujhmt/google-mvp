export interface Sculpture {
    id: string;
    title: string;
    authors: string[];
    age: number;
    description?: string;
    cost?: number;
    createdAt: Date;
}
