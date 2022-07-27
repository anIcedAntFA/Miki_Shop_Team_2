import { BasketIcon, FavoriteIcon, UserIcon } from 'src/components/Icons';
import { PATH } from 'src/routes/path';

export const navLink = [
  {
    title: 'Trang chủ',
    path: PATH.home,
  },
  {
    title: 'Sản phẩm',
    path: PATH.products,
  },
  {
    title: 'Về chúng tôi',
    path: PATH.about,
  },
];

export const navCta = [
  {
    icon: <BasketIcon />,
    path: PATH.about,
  },
  {
    icon: <FavoriteIcon />,
    path: PATH.home,
  },
  {
    icon: <UserIcon />,
    path: PATH.about,
  },
];
