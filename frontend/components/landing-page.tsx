"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  CheckCheck,
  Clock3,
  Copy,
  Globe2,
  Inbox,
  MailOpen,
  MoonStar,
  ShieldAlert,
  Sparkles,
  SunMedium,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Rule = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type Step = {
  number: string;
  title: string;
  description: string;
};

type PreviewMessage = {
  sender: string;
  subject: string;
  preview: string;
  time: string;
};

const domains = ["@smail.run", "@dropmail.one", "@relaydeck.cc", "@trialpost.app"];

const rules: Rule[] = [
  {
    eyebrow: "Public Mail",
    title: "Treat it like a throwaway inbox",
    description:
      "Anyone who knows the address can open the messages, so keep sensitive accounts and personal data out of it.",
    icon: ShieldAlert,
  },
  {
    eyebrow: "7-Day Cleanup",
    title: "Copy what you need before it expires",
    description:
      "Verification links, OTPs, and welcome mails are temporary here and should be saved before the inbox clears.",
    icon: Archive,
  },
  {
    eyebrow: "Fast Flow",
    title: "Pick a username and hit GO",
    description:
      "The reference flow is intentionally simple, so this redesign keeps the same speed while changing the whole presentation.",
    icon: Sparkles,
  },
];

const steps: Step[] = [
  {
    number: "01",
    title: "Type a username",
    description: "Choose any short handle for the public inbox you want to open.",
  },
  {
    number: "02",
    title: "Choose a domain",
    description: "Switch between disposable domains depending on the signup or test flow.",
  },
  {
    number: "03",
    title: "Read and move on",
    description: "Use the email for OTPs and signups, then let the inbox age out on its own.",
  },
];

