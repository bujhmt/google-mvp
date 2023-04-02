export interface CreateSculpturePayload {
    title: string;
    authors: string[];
    age: number;
    cost?: number;
    createdAt?: Date;
    description?: string;
}
