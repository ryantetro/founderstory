"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { submitWaitlist } from "@/app/actions";
import { CheckCircle2, ChevronRight, Twitter, Copy, Check } from "lucide-react";

function WaitlistFormContent() {
    const searchParams = useSearchParams();
    const referrer = searchParams.get("ref") || "";

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [project, setProject] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [queuePosition, setQueuePosition] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("project", project);
        formData.append("referrer", referrer);

        try {
            const result = await submitWaitlist(formData);
            if (result.success) {
                setQueuePosition(result.position || null);
                setIsSuccess(true);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const referralLink = `founderstory.com?ref=${username}`;

    const tweetIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `I just secured my spot on https://founderstory.com. 📈\n\nMost people bury their progress in the feed. I’m building my legacy.\n\nIf you’re a builder, claim your handle before the next batch is full. 🫡\n\n#BuildInPublic #FounderStory`
    )}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex items-center bg-zinc-950 rounded-xl border border-white/10 overflow-hidden">
                                <span className="pl-4 text-white/40 font-medium whitespace-nowrap">founderstory.com/</span>
                                <input
                                    type="text"
                                    placeholder="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                    className="flex-grow bg-transparent py-4 px-1 text-white placeholder:text-white/20 focus:outline-none focus:ring-0 font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="What's your current project?"
                                required
                                value={project}
                                onChange={(e) => setProject(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            />
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                >
                                    {isSubmitting ? "Reserving..." : "Join"}
                                    {!isSubmitting && <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        {referrer && (
                            <p className="text-white/20 text-[10px] text-center uppercase tracking-widest font-bold">
                                Referred by {referrer}
                            </p>
                        )}
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-indigo-500/10"
                    >
                        <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12 transition-transform hover:rotate-0">
                            <CheckCircle2 className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Handle Secured.</h3>
                        <p className="text-white/60 text-sm mb-6 leading-relaxed">
                            Your spot for Founder Story is locked in. We’re currently onboarding in batches of 50 to keep quality high.
                            <br /><br />
                            You’re <span className="text-white font-bold bg-white/10 px-2 py-1 rounded">#{queuePosition || "..."}</span> in line.
                        </p>

                        <div className="space-y-4">
                            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Your Private Referral Link</p>
                                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2 overflow-hidden border border-white/5">
                                    <code className="text-[10px] text-white/60 flex-grow text-left truncate">{referralLink}</code>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                                    >
                                        {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-white/40" />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-white/30 italic">
                                    Share to jump 50 spots and get early beta access.
                                </p>
                            </div>

                            <a
                                href={tweetIntent}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-white text-black font-bold py-4 px-6 rounded-2xl hover:bg-zinc-200 transition-all shadow-lg"
                            >
                                <Twitter className="h-5 w-5" />
                                🚀 Move up the queue
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function WaitlistForm() {
    return (
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="h-8 w-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>}>
            <WaitlistFormContent />
        </Suspense>
    );
}
