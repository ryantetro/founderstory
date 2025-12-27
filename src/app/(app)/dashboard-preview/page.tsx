"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Rocket,
    Calendar,
    TrendingUp,
    MessageSquare,
    Activity,
    Coffee,
    Zap,
    ArrowUpRight,
    MoreVertical,
    Plus,
    Lock,
    Eye,
    BarChart2
} from "lucide-react";
import Link from "next/link";

type Section = "heartbeat" | "history" | "metrics" | "logs";

export default function DashboardPreview() {
    const [activeTab, setActiveTab] = useState<Section>("heartbeat");

    const milestones = [
        {
            id: 1,
            type: "milestone",
            title: "First $100 Day",
            description: "Organic traffic finally converted. Bought a coffee to celebrate.",
            time: "2h ago",
            icon: <Coffee className="h-5 w-5 text-orange-400" />,
            color: "bg-orange-500/10 border-orange-500/20"
        },
        {
            id: 2,
            type: "alert",
            title: "Vercel Analytics Spike",
            description: "+450% traffic from a Viral Twitter thread.",
            time: "5h ago",
            icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
            color: "bg-emerald-500/10 border-emerald-500/20"
        },
        {
            id: 3,
            type: "thought",
            title: "The Hard Part",
            description: "Database latency is killing me. Thinking about refactoring the whole auth flow tonight.",
            time: "Yesterday",
            icon: <Zap className="h-5 w-5 text-purple-400" />,
            color: "bg-purple-500/10 border-purple-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans selection:bg-white/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <div className="hidden lg:flex flex-col gap-8 col-span-1">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-black" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">FounderStory</h1>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <SidebarItem
                            icon={<Activity className="h-5 w-5" />}
                            label="The Heartbeat"
                            active={activeTab === "heartbeat"}
                            onClick={() => setActiveTab("heartbeat")}
                        />
                        <SidebarItem
                            icon={<Calendar className="h-5 w-5" />}
                            label="History"
                            active={activeTab === "history"}
                            onClick={() => setActiveTab("history")}
                        />
                        <SidebarItem
                            icon={<BarChart2 className="h-5 w-5" />}
                            label="Public Metrics"
                            active={activeTab === "metrics"}
                            onClick={() => setActiveTab("metrics")}
                        />
                        <SidebarItem
                            icon={<MessageSquare className="h-5 w-5" />}
                            label="Private Logs"
                            active={activeTab === "logs"}
                            onClick={() => setActiveTab("logs")}
                        />
                    </nav>

                    <div className="mt-auto p-4 bg-gradient-to-br from-zinc-500/10 to-white/5 border border-white/10 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <div className="relative">
                            <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                                <Lock className="h-3 w-3" /> Founder Mode
                            </p>
                            <p className="text-xs text-white/40 mb-4">Your legacy is being recorded. Build something great.</p>
                            <button className="w-full py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors">
                                Upgrade Pro
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-1 lg:col-span-3 space-y-8">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={activeTab}
                        >
                            <h2 className="text-3xl font-bold tracking-tight capitalize">
                                {activeTab === 'heartbeat' ? 'Welcome, Ryan' : activeTab.replace('-', ' ')}
                            </h2>
                            <p className="text-white/40">
                                {activeTab === 'heartbeat' ? "You've been building for 42 days straight." : `Viewing your ${activeTab} data.`}
                            </p>
                        </motion.div>
                        <div className="flex gap-4">
                            <Link
                                href="/ryan"
                                className="h-12 px-6 bg-white/5 border border-white/10 text-white rounded-full hidden md:flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                            >
                                <Eye className="h-4 w-4" /> Preview Public Bio
                            </Link>
                            <button className="h-12 w-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/5 active:scale-95">
                                <Plus className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "heartbeat" && (
                            <motion.div
                                key="heartbeat"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <StatsGrid />
                                <HeartbeatContent milestones={milestones} />
                            </motion.div>
                        )}

                        {activeTab === "history" && (
                            <motion.div
                                key="history"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <HistorySection />
                            </motion.div>
                        )}

                        {activeTab === "metrics" && (
                            <motion.div
                                key="metrics"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <MetricsSection />
                            </motion.div>
                        )}

                        {activeTab === "logs" && (
                            <motion.div
                                key="logs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <LogsSection />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${active
                ? "bg-white/10 text-white shadow-inner"
                : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
        >
            {icon} {label}
        </button>
    );
}

function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Current Revenue" value="$1,242.00" trend="+12%" />
            <StatCard label="Viral Multiplier" value="4.2x" trend="+0.5" />
            <StatCard label="Mental State" value="Locked In" />
        </div>
    );
}

function StatCard({ label, value, trend }: { label: string, value: string, trend?: string }) {
    return (
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-colors">
            <p className="text-white/40 text-sm mb-1 uppercase tracking-wider font-semibold group-hover:text-white transition-colors">{label}</p>
            <div className="flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">{value}</span>
                {trend && (
                    <span className="text-emerald-400 text-sm font-medium mb-1 flex items-center gap-0.5">
                        <ArrowUpRight className="h-3 w-3" /> {trend}
                    </span>
                )}
            </div>
        </div>
    );
}

