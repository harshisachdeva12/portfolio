"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, Code2, Rocket, Briefcase, Download, Globe, Sparkles, Phone } from "lucide-react";

// ---------------------------------------------
// CONFIG — edit this data to personalize quickly
// ---------------------------------------------
const INFO = {
  name: "Your Name",
  role: "Engineer • Builder • Learner",
  location: "Phoenix, AZ",
  email: "you@example.com",
  phone: "+1 (555) 123-4567",
  resumeUrl: "/resume.pdf", // place your file in public/ or use a URL
  socials: {
    github: "https://github.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
};

const PROJECTS = [
  {
    title: "PawPal — Smart Collar Companion",
    blurb:
      "IoT + mobile dashboard for real‑time pet health, GPS, and activity tracking.",
    tags: ["IoT", "Next.js", "FastAPI", "Postgres"],
    link: "https://example.com/pawpal",
    repo: "https://github.com/username/pawpal",
  },
  {
    title: "Solar Cell Optimizer",
    blurb:
      "Interactive simulations to explore TOPCon vs Al‑BSF trade‑offs and visualize IV/QE curves.",
    tags: ["Python", "Streamlit", "Pandas"],
    link: "https://example.com/solar",
    repo: "https://github.com/username/solar-optimizer",
  },
  {
    title: "Secure Notes",
    blurb:
      "End‑to‑end encrypted notes with zero‑knowledge auth and offline sync.",
    tags: ["Rust", "Tauri", "React"],
    link: "https://example.com/secure-notes",
    repo: "https://github.com/username/secure-notes",
  },
];

const EXPERIENCE = [
  {
    company: "Oak Ridge National Laboratory (PCIP)",
    role: "Research Intern — Bioinformatics & AI/ML",
    period: "Jun 2024 – Aug 2024",
    points: [
      "Prototyped retrieval pipelines and docs IA for ESGF datasets.",
      "Accelerated data wrangling by 35% using vectorized routines.",
      "Shipped reproducible, containerized notebooks for HPC." ,
    ],
  },
  {
    company: "ASU — Capstone",
    role: "Gesture‑Controlled Laparoscopic Camera (Team)",
    period: "Jan 2025 – May 2025",
    points: [
      "Built embedded motor control & vision‑guided pointing.",
      "Led systems integration, testing, and documentation.",
    ],
  },
];

const SKILLS = [
  "Python", "C/C++", "Rust", "SwiftUI", "React/Next.js", "FastAPI", "Postgres",
  "Docker", "Kubernetes", "AWS", "HPC", "FPGA Basics", "Signal Processing",
];

// -------------------------
// UI helpers
// -------------------------
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

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

// -------------------------
// NAVBAR
// -------------------------
const Navbar: React.FC = () => (
  <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
    <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <a href="#home" className="font-bold tracking-tight text-lg flex items-center gap-2">
        <Sparkles className="w-5 h-5" /> <span>{INFO.name}</span>
      </a>
      <div className="hidden md:flex items-center gap-6 text-sm">
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#experience" className="hover:underline">Experience</a>
        <a href="#skills" className="hover:underline">Skills</a>
        <a href="#contact" className="hover:underline">Contact</a>
        <Button asChild className="rounded-2xl">
          <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
            <Download className="w-4 h-4 mr-2" /> Resume
          </a>
        </Button>
      </div>
      <div className="md:hidden">
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium">
          <Mail className="w-4 h-4"/> Contact
        </a>
      </div>
    </nav>
  </header>
);

// -------------------------
// HERO
// -------------------------
const Hero: React.FC = () => (
  <section id="home" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
    <motion.div initial="hidden" animate="show" variants={fade} className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {INFO.name}
        </h1>
        <p className="mt-3 text-xl text-neutral-600 dark:text-neutral-300">{INFO.role}</p>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          I build reliable, human‑centered software and systems — from fast frontends to
          robust backends and data pipelines. Curious by default, practical by design.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild className="rounded-2xl">
            <a href="#projects"><Rocket className="w-4 h-4 mr-2"/> See projects</a>
          </Button>
          <Button variant="outline" asChild className="rounded-2xl">
            <a href={INFO.socials.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2"/> GitHub</a>
          </Button>
          <Button variant="outline" asChild className="rounded-2xl">
            <a href={INFO.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4 mr-2"/> LinkedIn</a>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-600 dark:text-neutral-300">
          <span className="inline-flex items-center gap-2"><Globe className="w-4 h-4"/> {INFO.location}</span>
          <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4"/> {INFO.phone}</span>
          <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4"/> {INFO.email}</span>
        </div>
      </div>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950"
        >
          <div className="grid grid-cols-3 gap-3">
            {["Next.js", "FastAPI", "Rust", "AWS", "Docker", "Postgres", "SwiftUI", "HPC", "FPGA"].map((t) => (
              <Badge key={t} variant="secondary" className="justify-center py-2 text-xs rounded-xl">{t}</Badge>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5"/>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Shipping maintainable code, clear docs, and thoughtful UX.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

// -------------------------
// PROJECTS
// -------------------------
const Projects: React.FC = () => (
  <Section id="projects" title="Projects" icon={<Briefcase className="w-6 h-6"/>}>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((p) => (
        <Card key={p.title} className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              {p.title}
              <div className="flex items-center gap-2">
                <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex"><Github className="w-4 h-4"/></a>
                <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex"><ExternalLink className="w-4 h-4"/></a>
              </div>
            </CardTitle>
            <CardDescription>{p.blurb}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Badge key={t} variant="outline" className="rounded-xl">{t}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

// -------------------------
// EXPERIENCE
// -------------------------
const Experience: React.FC = () => (
  <Section id="experience" title="Experience" icon={<Briefcase className="w-6 h-6"/>}>
    <div className="space-y-4">
      {EXPERIENCE.map((e) => (
        <Card key={e.company} className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">{e.role}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{e.company}</span>
              <span className="text-neutral-400">•</span>
              <span>{e.period}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              {e.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

// -------------------------
// SKILLS
// -------------------------
const Skills: React.FC = () => (
  <Section id="skills" title="Skills" icon={<Rocket className="w-6 h-6"/>}>
    <div className="flex flex-wrap gap-2">
      {SKILLS.map((s) => (
        <Badge key={s} variant="secondary" className="rounded-xl py-2 px-3 text-sm">{s}</Badge>
      ))}
    </div>
  </Section>
);

// -------------------------
// CONTACT
// -------------------------
const Contact: React.FC = () => (
  <Section id="contact" title="Contact" icon={<Mail className="w-6 h-6"/>}>
    <Card className="rounded-2xl">
      <CardContent className="p-6">
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
          Want to collaborate, have a role in mind, or just say hi? Drop a note below
          or email me at <a className="underline" href={`mailto:${INFO.email}`}>{INFO.email}</a>.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget as HTMLFormElement);
            const payload = Object.fromEntries(data.entries());
            console.log("Contact form submitted", payload);
            alert("Thanks! Your message was captured locally. Hook this up to your backend/email.");
          }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Input name="name" placeholder="Your name" required className="rounded-xl"/>
          <Input name="email" type="email" placeholder="Email" required className="rounded-xl"/>
          <div className="md:col-span-2">
            <Textarea name="message" placeholder="Message" rows={5} required className="rounded-xl"/>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" className="rounded-2xl">Send <ArrowRight className="w-4 h-4 ml-2"/></Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </Section>
);

// -------------------------
// FOOTER
// -------------------------
const Footer: React.FC = () => (
  <footer className="py-10 border-t border-neutral-200 dark:border-neutral-800">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-sm text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-3">
      <p>© {new Date().getFullYear()} {INFO.name}. All rights reserved.</p>
      <div className="flex items-center gap-3">
        <a href={INFO.socials.github} target="_blank" rel="noreferrer" className="inline-flex"><Github className="w-4 h-4"/></a>
        <a href={INFO.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex"><Linkedin className="w-4 h-4"/></a>
        <a href={`mailto:${INFO.email}`} className="inline-flex"><Mail className="w-4 h-4"/></a>
      </div>
    </div>
  </footer>
);

// -------------------------
// ROOT COMPONENT
// -------------------------
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

// ---------------------------------------------
// QUICK START NOTES
// 1) Update INFO, PROJECTS, EXPERIENCE, SKILLS above.
// 2) Wire the contact form to your backend/email provider.
// 3) Add /public/resume.pdf or update INFO.resumeUrl.
// 4) Optional: convert this to Next.js page (app/page.tsx) or React SPA.
// 5) Tailwind utility classes + shadcn/ui ensure a clean, modern aesthetic.
// ---------------------------------------------
