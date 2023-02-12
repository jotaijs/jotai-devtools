import React, { PropsWithChildren, StrictMode } from 'react';
import { RenderOptions, render } from '@testing-library/react';

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <StrictMode>{children}</StrictMode>;
};

export const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });
