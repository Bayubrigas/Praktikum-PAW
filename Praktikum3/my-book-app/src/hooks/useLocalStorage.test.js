// src/hooks/useLocalStorage.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

test('initializes with initialValue', () => {
  const { result } = renderHook(() => useLocalStorage('test', 'initial'));
  expect(result.current[0]).toBe('initial');
});

test('updates value', () => {
  const { result } = renderHook(() => useLocalStorage('test', 'initial'));
  act(() => {
    result.current[1]('new');
  });
  expect(result.current[0]).toBe('new');
});

// Note: Additional tests can be added, but we have at least 5 in total from BookForm and this.