"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Mail, MessageSquare, Sparkles, Quote, MapPin, Briefcase } from "lucide-react";

// ------------------------------------------------------------------
// Portfolio: Rajni Sachdeva — Next.js + Tailwind + shadcn/ui (App Router)
// Paste this file into: src/app/page.tsx
// Make sure you've installed shadcn/ui components:
//   npx shadcn@latest add button card badge input textarea separator
// Also: npm i framer-motion lucide-react
// ------------------------------------------------------------------

// Theme helper — subtle day→night landscape stripes inspired by the reference image
const ThemeBanner: React.FC = () => (
  <div className="w-full">
    <div
      className="h-40 md:h-56 w-full rounded-b-3xl border-b border-neutral-200 dark:border-neutral-800"
      style={{
        background:
          "linear-gradient(180deg,#fde68a 0%,#fde68a 22%,#a7f3d0 22%,#a7f3d0 44%,#93c5fd 44%,#93c5fd 66%,#c4b5fd 66%,#c4b5fd 88%,#60a5fa 88%,#60a5fa 100%)",
      }}
    />
  </div>
);

const fade = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

// -------------------------
// DATA
// -------------------------
const INFO = {
  name: "Rajni Sachdeva",
  title: "Global Connector, Development Strategist, and Partnership Builder",
  tagline:
    "International development leader building bridges between governments, businesses, and communities through sustainable partnerships. Driven by the vision of borderless shared prosperity for all.",
  location: "Auckland • Global",
  email: "rajnisachdeva@rediffmail.com",
};

const PROJECTS = [
  {
    title: "COP Buddy — Intergenerational Community Program",
    summary:
      "Community-led programme strengthening support systems for vulnerable communities — senior citizens and young adults in juvenile correction centres. Restorative, communication-first model that rebuilds compassion between generations. Pilot completed in Auckland with strong success; replicable and scalable.",
    tags: ["Sustainable Development", "Community", "Intergenerational"],
  },
  {
    title: "Apple Production Improvement — Himachal Pradesh (India)",
    summary:
      "Facilitated G2G partnership with World Bank & ADB support to share best practices, improving yield and livelihoods while creating jobs. Replicable model extendable to other agricultural interventions; scalable across regions.",
    tags: ["Agriculture", "G2G Partnership", "Livelihoods"],
  },
  {
    title: "Cross‑Sector Feasibility Studies",
    summary:
      "Completed studies across Education, Agriculture, Urban Planning, Smart Cities, and Climate Change that already drive sustainable development and growth for institutions and corporates across borders.",
    tags: ["Education", "Urban Planning", "Smart Cities", "Climate"],
  },
];

// -------------------------
// REVIEWS (client‑side only; persisted in localStorage)
// -------------------------
interface Review { name: string; message: string; date: string }

