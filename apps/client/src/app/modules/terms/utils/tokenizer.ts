export class Tokenizer {
    public tokenize(query: string): string[] {
        return query
            .trim()
            .toLowerCase()
            .split(/\W/)
            .filter((word) => !!word)
    }
}
