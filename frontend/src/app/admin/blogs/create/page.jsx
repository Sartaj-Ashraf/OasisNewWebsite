"use client";

import React, { useState, useEffect } from "react";
import {
    Plus, Trash2, Image as ImageIcon, Type,
    Heading1, Heading2, Heading3, Send, Quote,
    Settings, Globe, Tag, Sparkles, Layout, X
} from "lucide-react";
import { createBlog } from "@/services/blogs.service";

export default function BlogForm() {
    // 1. STATE MANAGEMENT
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        isPublished: false,
        coverImageAlt: "",
    });

    const [coverImageFile, setCoverImageFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showHeadingMenu, setShowHeadingMenu] = useState(false);

    // 2. CLEANUP (Memory Leak Prevention)
    useEffect(() => {
        return () => {
            if (coverPreview) URL.revokeObjectURL(coverPreview);
            blocks.forEach(b => { if (b.preview) URL.revokeObjectURL(b.preview); });
        };
    }, [coverPreview, blocks]);

    // 3. LOGIC HELPERS
    const generateSlug = (text) =>
        text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImageFile(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const addBlock = (type) => {
        const newBlock = {
            id: crypto.randomUUID(),
            type,
            content: "",
            meta: { alt: "", caption: "" },
            preview: null,
        };
        setBlocks([...blocks, newBlock]);
        setShowHeadingMenu(false);
    };

    const removeBlock = (id) => setBlocks(blocks.filter((b) => b.id !== id));

    const updateBlock = (id, value, file = null) => {
        setBlocks((prev) =>
            prev.map((b) => {
                if (b.id === id) {
                    if (file) return { ...b, content: "PENDING_FILE", file, preview: URL.createObjectURL(file) };
                    return { ...b, content: value };
                }
                return b;
            })
        );
    };

    const updateMeta = (id, field, value) => {
        setBlocks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, meta: { ...b.meta, [field]: value } } : b))
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return alert("Title is required");
        if (blocks.length === 0) return alert("Content must have at least one block");

        setLoading(true);
        const data = new FormData();
        data.append("title", form.title);
        data.append("slug", generateSlug(form.title));
        data.append("excerpt", form.excerpt);
        data.append("isPublished", form.isPublished);

        if (coverImageFile) {
            data.append("coverImageFile", coverImageFile);
            data.append("coverImageAlt", form.coverImageAlt);
        }

        const processedBlocks = blocks.map((block) => {
            if (block.type === "image" && block.file) {
                data.append(`image_block_${block.id}`, block.file);
                return { id: block.id, type: block.type, content: `FILE_${block.id}`, meta: block.meta };
            }
            return { id: block.id, type: block.type, content: block.content, meta: block.meta };
        });

        data.append("content", JSON.stringify(processedBlocks));

        try {
            await createBlog(data);
            alert("Blog published!");
        } catch (err) {
            alert("Error saving blog.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
            {/* TOP NAVIGATION BAR */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <span className="font-bold text-slate-800 tracking-tight text-xl">Blog Editor</span>
                    </div>
                    <div className="flex items-center gap-4">

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? "Processing..." : <><Send size={16} /> Publish Blog</>}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 ">

                {/* LEFT: Configuration Sidebar */}
                <aside className="lg:col-span-4 space-y-6">
                    <section className="bg-white border border-slate-200 p-6 rounded-[1rem] shadow-sm">


                        <div className="space-y-6">
                            {/* Cover Image Upload */}
                          

                            <div className="space-y-4">
                                <InputField label="SEO Title" placeholder="Enter post title..." value={form.title} onChange={(val) => setForm({ ...form, title: val })} />

                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-2 block">Excerpt</label>
                                    <textarea
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none h-24 resize-none transition-all"
                                        placeholder="Brief summary..."
                                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                    />
                                </div>

                            </div>

                            <div className="pt-2 border-t border-slate-100">
                                <label
                                    htmlFor="isPublished"
                                    className="flex items-center justify-between cursor-pointer group"
                                >
                                    <span className="text-sm font-bold text-slate-700">
                                        {form.isPublished ? "Active" : "Inactive"}
                                    </span>

                                    <div className="relative inline-flex items-center">
                                        <input
                                            id="isPublished"
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={form.isPublished}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    isPublished: e.target.checked,
                                                }))
                                            }
                                        />

                                        <div className="
        w-11 h-6 bg-slate-200 rounded-full
        peer-checked:bg-green-600
        after:content-['']
        after:absolute
        after:top-[2px]
        after:left-[2px]
        after:bg-white
        after:border
        after:border-gray-300
        after:rounded-full
        after:h-5
        after:w-5
        after:transition-all
        peer-checked:after:translate-x-full
      "></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </section>
                </aside>

                {/* RIGHT: Main Writing Canvas */}
                <div className="lg:col-span-8">
                    {/* Visual Editor Toolbar */}
                    <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-sm mb-8 flex items-center gap-1 sticky top-20 z-40">
                        <EditorTab icon={<Type size={16} />} label="Text" onClick={() => addBlock("p")} />
                        <div className="h-6 w-[1px] bg-slate-200 mx-1" />
                        <EditorTab icon={<Heading1 size={16} />} label="H1" onClick={() => addBlock("h1")} />
                        <EditorTab icon={<Heading2 size={16} />} label="H2" onClick={() => addBlock("h2")} />
                        <EditorTab icon={<ImageIcon size={16} />} label="Media" onClick={() => addBlock("image")} />
                        <EditorTab icon={<Quote size={16} />} label="Quote" onClick={() => addBlock("quote")} />
                    </div>

                    {/* Content Area */}
                    <div className="space-y-4 min-h-[600px]">
                        {blocks.length === 0 ? (
                            <div className="h-[400px] bg-white border border-slate-200 border-dashed rounded-[2rem] flex flex-col items-center justify-center text-slate-400">
                                <Layout size={40} className="mb-4 stroke-[1.5px]" />
                                <p className="font-medium">Start your story here...</p>
                                <button onClick={() => addBlock("p")} className="mt-4 text-indigo-600 font-bold text-sm hover:underline">Add first paragraph</button>
                            </div>
                        ) : (
                            
                                blocks.map((block) => {
                                    // Determine dynamic styles for text blocks
                                    const getTextStyles = () => {
                                        switch (block.type) {
                                            case 'h1': return 'text-4xl font-extrabold tracking-tight';
                                            case 'h2': return 'text-2xl font-bold';
                                            case 'quote': return 'text-xl italic border-l-4 border-indigo-500 pl-8 py-2';
                                            default: return 'text-lg leading-relaxed';
                                        }
                                    };

                                    return (
                                        <div key={block.id} className="group relative">
                                            {/* Delete Button - Positioned to the left */}
                                            <div className="absolute -left-12 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => removeBlock(block.id)}
                                                    className="p-2 bg-rose-50 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                                                    title="Remove block"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>

                                            {/* Block Content Container */}
                                            <div className={`bg-white p-2 rounded-3xl transition-all ${block.type.startsWith('h') ? '' : 'hover:shadow-indigo-500/5 hover:shadow-2xl hover:border-slate-100 border border-transparent'
                                                }`}>
                                                {block.type === "image" ? (
                                                    <div className="space-y-3 p-2">
                                                        <div className="relative bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4 flex items-center justify-center min-h-[250px] overflow-hidden">
                                                            {block.preview ? (
                                                                <img
                                                                    src={block.preview}
                                                                    className="max-h-[500px] w-full object-contain rounded-xl shadow-lg"
                                                                    alt="Post content"
                                                                />
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                                    <Plus size={24} />
                                                                    <span className="text-xs font-bold uppercase tracking-widest">Select Image</span>
                                                                </div>
                                                            )}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                onChange={(e) => updateBlock(block.id, "", e.target.files[0])}
                                                            />
                                                        </div>

                                                        <input
                                                            placeholder="Add a caption..."
                                                            className="w-full bg-transparent text-xs text-slate-500 italic outline-none border-b border-transparent focus:border-slate-200 pb-1 px-2"
                                                            value={block.meta?.caption || ""}
                                                            onChange={(e) => updateMeta(block.id, "caption", e.target.value)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <textarea
                                                        autoFocus
                                                        value={block.content}
                                                        onChange={(e) => updateBlock(block.id, e.target.value)}
                                                        rows={block.type === "p" ? 3 : 1}
                                                        placeholder={block.type === "p" ? "Begin writing..." : "Heading..."}
                                                        className={`w-full bg-transparent outline-none resize-none text-slate-800 placeholder-slate-300 p-4 transition-all ${getTextStyles()}`}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

// Sub-components for cleaner code
function InputField({ label, placeholder, value, onChange }) {
    return (
        <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase  block">{label}</label>
            <input
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

function EditorTab({ icon, label, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-all text-xs font-bold"
        >
            {icon} <span>{label}</span>
        </button>
    );
}   