const previewMessages: PreviewMessage[] = [
  {
    sender: "Linear",
    subject: "Your sign-in code is ready",
    preview: "Code 483271 expires in ten minutes.",
    time: "now",
  },
  {
    sender: "Raycast",
    subject: "Finish creating your account",
    preview: "Use the magic link from this public inbox.",
    time: "2m",
  },
  {
    sender: "Perplexity",
    subject: "Welcome to your free trial",
    preview: "Your temporary signup email worked perfectly.",
    time: "6m",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function normalizeUsername(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 24);
}

export default function LandingPage() {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [username, setUsername] = useState("signal-room");
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [launchedInbox, setLaunchedInbox] = useState(`signal-room${domains[0]}`);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const isDark = theme === "dark";
  const cleanedUsername = normalizeUsername(username);
  const nextUsername = cleanedUsername || "guest-loop";
  const pendingInbox = `${nextUsername}${selectedDomain}`;

  const handleLaunch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsername(nextUsername);
    setLaunchedInbox(pendingInbox);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(launchedInbox);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: isDark
      ? "radial-gradient(circle at 18% 18%, rgba(249, 115, 22, 0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(56, 189, 248, 0.18), transparent 18%), linear-gradient(135deg, #07111d 0%, #0f172a 52%, #101826 100%)"
      : "radial-gradient(circle at 20% 18%, rgba(234, 88, 12, 0.18), transparent 24%), radial-gradient(circle at 78% 20%, rgba(13, 148, 136, 0.18), transparent 18%), linear-gradient(135deg, #f4efe6 0%, #f3e7d1 52%, #f8f2e9 100%)",
  };

  const gridStyle = {
    backgroundImage: isDark
      ? "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)"
      : "linear-gradient(rgba(17,24,39,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.08) 1px, transparent 1px)",
    backgroundSize: "120px 120px",
  };

  const shellClass = isDark ? "bg-[#07111d] text-[#f8f3e9]" : "bg-[#f4efe6] text-[#17120f]";
  const panelClass = isDark
    ? "border-white/12 bg-[#0f1828]/85"
    : "border-black/10 bg-[#fffaf2]/88";
  const softPanelClass = isDark
    ? "border-white/12 bg-white/5"
    : "border-black/10 bg-black/[0.035]";
  const mutedTextClass = isDark ? "text-[#9cadc0]" : "text-[#615b53]";
  const strongMutedTextClass = isDark ? "text-[#d7dfeb]" : "text-[#302821]";
  const inputClass = isDark
    ? "border-white/12 bg-[#08111d] text-white placeholder:text-[#697b92]"
    : "border-black/10 bg-[#fffdf8] text-[#17120f] placeholder:text-[#7a736b]";
  const highlightCardClass = isDark
    ? "border-orange-300/20 bg-orange-300/10 text-orange-100"
    : "border-orange-600/15 bg-orange-500/10 text-orange-700";
  const accentButtonClass = isDark
    ? "border-transparent bg-[#f59e0b] text-[#08111d] hover:bg-[#f7b94c]"
    : "border-transparent bg-[#17120f] text-[#fff8ef] hover:bg-[#2f241e]";
  const subtleButtonClass = isDark
    ? "border-white/12 bg-white/6 text-white hover:bg-white/10 hover:text-white"
    : "border-black/10 bg-white/80 text-[#17120f] hover:bg-white hover:text-[#17120f]";

  return (
    <main className={cn("relative isolate min-h-screen overflow-hidden transition-colors duration-500", shellClass)}>
      <div aria-hidden="true" className="absolute inset-0" style={backgroundStyle} />
      <div aria-hidden="true" className="absolute inset-0 opacity-40" style={gridStyle} />
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl",
          isDark ? "bg-orange-400/12" : "bg-orange-500/10"
        )}
      />

      <section className="relative w-full px-6 pb-12 pt-6 sm:px-8 lg:px-10 lg:pb-16">
        <div className="flex items-center justify-end">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "rounded-full border p-2 transition-colors",
              isDark
                ? "border-white/12 bg-white/6 text-white hover:bg-white/10"
                : "border-black/10 bg-black/5 text-[#17120f] hover:bg-black/10"
            )}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunMedium className="size-5" />
            ) : (
              <MoonStar className="size-5" />
            )}
          </button>
        </div>

        <div className="grid gap-8 pt-10 w-full xl:items-start">

          <motion.div
            className="relative w-full"
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute -inset-4 rounded-[40px] border",
                isDark ? "border-white/8 bg-white/[0.03]" : "border-black/6 bg-white/30"
              )}
            />

            <motion.div
              className={cn(
                "relative overflow-hidden rounded-[34px] border p-5 shadow-[0_36px_90px_rgba(15,23,42,0.16)] backdrop-blur-2xl sm:p-6",
                panelClass
              )}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-24 opacity-80"
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(135deg, rgba(245,158,11,0.18), transparent 55%)"
                    : "linear-gradient(135deg, rgba(239,93,47,0.18), transparent 55%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 h-40 w-40 opacity-50"
                style={{
                  backgroundImage: isDark
                    ? "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 18px)"
                    : "repeating-linear-gradient(135deg, rgba(17,24,39,0.08) 0, rgba(17,24,39,0.08) 2px, transparent 2px, transparent 18px)",
                }}
              />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className={cn("text-xs uppercase tracking-[0.3em]", mutedTextClass)}>
                      Temp Mail Console
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">Open a public inbox in one move</h2>
                  </div>
                  <div className={cn("rounded-full border px-3 py-2 text-sm", softPanelClass)}>
                    No account needed
                  </div>
                </div>

                <form onSubmit={handleLaunch} className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className={cn("text-xs uppercase tracking-[0.28em]", mutedTextClass)}
                    >
                      Pick your username
                    </label>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <input
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(normalizeUsername(event.target.value))}
                        placeholder="get-your-username"
                        className={cn(
                          "h-14 flex-1 rounded-[20px] border px-4 text-base outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-400/40",
                          inputClass
                        )}
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        className={cn(
                          "h-14 rounded-[20px] px-7 text-base font-semibold shadow-none",
                          accentButtonClass
                        )}
                      >
                        GO
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                    <p className={cn("mt-3 text-sm", mutedTextClass)}>
                      Next address:
                      <span className={cn("ml-2 font-medium", strongMutedTextClass)}>{pendingInbox}</span>
                    </p>
                  </div>

                  <div>
                    <p className={cn("text-xs uppercase tracking-[0.28em]", mutedTextClass)}>
                      Rotate domains
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {domains.map((domain) => {
                        const active = selectedDomain === domain;

                        return (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => setSelectedDomain(domain)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-sm transition-colors",
                              active
                                ? isDark
                                  ? "border-[#f59e0b] bg-[#f59e0b] text-[#08111d]"
                                  : "border-[#17120f] bg-[#17120f] text-[#fff8ef]"
                                : softPanelClass
                            )}
                          >
                            {domain}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </form>

                <div
                  className={cn(
                    "mt-6 rounded-[24px] border p-4 text-sm leading-7",
                    isDark
                      ? "border-white/10 bg-[#08111d] text-[#d7dfeb]"
                      : "border-black/10 bg-[#fff4e8] text-[#302821]"
                  )}
                >
                  This is disposable mail for trials, signups, and verification flows.
                  Keep important accounts out of public inboxes.
                </div>

                <div className="mt-6 grid gap-4">
                  <motion.div
                    key={launchedInbox}
                    className={cn("rounded-[28px] border p-5", softPanelClass)}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className={cn("text-xs uppercase tracking-[0.28em]", mutedTextClass)}>
                          Active inbox
                        </p>
                        <p className="mt-2 text-lg font-semibold sm:text-xl">{launchedInbox}</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCopy}
                        className={cn("rounded-full px-5 shadow-none", subtleButtonClass)}
                      >
                        {copied ? <CheckCheck className="size-4" /> : <Copy className="size-4" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {previewMessages.map((message, index) => (
                        <motion.div
                          key={message.sender}
                          className={cn(
                            "rounded-[22px] border p-4 transition-transform",
                            isDark ? "border-white/8 bg-black/15" : "border-black/8 bg-white/75"
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <MailOpen className={cn("size-4 shrink-0", mutedTextClass)} />
                                <p className="font-medium">{message.sender}</p>
                              </div>
                              <p className="mt-2 text-sm font-medium">{message.subject}</p>
                              <p className={cn("mt-1 text-sm", mutedTextClass)}>{message.preview}</p>
                            </div>
                            <span className={cn("text-xs uppercase tracking-[0.24em]", mutedTextClass)}>
                              {message.time}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                 
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
