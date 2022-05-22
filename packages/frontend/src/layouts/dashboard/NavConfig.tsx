import Iconify from '../../components/Iconify';
import { IconifyIcon } from '@iconify/react';

const getIcon = (name: IconifyIcon | string) => (
  <Iconify icon={name} width={22} height={22} />
);

const navConfig = [
  {
    title: 'Appointments',
    path: '/app/appointment',
    icon: getIcon('teenyicons:appointments-outline'),
  },
];

export default navConfig;
