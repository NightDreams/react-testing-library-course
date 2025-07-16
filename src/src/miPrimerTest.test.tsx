import { describe, it, expect } from 'vitest';

describe('fisr', () => {
	it('sum 2 numbers', () => {
		const suma = (a: number, b: number) => a + b;
		const resultado = suma(2, 3);
		expect(resultado).toBe(5);
	});
	it('should match 2 text', () => {
		const text1 = 'Platzi conf';
		const text2 = 'Platzi conf';
		expect(text1).toBe(text2);
	});
});