const ReviewsBlock: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("rs_reviews") : null;
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim() || "Anonymous";
    const message = (data.get("message") as string)?.trim();
    if (!message) return;
    setSubmitting(true);
    const entry: Review = { name, message, date: new Date().toISOString() };
    const next = [entry, ...reviews].slice(0, 200);
    setReviews(next);
    if (typeof window !== "undefined") localStorage.setItem("rs_reviews", JSON.stringify(next));
    (e.currentTarget as HTMLFormElement).reset();
    setSubmitting(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5"/>Leave a Comment / Review</CardTitle>
          <CardDescription>Your thoughts help shape better partnerships and programs.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input name="name" placeholder="Your name (optional)" className="rounded-xl"/>
            <Textarea name="message" placeholder="Your message" rows={5} required className="rounded-xl"/>
            <div className="flex justify-end">
              <Button type="submit" disabled={submitting} className="rounded-2xl">{submitting ? "Sending…" : "Post"}</Button>
            </div>
          </form>
          <p className="text-xs text-neutral-500 mt-3">Stored locally in your browser. For public collection, connect a backend (e.g., Supabase, Firebase, or an email webhook).</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Quote className="w-5 h-5"/>Recent Comments</CardTitle>
          <CardDescription>Newest first</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-neutral-600 dark:text-neutral-300">No comments yet. Be the first to share your thoughts.</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{r.name || "Anonymous"}</span>
                  <span>{new Date(r.date).toLocaleString()}</span>
                </div>
                <p className="mt-2 text-sm whitespace-pre-wrap">{r.message}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// -------------------------
// SECTIONS
// -------------------------
const Section: React.FC<{ id: string; title: string; icon?: React.ReactNode; children: React.ReactNode }>=({ id, title, icon, children })=>{
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
        <div className="flex items-center gap-2 mb-6">
          {icon}
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
};

const Navbar: React.FC = () => (
  <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
    <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <a href="#home" className="font-bold tracking-tight text-lg flex items-center gap-2">
        <Sparkles className="w-5 h-5" /> <span>{INFO.name}</span>
      </a>
      <div className="hidden md:flex items-center gap-6 text-sm">
        <a href="#about" className="hover:underline">About</a>
        <a href="#professional" className="hover:underline">Professional Development</a>
        <a href="#reflections" className="hover:underline">Reflections</a>
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>
    </nav>
  </header>
);

const Hero: React.FC = () => (
  <section id="home" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <ThemeBanner />
    <div className="py-10 md:py-12">
      <motion.div initial="hidden" animate="show" variants={fade}>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">{INFO.name}</h1>
        <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">{INFO.title}</p>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300">{INFO.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
          <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4"/> {INFO.location}</span>
          <a className="inline-flex items-center gap-2 underline" href={`mailto:${INFO.email}`}><Mail className="w-4 h-4"/> {INFO.email}</a>
        </div>
      </motion.div>
    </div>
  </section>
);

// About Me
const About: React.FC = () => (
  <Section id="about" title="About me" icon={<Sparkles className="w-6 h-6"/>}>
    <Card className="rounded-2xl">
      <CardContent className="p-6 text-neutral-800 dark:text-neutral-200">
        <p>
          I am an international development leader making active contributions by
          building bridges between governments, businesses, and communities
          through sustainable partnerships. My work is driven by a vision of
          borderless, shared prosperity for all.
        </p>
      </CardContent>
    </Card>
  </Section>
);

// Professional Development
const Professional: React.FC = () => (
  <Section id="professional" title="Professional development" icon={<Briefcase className="w-6 h-6"/>}>
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Connector & Strategist</CardTitle>
          <CardDescription>Governments • Businesses • Communities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            I facilitate high‑trust partnerships and design scalable, sustainable
            programmes that improve livelihoods and unlock shared value.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Partnerships", "Strategy", "Programme Design", "Impact"].map((t)=> (
              <Badge key={t} variant="secondary" className="rounded-xl">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Focus</CardTitle>
          <CardDescription>Sustainable Development • Agriculture • Communities</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Co‑creating interventions with local stakeholders.</li>
            <li>Scaling pilots to policy and regional implementation.</li>
            <li>Embedding monitoring, learning & evaluation.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </Section>
);

// Reflections + Input from people (reviews)
const Reflections: React.FC = () => (
  <Section id="reflections" title="Reflections" icon={<Quote className="w-6 h-6"/>}>
    <div className="space-y-6">
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <p className="text-neutral-800 dark:text-neutral-200">
            Learning travels both ways. Reflections here capture lessons from
            field practice, cross‑sector collaboration, and the quiet craft of
            sustaining partnerships over time.
          </p>
        </CardContent>
      </Card>
      <ReviewsBlock />
    </div>
  </Section>
);

// Projects
const Projects: React.FC = () => (
  <Section id="projects" title="Projects" icon={<Briefcase className="w-6 h-6"/>}>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((p) => (
        <Card key={p.title} className="rounded-2xl">
          <CardHeader>
            <CardTitle>{p.title}</CardTitle>
            <CardDescription>{p.tags.join(" • ")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-800 dark:text-neutral-200">{p.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

// Contact
const Contact: React.FC = () => (
  <Section id="contact" title="Contact" icon={<Mail className="w-6 h-6"/>}>
    <Card className="rounded-2xl">
      <CardContent className="p-6">
        <p className="mb-4">No phone listed. Please reach out via email:</p>
        <a className="inline-flex items-center gap-2 underline text-lg" href={`mailto:${INFO.email}`}>
          <Mail className="w-5 h-5"/> {INFO.email}
        </a>
      </CardContent>
    </Card>
  </Section>
);

const Footer: React.FC = () => (
  <footer className="py-10 border-t border-neutral-200 dark:border-neutral-800">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-sm text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-3">
      <p>© {new Date().getFullYear()} {INFO.name}. All rights reserved.</p>
      <a className="underline" href={`mailto:${INFO.email}`}>{INFO.email}</a>
    </div>
  </footer>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar />
      <Hero />
      <About />
      <Professional />
      <Reflections />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
