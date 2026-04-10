
import { Home, Search, Info, User } from "lucide-react";

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Our Team', path: '/our-team' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];
export const bottomNavItems = [
  { name: "Home",    href: "/",       icon: Home   },
  { name: "Search",  href: "/search", icon: Search },
  { name: "About",   href: "/about",  icon: Info   },
  { name: "Profile", href: "/profile",icon: User   },
];


export const contactLinks = [
  { name: 'Email', path: 'mailto:info@oasis.com' },
  { name: 'Phone', path: 'tel:+1234567890' },
  { name: 'Address', path: '123 Main St, Anytown, USA' },
];


