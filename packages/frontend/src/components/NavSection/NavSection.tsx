import { matchPath, useLocation } from 'react-router-dom';

import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import { FunctionComponent, ReactNode } from 'react';

const NavSection: FunctionComponent<{
  navConfig: {
    children?: any;
    path: string;
    title: string;
    icon: ReactNode;
    info?: ReactNode;
  }[];
}> = ({ navConfig, ...other }) => {
  const { pathname } = useLocation();

  const match = (path?: string) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
