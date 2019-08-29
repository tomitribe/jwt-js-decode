export const UNSUPPORTED_ALGORITHM = 'Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none".';
export const ILLEGAL_ARGUMENT = 'Illegal argument specified!';

export function num2hex(memo: string, i: number): string {
    return memo + ('0' + i.toString(16)).slice(-2);
}

// clean leading zeros
export function cleanZeros(b) {
    return b[0] === 0 ? cleanZeros(b.slice(1)) : b;
}

export function hex2AB(hex: string): ArrayBuffer | Uint8Array {
    if (!hex) throw new Error(ILLEGAL_ARGUMENT);
    const match = hex.match(/[0-9A-F]{2}/ig);
    if (!match) throw new Error(ILLEGAL_ARGUMENT);
    return new Uint8Array(match.map(i => parseInt(i, 16)))
}

export function AB2hex(buff: ArrayBuffer | Uint8Array): string {
    if (buff instanceof ArrayBuffer) buff = new Uint8Array(buff);
    return (buff as Uint8Array).reduce(num2hex, '');
}
