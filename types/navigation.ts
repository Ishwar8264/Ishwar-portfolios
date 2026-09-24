export type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

export type NavigationCta = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

export type NavigationBrand = {
  name: string;
  shortName?: string;
  href: string;
};

export type NavbarClassNames = {
  root?: string;
  container?: string;
  brand?: string;
  link?: string;
  desktopMenu?: string;
  tabletMenu?: string;
  mobilePanel?: string;
};

export type NavbarConfig = {
  brand: NavigationBrand;
  links: NavigationLink[];
  cta?: NavigationCta;
};
