"use client";
import React, { useState } from 'react';
import {
    LayoutDashboard,
    Code2,
    Palette,
    Smartphone,
    TrendingUp,
    Share2,
    Search,
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
} from 'lucide-react';
import { logoutUser } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const router = useRouter();

    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={19} /> },
        // { title: 'Web Development', icon: <Code2 size={20} /> },
            { title: 'Our team', icon: <Palette size={20} /> },
        // { title: 'App Development', icon: <Smartphone size={20} /> },
        // { title: 'Digital Marketing', icon: <TrendingUp size={20} /> },
        // { title: 'Social Media Marketing', icon: <Share2 size={20} /> },
        // { title: 'SEO Optimization', icon: <Search size={20} /> },
        { title: 'Blog / Articles', icon: <FileText size={19} /> },
        { title: 'Case Studies', icon: <BarChart3 size={19} /> },
        { title: 'Testimonials', icon: <MessageSquareQuote size={19} /> },
        { title: 'Pricing Plans', icon: <CreditCard size={19} /> },
        { title: 'Portfolio / Projects', icon: <Briefcase size={19} /> },
        { title: 'About Us', icon: <Users size={19} /> },
        { title: 'Contact', icon: <Mail size={20} /> },
        { title: 'FAQ', icon: <HelpCircle size={20} /> },
    ];
    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed");
        }
    };
    return (
        <aside
            className={`${isOpen ? 'w-54' : 'w-18'} 
            h-full flex flex-col
            border-r border-white/10 
            bg-gray-900 backdrop-blur-xl 
            transition-all duration-300`}
        >

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-5 -right-3 text-black bg-yellow-400 p-1 rounded-full z-50"
            >
                <ChevronRight className={`${isOpen && 'rotate-180'}`} size={16} />
            </button>

            {/* Logo */}
            <div className="py-3 px-3 flex items-center gap-x-4">
                <div className="shrink-0 bg-yellow-400 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                    <div className="w-5 h-5 border-2 border-black rounded-sm rotate-45 flex items-center justify-center">
                        <div className="w-1 h-1 bg-black rounded-full" />
                    </div>
                </div>
                <h5 className={`text-white origin-left font-bold tracking-tight duration-300 text-[10px] ${!isOpen && 'scale-0 opacity-0'}`}>
                    Oasis <span className="text-yellow-400">Ascend</span>
                </h5>
            </div>
            {/* 🔥 SCROLLABLE NAV ONLY */}
            <nav className="flex-1 overflow-y-auto custom-scroll px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.title;

                    return (
                        <button
                            key={item.title}
                            onClick={() => setActiveTab(item.title)}
                            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition
                                ${isActive
                                    ? 'bg-yellow-400 text-black'
                                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            {isOpen && <h5>{item.title}</h5>}
                        </button>
                    );
                })}
            </nav>

            {/* Footer (fixed bottom) */}
            <div className="p-2 border-t border-white/10">
                <button className="flex items-center gap-3 w-full p-2 text-gray-400 hover:text-white">
                    <Settings color='white' size={18} />
                    {isOpen && <h5>Settings</h5>}
                </button>

                <button onClick={handleLogout} className="flex items-center gap-3 w-full p-2 text-red-400 hover:text-red-600">
                    <LogOut color='white' className='hover:text-red-900' size={18} />
                    {isOpen && <h5>Logout</h5>}
                </button>
            </div>

        </aside>
    );
};