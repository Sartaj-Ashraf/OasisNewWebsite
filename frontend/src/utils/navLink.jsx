
import { Home, Search, Info, User,Briefcase } from "lucide-react";
import { X ,Facebook, Instagram, LinkedIn, WhatsApp  } from "./SocialIcons";
export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about-us' },
  // { name: 'Our Team', path: '/our-team' },
  { name: 'Services', path: '/services' },
  {name:'Career',path:'/careers'},
  { name: 'Blogs', path: '/blogs' },
];
// export const bottomNavItems = [
//   { name: "Home",    href: "/",       icon: Home   },
//   { name: "Search",  href: "/search", icon: Search },
//   { name: "About",   href: "/about",  icon: Info   },
//   { name: "Profile", href: "/profile",icon: User   },
//   {name:'Career',href:'/careers' ,icon:Briefcase}
// ];



export const contactLinks = [
  {
    label: "Email Address",
    value: "sales@oasisascend.com",
    href: "mailto:sales@oasisascend.com",
  },  
  {
    label: "Phone Number",
    value: "+91 84910 12121",
    href: "tel:+918491012121",
  },
  {
    label: "WhatsApp",
    value: "+91 84910 12121",
    href: "https://wa.me/918491012121",
  },  
  {
    label: "Address",
    value: "Srinagar, Kashmir, India",
  },
];
export const socailLinks = [
  {
    name: "Facebook",
    path: "https://www.facebook.com/oasisascend",
    icon: Facebook,
  },
  {
    name: "Instagram",
    path: "https://www.instagram.com/oasisascend",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    path: "https://www.linkedin.com/company/oasisascend",
    icon: LinkedIn,
  },
  {
    name: "WhatsApp",
    path: "https://wa.me/918491012121",
    icon: WhatsApp,
  },
];