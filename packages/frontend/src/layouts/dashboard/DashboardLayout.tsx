import { FunctionComponent, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { useDashboardLayout } from './DashboardLayout.hooks';
import { Backdrop, CircularProgress } from '@mui/material';
import { CurrentUserContextProvider } from './CurrentUserContext';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const DashboardLayout: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, userProfile } = useDashboardLayout();

  if (!userProfile) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <CurrentUserContextProvider user={userProfile}>
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar
          isOpenSidebar={open}
          onCloseSidebar={() => setOpen(false)}
        />
        <MainStyle>
          <Outlet />
        </MainStyle>
      </RootStyle>
    </CurrentUserContextProvider>
  );
};

export default DashboardLayout;
