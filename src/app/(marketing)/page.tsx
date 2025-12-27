"use client";

import { motion } from "framer-motion";
import BentoGrid from "@/components/features/BentoGrid";
import SuccessPath from "@/components/features/SuccessPath";
import ImportHook from "@/components/features/ImportHook";
import WaitlistForm from "@/components/features/WaitlistForm";
import { trackEvent } from "@/app/actions";

export default function Home() {
  const headline = "The hard parts are the best parts. Don't forget them.";

  const words = headline.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as const,
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as const,
    },
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffdb] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl pt-16 pb-32 sm:pt-24 sm:pb-48 lg:pt-32 lg:pb-56 text-center">
        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => trackEvent("hero_badge_click")}
            className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-white/40 ring-1 ring-white/10 hover:ring-white/20 transition-all bg-white/5 cursor-pointer"
          >
            Build your legacy in real-time.{" "}
            <span className="font-semibold text-white">Join 500+ founders documenting the arena.</span>
          </motion.div>
        </div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8 flex flex-wrap justify-center gap-x-[0.2em] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
        >
          {words.map((word, index) => (
            <motion.span
              variants={child}
              key={index}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg leading-8 text-white/60 max-w-2xl mx-auto mb-12"
        >
          Every pivot, every server crash, and every first dollar is a milestone. Founder Story is the private diary and public legacy for the top 1% of builders.
        </motion.p>

        <motion.div
          id="waitlist"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <WaitlistForm />
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        <BentoGrid />
        <SuccessPath />
        <ImportHook />
      </div>

      {/* Bottom Glow */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
