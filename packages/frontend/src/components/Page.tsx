import { Helmet } from 'react-helmet-async';
import { forwardRef, FunctionComponent, ReactNode } from 'react';

import { Box } from '@mui/material';

const Page: FunctionComponent<
  React.PropsWithChildren<{ title: string; meta?: ReactNode }>
> = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | Minimal-UI`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
