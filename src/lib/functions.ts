function formatNumericValue(value: number): string {
    // Convert the number to a string
    const formattedValue = value.toFixed(2);

    // Split the string into parts before and after the decimal point
    const parts = formattedValue.split('.');

    // Add spaces between groups of three digits in the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Join the parts back together with a dot
    return parts.join('.');
}

export function formatMoney(value: number, currency: string): string;
export function formatMoney(value: string, currency: string): string;
export function formatMoney(value: number | string, currency: string): string {
    let numericValue: number;

    // Check if the value is a string
    if (typeof value === 'string') {
        // Parse the string to a number
        numericValue = parseFloat(value);

        // Check if the parsed value is NaN
        if (isNaN(numericValue)) {
            throw new Error('Invalid input. Please provide a valid number.');
        }
    } else if (typeof value === 'number') {
        numericValue = value;
    } else {
        throw new Error('Invalid input. Please provide a valid number.');
    }

    // Format the numeric value and append currency
    return `${formatNumericValue(numericValue)} ${currency}`;
}
