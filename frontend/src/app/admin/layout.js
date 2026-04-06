export default function AdminLayout({ children }) {
    return (
        <div style={{ display: "flex" }}>
            <aside>Sidebar</aside>
            <main>{children}</main>
        </div>
    );
}