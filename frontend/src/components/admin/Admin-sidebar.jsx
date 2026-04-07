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

export const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('Dashboard');

    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        // { title: 'Web Development', icon: <Code2 size={20} /> },
        // { title: 'Web Design (UI/UX)', icon: <Palette size={20} /> },
        // { title: 'App Development', icon: <Smartphone size={20} /> },
        // { title: 'Digital Marketing', icon: <TrendingUp size={20} /> },
        // { title: 'Social Media Marketing', icon: <Share2 size={20} /> },
        // { title: 'SEO Optimization', icon: <Search size={20} /> },
        { title: 'Blog / Articles', icon: <FileText size={20} /> },
        { title: 'Case Studies', icon: <BarChart3 size={20} /> },
        { title: 'Testimonials', icon: <MessageSquareQuote size={20} /> },
        { title: 'Pricing Plans', icon: <CreditCard size={20} /> },
        { title: 'Portfolio / Projects', icon: <Briefcase size={20} /> },
        { title: 'About Us', icon: <Users size={20} /> },
        { title: 'Contact', icon: <Mail size={20} /> },
        { title: 'FAQ', icon: <HelpCircle size={20} /> },
    ];

    return (
        <aside
            className={`${isOpen ? 'w-64' : 'w-20'} 
            h-full flex flex-col
            border-r border-white/10 
            bg-gray-900 backdrop-blur-xl 
            transition-all duration-300`}
        >

            {/* Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-5 -right-3 text-black bg-yellow-400 p-1 rounded-full z-50"
            >
                <ChevronRight className={`${isOpen && 'rotate-180'}`} size={16} />
            </button>

            {/* Logo */}
            <div className="py-8 px-3 flex items-center gap-x-4">
                <div className="flex-shrink-0 bg-yellow-400 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                    <div className="w-5 h-5 border-2 border-black rounded-sm rotate-45 flex items-center justify-center">
                        <div className="w-1 h-1 bg-black rounded-full" />
                    </div>
                </div>
                <h1 className={`text-white origin-left font-extrabold text-xl tracking-tight duration-300 ${!isOpen && 'scale-0 opacity-0'}`}>
                    Oasis <span className="text-yellow-400">Ascend</span>
                </h1>
            </div>
            {/* 🔥 SCROLLABLE NAV ONLY */}
            <nav className="flex-1 overflow-y-auto custom-scroll px-3 space-y-2">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.title;

                    return (
                        <button
                            key={item.title}
                            onClick={() => setActiveTab(item.title)}
                            className={`flex items-center gap-3 w-full p-3 rounded-lg transition
                                ${isActive
                                    ? 'bg-yellow-400 text-black'
                                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {isOpen && <span>{item.title}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Footer (fixed bottom) */}
            <div className="p-3 border-t border-white/10">
                <button className="flex items-center gap-3 w-full p-3 text-gray-400 hover:text-white">
                    <Settings color='white' size={18} />
                    {isOpen && 'Settings'}
                </button>

                <button className="flex items-center gap-3 w-full p-3 text-red-400 hover:text-red-600">
                    <LogOut color='white' className='hover:text-red-900' size={18} />
                    {isOpen && 'Logout'}
                </button>
            </div>

        </aside>
    );
};