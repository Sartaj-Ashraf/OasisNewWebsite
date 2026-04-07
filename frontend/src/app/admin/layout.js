import { AdminSidebar } from '../components/admin/Admin-sidebar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-950">

            {/* Sidebar (fixed height, independent scroll) */}
            <div className="h-full">
                <AdminSidebar />
            </div>

            {/* Main Content (scrollable only here) */}
            <main className="flex-1 h-full overflow-y-auto p-6">
                {children}
            </main>

        </div>
    );
}