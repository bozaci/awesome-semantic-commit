type dataType = {
  name: string;
  href: string;
  icon?: any;
  isWithText?: boolean;
};

export interface SocialMediaProps {
  data: dataType[];
  theme: 'ghost-dark' | 'ghost-gray';
  className?: string;
}
