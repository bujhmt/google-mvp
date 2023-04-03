export function parseQueryValue(value: unknown) {
    if (!value || typeof value !== 'string') {
        return value;
    }

    const timestamp = Date.parse(value);
    if (isNaN(value as unknown as number) && !isNaN(timestamp)) {
        return new Date(value);
    }

    const num = parseInt(value, 10);

    if (!Number.isNaN(num)) {
        return num;
    }

    return value;
}
