export interface Show {
    id: string;
    name: string;
    actors: string[];
    date: Date;
    cost?: number;
    description?: string;
    critics?: string;
    annotation?: string;
}
