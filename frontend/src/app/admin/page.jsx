"use client"
import React from 'react'

const page = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-secondary/30 font-sans">
            {/* Main Card */}
            <div className="bg-primary/30 shadow-sm rounded-3xl px-10 py-10 flex flex-col items-center w-full max-w-sm mx-4">

                {/* Simple Loading Circle */}
                <div className="w-12 h-12 border-4 border-white border-t-indigo-900 rounded-full animate-spin mb-8"></div>

                {/* Textual Content */}
                <div className="text-center">
                    <h4 className="text-xl font-semibold text-primary tracking-tight">
                        Verifying Session
                    </h4>
                    <span className="mt-2 text-accent text-sm leading-relaxed">
                        Please wait while we secure your connection.
                    </span>
                </div>

                {/* Footer Branding - Optional, can remove for max simplicity */}
                <div className="mt-8 flex items-center gap-2 text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs font-medium tracking-wide">Secure Connection</span>
                </div>
            </div>

            {/* Tailwind Custom Keyframes (needed for animate-spin if not default) */}
            <style jsx global>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    )
}

export default page