interface Milestone {
    id: number;
    type: string;
    title: string;
    description: string;
    time: string;
    icon: React.ReactNode;
    color: string;
}

function HeartbeatContent({ milestones }: { milestones: Milestone[] }) {
    return (
        <div className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden p-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-400 animate-pulse" /> The Founder Heartbeat
                </h3>
                <button className="text-white/20 hover:text-white transition-colors">
                    <MoreVertical className="h-5 w-5" />
                </button>
            </div>

            <div className="relative space-y-4">
                <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-white/5" />
                {milestones.map((m, i) => (
                    <motion.div
                        key={m.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-14 pb-8 group"
                    >
                        <div className={`absolute left-4 top-2 h-4 w-4 rounded-full border-2 border-[#0a0a0a] z-10 ${m.color.split(' ')[0]} ring-4 ring-black`} />
                        <div className={`p-6 rounded-2xl border ${m.color} backdrop-blur-sm transition-all group-hover:-translate-y-1`}>
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                                        {m.icon}
                                    </div>
                                    <h4 className="font-bold">{m.title}</h4>
                                </div>
                                <span className="text-xs text-white/30 font-mono">{m.time}</span>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed font-medium">
                                {m.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function HistorySection() {
    const years = [
        { year: "2025", metrics: "1.2k Revenue • 542 Builders", notes: "The Year of the Heartbeat" },
        { year: "2024", metrics: "0 Revenue • 12 Failed Builds", notes: "The Desert Years" },
        { year: "2023", metrics: "N/A", notes: "Dreaming in the dark." }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {years.map((y, i) => (
                <motion.div
                    key={y.year}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-white/[0.07] transition-all cursor-pointer"
                >
                    <h4 className="text-4xl font-bold mb-4 opacity-50 group-hover:opacity-100 transition-opacity italic">{y.year}</h4>
                    <p className="text-white/60 font-medium mb-1">{y.notes}</p>
                    <p className="text-xs text-indigo-400 font-mono tracking-tighter uppercase">{y.metrics}</p>
                    <div className="mt-8 flex gap-2">
                        <div className="h-1 flex-grow bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-white/20 w-1/3" />
                        </div>
                    </div>
                </motion.div>
            ))}
            <div className="border border-dashed border-white/10 p-8 rounded-3xl flex items-center justify-center group hover:border-white/20 transition-colors">
                <button className="text-white/20 group-hover:text-white transition-colors flex items-center gap-2 font-bold">
                    <Plus className="h-5 w-5" /> Archive New Period
                </button>
            </div>
        </div>
    );
}

function MetricsSection() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MetricBox title="Revenue (MRR)" value="$1,242" color="text-emerald-400">
                    {/* Simple SVG Chart */}
                    <svg viewBox="0 0 400 100" className="w-full h-32 mt-6">
                        <path
                            d="M0 80 Q 50 70, 100 85 T 200 60 T 300 40 T 400 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-emerald-400/50"
                        />
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                            d="M0 80 Q 50 70, 100 85 T 200 60 T 300 40 T 400 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-emerald-400"
                        />
                    </svg>
                </MetricBox>
                <MetricBox title="Traffic (Daily)" value="1.1k" color="text-indigo-400">
                    <svg viewBox="0 0 400 100" className="w-full h-32 mt-6">
                        <path
                            d="M0 90 Q 50 85, 100 40 T 200 50 T 300 20 T 400 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-indigo-400/50"
                        />
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                            d="M0 90 Q 50 85, 100 40 T 200 50 T 300 20 T 400 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-indigo-400"
                        />
                    </svg>
                </MetricBox>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
                <h4 className="font-bold mb-6 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-white/40" /> Vibe Momentum
                </h4>
                <div className="flex gap-1 justify-between items-end h-24">
                    {[40, 70, 45, 90, 65, 80, 55, 100, 75, 85, 60, 95].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.05 }}
                            className="w-full bg-white/5 border-t border-white/20 rounded-t-sm"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function MetricBox({ title, value, color, children }: { title: string, value: string, color: string, children: React.ReactNode }) {
    return (
        <div className="bg-zinc-950 border border-white/10 p-8 rounded-3xl">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{title}</p>
            <h4 className={`text-4xl font-bold ${color}`}>{value}</h4>
            {children}
        </div>
    );
}

function LogsSection() {
    const logs = [
        { date: "Dec 27, 2025", content: "The refactor is taking longer than expected. Coffee count: 4. Mental clarity: 2/10. But the UI is starting to sing." },
        { date: "Dec 26, 2025", content: "Stripe live keys enabled. The feeling of seeing real money hit the account is indescribable. 42 days of nothing, then this." },
        { date: "Dec 25, 2024", content: "Merry Christmas to the grind. Everyone is sleeping, I'm building. This is the hard part they talk about." }
    ];

    return (
        <div className="space-y-6">
            {logs.map((log, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black border border-white/5 p-6 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-white/10" />
                    <p className="text-[10px] font-mono text-white/20 mb-2 uppercase tracking-widest">{log.date}</p>
                    <p className="text-sm text-white/70 leading-relaxed italic font-medium">
                        &quot;{log.content}&quot;
                    </p>
                </motion.div>
            ))}
            <button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-white/20 font-bold hover:text-white transition-colors">
                + Log New Thought
            </button>
        </div>
    );
}
