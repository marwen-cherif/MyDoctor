import { createCustomShadow } from './components/theme/shadows';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: ReturnType<typeof createCustomShadow>;
    palette: typeof palette;
  }
  // allow configuration using `createTheme`
  // interface ThemeOptions {
  //     status?: {
  //         danger?: string;
  //     };
  // }
}
