import { Popover } from '@mui/material';
import { alpha, styled, Theme } from '@mui/material/styles';
import { FunctionComponent } from 'react';
import { SxProps } from '@mui/system';
import { PopoverProps } from '@mui/material/Popover/Popover';

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

interface MenuPopoverProps extends PopoverProps {
  sx: SxProps<Theme>;
  open: boolean;
}

const MenuPopover: FunctionComponent<
  React.PropsWithChildren<MenuPopoverProps>
> = ({ children, sx, anchorEl, ...other }) => {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: 'inherit',
          ...sx,
        },
      }}
      anchorEl={anchorEl}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
};

export default MenuPopover;
