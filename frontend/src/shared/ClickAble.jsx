import Link from "next/link";

export const LinkBtn = ({ link, children, className }) => {
  return (
    <Link
      href={link}
      className={
        `${className} ` +
        `button w-fit bg-linear-to-br from-secondary via-secondary to-secondary-dark hover:scale-105 text-white ` +
        `hover:from-secondary-dark hover:via-secondary-dark hover:to-secondary ` +
        `transition duration-500 ease-out ` +
        `font-medium px-4 py-2 `
      }
    >
      {children}
    </Link>
  );
};

export const Button = ({ handleClick, children, className }) => {
  return (
    <button
      onClick={handleClick}
      className={`${className} bg-linear-to-br from-primary via-primary to-primary-dark 
text-white px-4 py-2 rounded-full mt-2 
transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
hover:from-primary-dark hover:via-primary-dark hover:to-primary 
hover:scale-105 `}
    >
      {children}
    </button>
  );
};
