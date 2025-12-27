"use client";

import { useEffect, useState } from "react";
import { getAnalyticsData } from "@/app/actions";
import {
    Users,
    MousePointer2,
    Calendar,
    BarChart3,
    ArrowLeft,
    RefreshCcw,
    Clock
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface WaitlistEntry {
    timestamp: string;
    email: string;
    project: string;
    username: string;
}

interface InteractionEvent {
    timestamp: string;
    eventName: string;
    page: string;
    metadata: string;
}

interface AnalyticsData {
    waitlist: WaitlistEntry[];
    events: InteractionEvent[];
    mock: boolean;
}

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    async function refreshData() {
        setLoading(true);
        const result = await getAnalyticsData();
        setData(result as AnalyticsData);
        setLoading(false);
    }

    useEffect(() => {
        let isMounted = true;

        // Using a separate function to avoid synchronous setState during render
        const initialFetch = async () => {
            const result = await getAnalyticsData();
            if (isMounted) {
                setData(result as AnalyticsData);
                setLoading(false);
            }
        };

        initialFetch();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <RefreshCcw className="h-8 w-8 text-white/20 animate-spin" />
            </div>
        );
    }

    const signupCount = data?.waitlist?.length || 0;
    const eventCount = data?.events?.length || 0;
    const conversionRate = eventCount > 0 ? ((signupCount / eventCount) * 100).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-4 transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Arena
                        </Link>
                        <h1 className="text-4xl font-bold tracking-tight">Ryan&apos;s Command Center</h1>
                        <p className="text-white/40 mt-1 italic">&quot;Checking if this is a good product or no?&quot;</p>
                    </div>
                    <button
                        onClick={refreshData}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-semibold"
                    >
                        <RefreshCcw className="h-4 w-4" /> Refresh Stats
                    </button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl"
                    >
                        <Users className="h-6 w-6 text-indigo-400 mb-4" />
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-1">Waitlist Signups</p>
                        <span className="text-5xl font-bold">{signupCount}</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl"
                    >
                        <MousePointer2 className="h-6 w-6 text-purple-400 mb-4" />
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-1">Total Interactions</p>
                        <span className="text-5xl font-bold">{eventCount}</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl"
                    >
                        <BarChart3 className="h-6 w-6 text-emerald-400 mb-4" />
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-1">Conversion Rate</p>
                        <span className="text-5xl font-bold">{conversionRate}%</span>
                    </motion.div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Recent Waitlist */}
                    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-white/60" /> Recent Signups
                        </h3>
                        <div className="space-y-4">
                            {data && data.waitlist.length > 0 ? (
                                data.waitlist.slice(0, 5).map((user, i) => (
                                    <div key={i} className="flex flex-col p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-indigo-400">@{user.username}</span>
                                            <span className="text-[10px] text-white/20 font-mono italic">
                                                {new Date(user.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-xs text-white/50 mb-2">{user.email}</p>
                                        <p className="text-xs italic text-white/40">&quot;{user.project}&quot;</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white/20 italic text-center py-8">No signups yet. Keep building.</p>
                            )}
                        </div>
                    </div>

                    {/* Interaction Logs */}
                    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-white/60" /> Interaction Logs
                        </h3>
                        <div className="space-y-3">
                            {data && data.events.length > 0 ? (
                                data.events.slice(0, 10).map((event, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{event.eventName}</span>
                                            <span className="text-[10px] text-white/30 uppercase tracking-tighter">{event.metadata || "/"}</span>
                                        </div>
                                        <span className="text-[10px] text-white/40 font-mono">
                                            {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white/20 italic text-center py-8">No clicks tracked. Are you instrumented?</p>
                            )}
                        </div>
                    </div>

                </div>

                {data?.mock && (
                    <div className="mt-12 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-center">
                        <p className="text-orange-400 text-sm font-medium">
                            📊 Note: Displaying mock/empty state. Configure `GOOGLE_SHEET_ID` and credentials to see real data.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
