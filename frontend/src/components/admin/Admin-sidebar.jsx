"use client";
import React, { useState } from 'react';
import {
    LayoutDashboard,
    Palette,
    FileText,
    BarChart3,
    MessageSquareQuote,
    CreditCard,
    Briefcase,
    Users,
    Mail,
    HelpCircle,
    Settings,
    LogOut,
    ChevronRight,
    Menu, // Added for mobile toggle
    X     // Added for mobile close
} from 'lucide-react';
import { logoutUser } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const router = useRouter();

    const menuItems = [
        { title: 'Dashboard', link: '/admin', icon: <LayoutDashboard size={19} /> },
        { title: 'Our team', link: '/admin/our-team', icon: <Palette size={20} /> },
        { title: 'Blog / Articles', link: '/admin/blog', icon: <FileText size={19} /> },
        { title: 'Case Studies', link: '/admin/cases', icon: <BarChart3 size={19} /> },
        { title: 'Testimonials', link: '/admin/testimonials', icon: <MessageSquareQuote size={19} /> },
        { title: 'Pricing Plans', link: '/admin/pricing', icon: <CreditCard size={19} /> },
        { title: 'Portfolio / Projects', link: '/admin/portfolio', icon: <Briefcase size={19} /> },
        { title: 'About Us', link: '/admin/about', icon: <Users size={19} /> },
        { title: 'Contact', link: '/admin/contact', icon: <Mail size={20} /> },
        { title: 'FAQ', link: '/admin/faq', icon: <HelpCircle size={20} /> },
    ];

    const handleLogout = async () => {
        toast.loading("Logging out...");
        try {
            await logoutUser();
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            toast.error("Logout failed");
        } finally {
            toast.dismiss();
        }
    };

    return (
        <>
            {/* --- MOBILE TRIGGER BUTTON --- */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-gray-900 text-yellow-400 rounded-lg border border-white/10"
            >
                <Menu size={24} />
            </button>

            {/* --- MOBILE OVERLAY --- */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* --- SIDEBAR CONTAINER --- */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-[70] md:relative
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${isOpen ? 'w-64' : 'md:w-20'} 
                    h-full flex flex-col
                    border-r border-white/10 
                    bg-gray-900 backdrop-blur-xl 
                    transition-all duration-300 ease-in-out
                `}
            >
                {/* Desktop Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="hidden md:flex absolute top-5 -right-3 text-black bg-yellow-400 p-1 rounded-full z-50 hover:scale-110 transition-transform"
                >
                    <ChevronRight className={`${isOpen && 'rotate-180'}`} size={16} />
                </button>

                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="md:hidden absolute top-5 right-4 text-white hover:text-yellow-400"
                >
                    <X size={20} />
                </button>

                {/* Logo Section */}
                <div className="py-6 px-4 flex items-center gap-x-4">
                    <div className="shrink-0 bg-yellow-400 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                        <div className="w-5 h-5 border-2 border-black rounded-sm rotate-45 flex items-center justify-center">
                            <div className="w-1 h-1 bg-black rounded-full" />
                        </div>
                    </div>
                    <h5 className={`text-white origin-left font-bold tracking-tight duration-300 text-sm ${(!isOpen && !isMobileOpen) && 'hidden md:opacity-0'}`}>
                        Oasis <span className="text-yellow-400">Ascend</span>
                    </h5>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto px-3 space-y-1 custom-scroll">
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.title;
                        return (
                            <button
                                key={item.title}
                                onClick={() => {
                                    setActiveTab(item.title);
                                    if (item.link) router.push(item.link);
                                    setIsMobileOpen(false); // Close mobile menu on click
                                }}
                                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200
                                    ${isActive
                                        ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className="shrink-0">{item.icon}</span>
                                <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300
                                    ${(!isOpen && !isMobileOpen) ? 'hidden md:opacity-0' : 'block opacity-100'}`}>
                                    {item.title}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                {/* Footer Section */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <button className="flex items-center gap-3 w-full p-2 text-gray-400 hover:text-white transition-colors">
                        <Settings size={18} />
                        <span className={`text-sm ${(!isOpen && !isMobileOpen) ? 'hidden md:opacity-0' : 'block'}`}>Settings</span>
                    </button>

                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-2 text-red-400 hover:text-red-500 transition-colors">
                        <LogOut size={18} />
                        <span className={`text-sm ${(!isOpen && !isMobileOpen) ? 'hidden md:opacity-0' : 'block'}`}>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};