import { createCustomShadow } from './theme/shadows';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: ReturnType<typeof createCustomShadow>;
    palette: typeof palette;
  }
}
