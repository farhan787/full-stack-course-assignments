import { cleanup, render, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import Counter from './Counter';

afterEach(() => {
  cleanup();
});

describe('Counter component', () => {
  it('should display correct odd initial count and isEven value', () => {
    const { getByTestId } = render(<Counter initialCount={1} />);
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(1);

    const isEvenValue = getByTestId('isEven').textContent;
    expect(isEvenValue).toEqual('false');
  });

  it('should display correct even initial count and isEven value', () => {
    const { getByTestId } = render(<Counter initialCount={0} />);
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(0);

    const isEvenValue = getByTestId('isEven').textContent;
    expect(isEvenValue).toEqual('true');
  });

  it('should correctly increment the count value', () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={23} />);
    const incrementBtn = getByRole('button', { name: 'Increment' });
    fireEvent.click(incrementBtn);
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(24);
  });

  it('should correctly decrement the count value', () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={12} />);
    const decrementBtn = getByRole('button', { name: 'Decrement' });
    fireEvent.click(decrementBtn);
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(11);
  });

  it('should increment odd initial value 999 times and display correct isEven value', () => {
    const oddInitialValue = 11;
    const { getByTestId, getByRole } = render(
      <Counter initialCount={oddInitialValue} />
    );
    const incrementBtn = getByRole('button', { name: 'Increment' });
    for (let i = 0; i < 999; i++) {
      fireEvent.click(incrementBtn);
    }
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(oddInitialValue + 999);

    const isEvenValue = getByTestId('isEven').textContent;
    expect(isEvenValue).toEqual('true');
  });

  it('should increment even initial value 999 times and display correct isEven value', () => {
    const evenInitialValue = 12;
    const { getByTestId, getByRole } = render(
      <Counter initialCount={evenInitialValue} />
    );
    const incrementBtn = getByRole('button', { name: 'Increment' });
    for (let i = 0; i < 999; i++) {
      fireEvent.click(incrementBtn);
    }
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(evenInitialValue + 999);

    const isEvenValue = getByTestId('isEven').textContent;
    expect(isEvenValue).toEqual('false');
  });

  it('should decrement odd initial value 1000 times and display correct isEven value', () => {
    const oddInitialValue = 11;
    const { getByTestId, getByRole } = render(
      <Counter initialCount={oddInitialValue} />
    );
    const decrementBtn = getByRole('button', { name: 'Decrement' });
    for (let i = 0; i < 1000; i++) {
      fireEvent.click(decrementBtn);
    }
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(oddInitialValue - 1000);

    const isEvenValue = getByTestId('isEven').textContent;
    expect(isEvenValue).toEqual('false');
  });

  it('should decrement even initial value 1000 times and display correct isEven value', () => {
    const evenInitialValue = 12;
    const { getByTestId, getByRole } = render(
      <Counter initialCount={evenInitialValue} />
    );
    const decrementBtn = getByRole('button', { name: 'Decrement' });
    for (let i = 0; i < 1000; i++) {
      fireEvent.click(decrementBtn);
    }
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(evenInitialValue - 1000);

    const isEvenValue = getByTestId('isEven').textContent;
    expect(isEvenValue).toEqual('true');
  });
});
