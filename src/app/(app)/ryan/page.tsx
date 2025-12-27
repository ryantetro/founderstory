"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    TrendingUp,
    Zap,
    MessageSquare,
    ChevronRight,
    ExternalLink,
    Heart,
    Calendar,
    Layers
} from "lucide-react";
import Link from "next/link";

type MilestoneType = "launch" | "pivot" | "win" | "thought";

interface Milestone {
    id: number;
    type: MilestoneType;
    title: string;
    content: string;
    date: string;
    metric?: string;
    visual?: string;
    link?: string;
}

const ryanMilestones: Milestone[] = [
    {
        id: 1,
        type: "launch",
        title: "FounderStory Legacy",
        content: "Building the platform for founders to record their heartbeat. Decided this is the one.",
        date: "Current",
        metric: "18 Projects Shipped",
        link: "https://founderstory.com"
    },
    {
        id: 2,
        type: "pivot",
        title: "The Pivot from Momentum",
        content: "Signup Momentum had 45 visitors in 24h, but the 'Why' was missing. Moved the energy here. It hurt, but legacy takes focus.",
        date: "2 Weeks Ago",
        metric: "45 Unique Visitors"
    },
    {
        id: 3,
        type: "win",
        title: "Vercel Analytics Spike",
        content: "The API test results came back green. Traffic up 450%. The pattern of success is emerging.",
        date: "Dec 2025",
        metric: "+450% Traffic"
    },
    {
        id: 4,
        type: "thought",
        title: "The Burnout Week",
        content: "Laptop closed for 3 days. Realized that mental health is a feature, not a bug. Coming back stronger.",
        date: "Nov 2025"
    },
    {
        id: 5,
        type: "win",
        title: "Signup Momentum Launch",
        content: "Experimental landing page for waitlist automation. My 18th project. The speed of shipping is my edge.",
        date: "Oct 2025",
        metric: "First 10 Signups"
    },
    {
        id: 6,
        type: "launch",
        title: "Where it all started",
        content: "Project #1. A simple script that probably would never scale, but it scaled my ambition.",
        date: "4 Years Ago",
        metric: "Project #1"
    }
];

export default function RyanProfile() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const getTheme = (type: MilestoneType) => {
        switch (type) {
            case "launch": return { color: "text-blue-400", glow: "from-blue-500/20", border: "border-blue-500/20", icon: <Rocket className="h-5 w-5" /> };
            case "pivot": return { color: "text-amber-400", glow: "from-amber-500/20", border: "border-amber-500/20", icon: <Zap className="h-5 w-5" /> };
            case "win": return { color: "text-emerald-400", glow: "from-emerald-500/20", border: "border-emerald-500/20", icon: <TrendingUp className="h-5 w-5" /> };
            case "thought": return { color: "text-white/60", glow: "from-white/10", border: "border-white/10", icon: <MessageSquare className="h-5 w-5" /> };
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/10 font-sans pb-24">

            {/* 1. Header (Identity Card) */}
            <div className="max-w-4xl mx-auto pt-20 px-6 pb-20">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000" />
                        <div className="relative h-32 w-32 rounded-full border-2 border-white/20 bg-zinc-900 flex items-center justify-center">
                            <span className="text-4xl font-black tracking-tighter text-white/40">RT</span>
                        </div>
                    </motion.div>

                    <div className="flex-grow">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <h1 className="text-4xl font-bold tracking-tight">Ryan Tetro</h1>
                            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest font-black text-emerald-400">In the Arena</span>
                            </div>
                        </div>
                        <p className="text-white/40 mb-6 font-medium">Building FounderStory. Record your legacy, one heartbeat at a time.</p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <Stat icon={<Calendar />} label="Years Building" value="4" />
                            <Stat icon={<Layers />} label="Projects Shipped" value="19" />
                            <Stat icon={<Rocket />} label="Main Stack" value="Next.js" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. The Prestige Timeline */}
            <div className="max-w-5xl mx-auto px-6 relative">

                {/* The Spine */}
                <div className="absolute left-1/2 -translate-x-1-2 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block">
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className={`w-full bg-gradient-to-b from-white/20 via-white/40 to-white/5 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-colors duration-500 ${hoveredId ? getTheme(ryanMilestones.find(m => m.id === hoveredId)?.type || "thought").color.replace('text-', 'bg-') : ""
                            }`}
                    />
                </div>

                {/* Mobile Spine */}
                <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-white/5 md:hidden" />

                <div className="space-y-24 md:space-y-0">
                    {ryanMilestones.map((milestone, index) => {
                        const theme = getTheme(milestone.type);
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={milestone.id}
                                className={`flex flex-col md:flex-row items-center justify-between w-full md:relative md:h-64`}
                                onMouseEnter={() => setHoveredId(milestone.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Desktop Card (Left/Right) */}
                                <div className={`w-full md:w-[42%] ${isEven ? 'md:mr-auto' : 'md:ml-auto'} pl-20 md:pl-0`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={`relative p-8 rounded-3xl border ${theme.border} backdrop-blur-xl bg-white/5 hover:bg-white/[0.08] transition-all group group-hover:-translate-y-2 cursor-default`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`h-10 w-10 rounded-xl bg-black flex items-center justify-center ${theme.color}`}>
                                                {theme.icon}
                                            </div>
                                            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{milestone.date}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 tracking-tight">{milestone.title}</h3>
                                        <p className="text-sm text-white/60 leading-relaxed mb-6 font-medium">
                                            {milestone.content}
                                        </p>

                                        {milestone.metric && (
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black text-xs font-bold border ${theme.border}`}>
                                                <span className={theme.color}>{milestone.metric}</span>
                                            </div>
                                        )}

                                        {milestone.link && (
                                            <a
                                                href={milestone.link}
                                                target="_blank"
                                                className="absolute bottom-6 right-6 p-2 rounded-lg hover:bg-white/5 transition-colors text-white/20 hover:text-white"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Node (Center) */}
                                <div className="absolute left-[34px] md:left-1/2 -translate-x-1/2 top-10 md:top-1/2 md:-translate-y-1/2 z-20">
                                    <div className={`h-4 w-4 rounded-full border-2 border-[#0a0a0a] ring-4 ring-black shadow-lg transition-transform duration-500 group-hover:scale-150 ${hoveredId === milestone.id ? theme.color.replace('text-', 'bg-') : 'bg-zinc-800'
                                        }`} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 3. Footer CTA */}
            <div className="max-w-xl mx-auto px-6 mt-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="p-12 rounded-[40px] bg-gradient-to-br from-zinc-900 to-black border border-white/5 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
                    <Heart className="h-12 w-12 text-white/20 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4">This is my story.</h2>
                    <p className="text-white/40 mb-10">Documenting every high, low, and pivot 45 days straight. Your legacy belongs on the heartbeat.</p>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-white text-black font-black py-5 px-10 rounded-2xl hover:bg-zinc-200 transition-all text-lg"
                    >
                        Start yours <ChevronRight className="h-5 w-5" />
                    </Link>
                </motion.div>
            </div>

        </div>
    );
}

function Stat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5">
            <div className="text-white/20">
                {icon}
            </div>
            <div>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-sm font-bold leading-none">{value}</p>
            </div>
        </div>
    );
}
