
import { Home, Search, Info, User } from "lucide-react";
import { X ,Facebook, Instagram, LinkedIn } from "./SocialIcons";
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
  {
    label: "Email Address",
    value: "info@oasis.com",
    href: "mailto:info@oasis.com",
  },
  {
    label: "Phone Number",
    value: "+1234567890",
    href: "tel:+1234567890",
  },
  {
    label: "Address",
    value: "123 Main St, Anytown, USA",
  },
];

export const socailLinks = [
  {
    name: "Facebook",
    path: "https://facebook.com",
    icon: Facebook,
  },
  {
    name: "X",
    path: "https://twitter.com",
    icon: X,
  },
  {
    name: "Instagram",
    path: "https://instagram.com",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    path: "https://linkedin.com",
    icon: LinkedIn,
  },
];