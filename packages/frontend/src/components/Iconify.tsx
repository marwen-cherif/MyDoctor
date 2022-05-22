import { Icon, IconifyIcon } from '@iconify/react';
import { Box } from '@mui/material';
import { FunctionComponent } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

const Iconify: FunctionComponent<
  React.PropsWithChildren<{
    icon: IconifyIcon | string;
    sx?: SxProps<Theme>;
    width?: number;
    height?: number;
  }>
> = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

export default Iconify;
