import Link from "next/link";

export const LinkBtn = ({ link, children, className }) => {
  return (
    <Link
      href={link}
      className={
        `${className} ` +
        `button w-fit  hover:scale-105 text-white ` +
         `transition duration-500 ease-out ` +
        `font-medium px-4 py-2 `
      }
    >
      {children}
    </Link>
  );
};
// bg-linear-to-br from-secondary via-secondary to-secondary-dark
export const Button = ({ handleClick, children, className }) => {
  return (
    <button
      onClick={handleClick}
      className={`${className}  
text-white px-4 py-2 rounded-full mt-2 
transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
hover:scale-105 `}
    >
      {children}
    </button>
  );
};
// bg-linear-to-br from-primary via-primary to-primary-dark