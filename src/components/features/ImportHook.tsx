"use client";

import { Twitter, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ImportHook() {
    return (
        <div className="py-24 px-6">
            <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/5 overflow-hidden p-8 md:p-16 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-grow text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-6">
                            <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Low Friction</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            Import Your History.
                        </h2>
                        <p className="text-white/40 mb-10 font-medium leading-relaxed">
                            Connect your X account and we’ll automatically pull your past threads and milestones into your draft timeline. No manual backfilling required.
                        </p>

                        <ul className="space-y-4 mb-10 hidden md:block">
                            <li className="flex items-center gap-3 text-sm text-white/60 font-medium">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Auto-Sync #BuildInPublic threads
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/60 font-medium">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Historical Milestone Detection
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/60 font-medium">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant Prestige Timeline
                            </li>
                        </ul>

                        <button className="inline-flex items-center justify-center gap-2 bg-white text-black font-black py-4 px-8 rounded-2xl hover:bg-zinc-200 transition-all text-sm group">
                            <Twitter className="h-4 w-4 fill-current" /> Connect my X account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="w-full md:w-80 shrink-0">
                        <div className="bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10">
                                    <Twitter className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-grow">
                                    <div className="h-2 w-20 bg-white/20 rounded-full mb-2" />
                                    <div className="h-2 w-32 bg-white/10 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="h-1.5 w-full bg-white/10 rounded-full mb-3" />
                                    <div className="h-1.5 w-1/2 bg-white/5 rounded-full" />
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 ring-1 ring-white/10">
                                    <div className="h-1.5 w-full bg-white/20 rounded-full mb-3" />
                                    <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="h-1.5 w-full bg-white/10 rounded-full mb-3" />
                                    <div className="h-1.5 w-1/4 bg-white/5 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
