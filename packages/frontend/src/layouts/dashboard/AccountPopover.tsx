import {
  FunctionComponent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { alpha, Theme } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import account from '../../_mock/account';
import AuthenticationService from '../../services/authentication.service';
import { useCurrentUserContext } from './CurrentUserContext';

const AccountPopover: FunctionComponent = () => {
  const navigate = useNavigate();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState<(EventTarget & Element) | null>(null);

  const handleOpen = (event: MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = useCallback(() => {
    AuthenticationService.logout();
    navigate('/login');
  }, [navigate]);

  const { user } = useCurrentUserContext();

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open
            ? {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme: Theme) =>
                    alpha(theme.palette.grey[900], 0.8),
                },
              }
            : {}),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user.lastName} ${user.firstName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
