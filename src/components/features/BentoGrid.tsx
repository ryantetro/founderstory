import { motion } from "framer-motion";
import { Coffee, TrendingUp, Ghost, ArrowRight, Activity } from "lucide-react";
import { trackEvent } from "@/app/actions";

export default function BentoGrid() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            {/* The High: First $100 Day */}
            <motion.div
                variants={item}
                className="bento-card col-span-1 md:col-span-1 min-h-[300px] flex flex-col justify-between group cursor-pointer"
                onClick={() => trackEvent("bento_card_click", "The High")}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Coffee className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">The High</p>
                            <p className="text-xs text-white/50">First $100 Day</p>
                        </div>
                    </div>
                    <Activity className="h-4 w-4 text-white/30" />
                </div>
                <div className="flex-grow flex flex-col justify-center gap-4">
                    <div className="relative aspect-video rounded-xl bg-white/5 overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors flex items-center justify-center">
                        <p className="text-3xl font-bold text-white">$100.00</p>
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                            <TrendingUp className="h-3 w-3" /> Stripe Live
                        </div>
                    </div>
                    <p className="text-sm text-white/70 italic leading-relaxed">
                        &quot;Woke up to the first $100 day. Bought a celebratory coffee and finally felt like this might actually work.&quot;
                    </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex gap-4 text-xs text-white/50">
                    <span>Dec 24, 2025</span>
                    <span>1.2k Revenue</span>
                </div>
            </motion.div>

            {/* The Low: The Pivot */}
            <motion.div
                variants={item}
                className="bento-card col-span-1 md:col-span-1 flex flex-col items-center justify-center text-center group cursor-pointer"
                onClick={() => trackEvent("bento_card_click", "The Low")}
            >
                <div className="h-14 w-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Ghost className="h-8 w-8 text-zinc-500" />
                </div>
                <h3 className="text-white/50 text-sm font-medium uppercase tracking-widest mb-2">The Low</h3>
                <p className="text-2xl font-bold text-white tracking-tight px-4 leading-tight mb-4">
                    &quot;Signup Momentum didn&apos;t work.&quot;
                </p>
                <p className="text-white/40 text-xs px-6">
                    It hurt, but the failure was the seed for Founder Story. Moving fast, documenting the hurt.
                </p>
                <div className="mt-8 flex items-center justify-center text-indigo-400 text-xs font-semibold gap-2 border border-indigo-500/20 rounded-full px-4 py-1.5 bg-indigo-500/5">
                    Pivoting to Founder Story <ArrowRight className="h-3 w-3" />
                </div>
            </motion.div>

            {/* The Win: 1,000 Visitors */}
            <motion.div
                variants={item}
                className="bento-card col-span-1 md:col-span-1 flex flex-col justify-between group cursor-pointer"
                onClick={() => trackEvent("bento_card_click", "The Win")}
            >
                <div>
                    <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mb-4">
                        The Win
                    </div>
                    <h3 className="text-xl font-bold mb-2">1,000 Visitors</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                        Total of 1,142 unique visitors in the last 24 hours. The validation is real.
                    </p>
                    <div className="relative h-24 w-full bg-zinc-900 rounded-lg overflow-hidden border border-white/5 flex items-end">
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-emerald-500/20 to-transparent" />
                        <div className="flex items-end gap-[2px] w-full px-2 pb-2 h-full">
                            {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100, 85, 95].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 1 + i * 0.05 }}
                                    className="flex-grow bg-emerald-500/40 rounded-t-[1px]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-white/40 font-mono italic">Vercel Analytics</span>
                    <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <ArrowRight className="h-4 w-4 text-white/60" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
