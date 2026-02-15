import { SiFacebook, SiX, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import type { IconType } from 'react-icons';

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    href: '', // Empty by default - configure as needed
    icon: SiFacebook,
  },
  {
    label: 'X',
    href: '', // Empty by default - configure as needed
    icon: SiX,
  },
  {
    label: 'Instagram',
    href: '', // Empty by default - configure as needed
    icon: SiInstagram,
  },
  {
    label: 'LinkedIn',
    href: '', // Empty by default - configure as needed
    icon: SiLinkedin,
  },
  {
    label: 'YouTube',
    href: '', // Empty by default - configure as needed
    icon: SiYoutube,
  },
];
