import '@testing-library/jest-dom';
import * as ResizeObserverModule from 'resize-observer-polyfill';

(global as any).ResizeObserver = ResizeObserverModule.default;

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

beforeAll(() => {
  Math.random = () => 1;
});
