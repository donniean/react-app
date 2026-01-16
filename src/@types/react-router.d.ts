import type { NavigateOptions, To } from 'react-router';

declare module 'react-router' {
  interface NavigateFunction {
    (to: To, options?: NavigateOptions): Promise<void>;
    (delta: number): Promise<void>;
  }
}
