export default function ClientLayout({ children }) {
    return (
        <>
            <nav>Client Navbar</nav>
            <main>{children}</main>
            <footer>Footer</footer>
        </>
    );
}