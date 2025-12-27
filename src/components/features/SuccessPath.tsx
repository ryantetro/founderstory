"use client";

import { motion } from "framer-motion";
import { Plus, Zap, TrendingUp, AlertCircle, Share2, MousePointer2 } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Log the Moment",
        description: "Post a milestone in 10 seconds. Whether it's a screenshot of a build error or a Stripe notification, just drop it in. Private for you, or public for your legacy.",
        visual: (
            <div className="relative h-48 w-full bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-2 w-24 bg-white/10 rounded-full" />
                    <Plus className="h-5 w-5 text-white/20" />
                </div>
                <div className="space-y-3">
                    <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10 p-3 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <div className="h-2 w-32 bg-white/20 rounded-full" />
                    </div>
                    <div className="h-20 w-full bg-white/5 rounded-lg border border-white/10 p-3">
                        <div className="h-2 w-3/4 bg-white/10 rounded-full mb-2" />
                        <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 h-8 w-20 bg-white rounded-lg flex items-center justify-center">
                    <div className="h-2 w-10 bg-black/50 rounded-full" />
                </div>
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 text-white/20"
                >
                    <MousePointer2 className="h-6 w-6" />
                </motion.div>
            </div>
        )
    },
    {
        id: 2,
        title: "Contextualize the Pivot",
        description: "Founder Story connects the dots. Tag your milestones as 'Wins,' 'Pivots,' or 'Hard Truths.' Watch your messy history turn into a structured narrative of growth.",
        visual: (
            <div className="relative h-48 w-full bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center gap-4">
                <TagIcon icon={<TrendingUp />} color="text-emerald-400" label="Win" delay={0} />
                <TagIcon icon={<Zap />} color="text-amber-400" label="Pivot" delay={0.2} active />
                <TagIcon icon={<AlertCircle />} color="text-indigo-400" label="Hard Truth" delay={0.4} />
            </div>
        )
    },
    {
        id: 3,
        title: "Share the Proof",
        description: "Your unique founderstory.com/handle is your new resume. When investors or collaborators ask what you've done, show them the arena, not just the exit.",
        visual: (
            <div className="relative h-48 w-full bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden p-4">
                <div className="h-full w-full bg-black rounded-xl border border-white/10 p-3 relative">
                    <div className="flex items-center gap-1.5 mb-4">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500/50" />
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500/50" />
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 w-1/2 bg-white/20 rounded-full" />
                        <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
                        <div className="h-20 w-full bg-white/5 rounded-lg" />
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 px-4">
                        <div className="h-10 w-full bg-white text-black rounded-lg flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest">
                            <Share2 className="h-3 w-3" /> Share to Twitter
                        </div>
                    </div>
                </div>
            </div>
        )
    }
];

function TagIcon({ icon, color, label, delay, active }: { icon: React.ReactNode, color: string, label: string, delay: number, active?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className={`flex flex-col items-center gap-2 group cursor-default`}
        >
            <div className={`h-12 w-12 rounded-xl bg-black border ${active ? 'border-white/40 ring-4 ring-white/5' : 'border-white/10 group-hover:border-white/20'} flex items-center justify-center transition-all ${active ? color : 'text-white/20 group-hover:text-white'}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tighter ${active ? 'text-white' : 'text-white/20'}`}>{label}</span>
        </motion.div>
    );
}

export default function SuccessPath() {
    return (
        <div className="py-24 relative">
            <div className="text-center mb-20 px-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                    From Chaos to Clarity.
                </h2>
                <p className="text-white/40 max-w-2xl mx-auto font-medium">
                    A three-step success path to turn your messy building history into a structured narrative of institutional-grade growth.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="group"
                    >
                        <div className="mb-8">
                            {step.visual}
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-6 w-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40 group-hover:text-white transition-colors">
                                {step.id}
                            </span>
                            <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
