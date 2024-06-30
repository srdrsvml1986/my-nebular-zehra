
import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Kullanıcılar',
    link: '/pages/users',
    icon: 'home-outline',
    home: true,
    badge: {
      text: 'new',
      status: 'success',
    },
  },
  {
    title: 'Öğretmenler',
    link: '/pages/teachers',
    icon: 'home-outline',
    home: true,
    badge: {
      text: 'new',
      status: 'success',
    },
  },
  {
    title: 'Anket',
    link: '/pages/survey',
    icon: 'home-outline',
    home: true,
    badge: {
      text: 'new',
      status: 'success',
    },
  },
];

