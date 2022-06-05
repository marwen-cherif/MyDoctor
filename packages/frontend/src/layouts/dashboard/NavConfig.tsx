import Iconify from '../../components/Iconify';
import { IconifyIcon } from '@iconify/react';

import { intl } from '../../helpers/intl';

const getIcon = (name: IconifyIcon | string) => (
  <Iconify icon={name} width={22} height={22} />
);

const navConfig = [
  {
    title: intl.formatMessage({
      defaultMessage: 'Appointments',
    }),
    path: '/app/appointment',
    icon: getIcon('teenyicons:appointments-outline'),
  },
];

export default navConfig;
