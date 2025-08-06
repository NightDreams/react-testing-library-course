import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Contador } from './Counter';

describe('<Contador />', () => {
    it('Deberia mostrar el valor inicial', () => {
        render(<Contador />);
        const contador = screen.getByText('Contador: 0');
        expect(contador).toBeInTheDocument();
    })

    it('deberia incrementar el contador', async() => {
        render(<Contador />);
        const boton = screen.getByText('Incrementar');
        await act(() => {
            fireEvent.click(boton);
        })
        const contador = screen.getByText('Contador: 1');
        expect(contador).toBeInTheDocument();
    })
})