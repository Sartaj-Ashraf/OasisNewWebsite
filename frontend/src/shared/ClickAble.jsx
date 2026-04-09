import Link from 'next/link'

export const LinkBtn = ({link, children}) => {
    return (
        <Link href={link} className="w-fit bg-secondary text-white transition-all duration-300 font-medium  px-4 py-2 rounded-full">{children}</Link>
    )
}

export const Button = ({handleClick, children, className}) => {
    return (
        <button onClick={ handleClick} className={`w-fit ${className} bg-primary text-white px-4 py-2 rounded-full mt-2`}>{children}</button>
    )
}
