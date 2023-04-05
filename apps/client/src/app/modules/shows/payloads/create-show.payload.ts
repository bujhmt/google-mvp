export interface CreateShowPayload {
    name: string;
    actors: string[];
    cost?: number;
    date?: Date;
    description?: string;
    annotation?: string;
    critics?: string;
}
