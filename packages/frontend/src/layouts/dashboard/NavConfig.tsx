import Iconify from '../../components/Iconify';
import { IconifyIcon } from '@iconify/react';

import { FormattedMessage } from 'react-intl';

const getIcon = (name: IconifyIcon | string) => (
  <Iconify icon={name} width={22} height={22} />
);

const navConfig = [
  {
    id: 'Appointments',
    title: <FormattedMessage defaultMessage="Appointments" />,
    path: '/app/appointment',
    icon: getIcon('teenyicons:appointments-outline'),
  },
];

export default navConfig;
