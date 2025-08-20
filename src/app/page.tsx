 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/app/page.tsx b/src/app/page.tsx
index 14c327efcc616321f572c15240ba3342d08974ed..8f1c340c87b8387fc7ec03762245eca19261e0a3 100644
--- a/src/app/page.tsx
+++ b/src/app/page.tsx
@@ -1,338 +1,217 @@
 "use client";
-import React from "react";
-import { motion } from "framer-motion";
+
+import React, { useEffect, useState } from "react";
+import { Mail, User, Briefcase, BookOpen, MessageSquare, FolderOpen } from "lucide-react";
 import { Button } from "@/components/ui/button";
-import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
-import { Badge } from "@/components/ui/badge";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
-import { Separator } from "@/components/ui/separator";
-import { Github, Linkedin, Mail, ArrowRight, ExternalLink, Code2, Rocket, Briefcase, Download, Globe, Sparkles, Phone } from "lucide-react";
+import { Card, CardContent } from "@/components/ui/card";
 
-// ---------------------------------------------
-// CONFIG — edit this data to personalize quickly
-// ---------------------------------------------
 const INFO = {
-  name: "Your Name",
-  role: "Engineer • Builder • Learner",
-  location: "Phoenix, AZ",
-  email: "you@example.com",
-  phone: "+1 (555) 123-4567",
-  resumeUrl: "/resume.pdf", // place your file in public/ or use a URL
-  socials: {
-    github: "https://github.com/username",
-    linkedin: "https://www.linkedin.com/in/username/",
-  },
+  name: "Rajni Sachdeva",
+  title: "Global Connector, Development Strategist, and Partnership Builder",
+  about:
+    "I am international development leader. Making my active contribution by building bridges between governments, businesses & communities through sustainable partnerships. Driven by the vision of borderless shared prosperity for all.",
+  email: "rajnisachdeva@rediffmail.com",
 };
 
 const PROJECTS = [
   {
-    title: "PawPal — Smart Collar Companion",
-    blurb:
-      "IoT + mobile dashboard for real‑time pet health, GPS, and activity tracking.",
-    tags: ["IoT", "Next.js", "FastAPI", "Postgres"],
-    link: "https://example.com/pawpal",
-    repo: "https://github.com/username/pawpal",
+    title: "COP Buddy",
+    description:
+      "Intergenerational project named COP Buddy, a community led programme meant for strengthening the support system for vulnerable communities mainly senior citizens and the young adults in juvenile correction centres. The project was driven by sole aim to bring positive change by reactivating the golden touch from the era where grandparents used to imbibe ‘moral values’ through their developmental years. As the urbanisation made ways for nuclear family setups, there are few explicit cracks in the societal fabric. The COP Buddy project helped to build the bridge of compassion and sensitivity through communication and engagement between the two groups. It was not a ‘quick fix’ but a restorative, community-focused solution to bring long-term value to the two strong pillars of our society - the younger and older segments. The project pilot was completed with strong success and was done in Auckland. It is a replicable and scalable business model",
   },
   {
-    title: "Solar Cell Optimizer",
-    blurb:
-      "Interactive simulations to explore TOPCon vs Al‑BSF trade‑offs and visualize IV/QE curves.",
-    tags: ["Python", "Streamlit", "Pandas"],
-    link: "https://example.com/solar",
-    repo: "https://github.com/username/solar-optimizer",
+    title: "Apple production improvement in Himachal Pradesh",
+    description:
+      "G2G partnership was facilitated with support from World Bank and ADB. The partnership enabled sharing of knowledge and best practices to improve production yield of apples. It also enabled process of improving livelihoods for people of Himachal Pradesh and created jobs for many. It is a replicable model that can be leveraged for other agricultural improvements and interventions. The model is fully scalable across regions.",
   },
   {
-    title: "Secure Notes",
-    blurb:
-      "End‑to‑end encrypted notes with zero‑knowledge auth and offline sync.",
-    tags: ["Rust", "Tauri", "React"],
-    link: "https://example.com/secure-notes",
-    repo: "https://github.com/username/secure-notes",
+    title: "Feasibility studies",
+    description:
+      "Several feasibility studies across Education, Agriculture, Urban Planning and Smart Cities and Climate change are completed that are already driving sustainable development and growth for institutions and corporates across different country borders.",
   },
 ];
 
-const EXPERIENCE = [
-  {
-    company: "Oak Ridge National Laboratory (PCIP)",
-    role: "Research Intern — Bioinformatics & AI/ML",
-    period: "Jun 2024 – Aug 2024",
-    points: [
-      "Prototyped retrieval pipelines and docs IA for ESGF datasets.",
-      "Accelerated data wrangling by 35% using vectorized routines.",
-      "Shipped reproducible, containerized notebooks for HPC." ,
-    ],
-  },
-  {
-    company: "ASU — Capstone",
-    role: "Gesture‑Controlled Laparoscopic Camera (Team)",
-    period: "Jan 2025 – May 2025",
-    points: [
-      "Built embedded motor control & vision‑guided pointing.",
-      "Led systems integration, testing, and documentation.",
-    ],
-  },
-];
-
-const SKILLS = [
-  "Python", "C/C++", "Rust", "SwiftUI", "React/Next.js", "FastAPI", "Postgres",
-  "Docker", "Kubernetes", "AWS", "HPC", "FPGA Basics", "Signal Processing",
-];
-
-// -------------------------
-// UI helpers
-// -------------------------
-const fade = {
-  hidden: { opacity: 0, y: 12 },
-  show: { opacity: 1, y: 0 },
-};
-
-const Section: React.FC<{ id: string; title: string; icon?: React.ReactNode; children: React.ReactNode }>=({ id, title, icon, children })=>{
-  return (
-    <section id={id} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
-      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
-        <div className="flex items-center gap-2 mb-6">
-          {icon}
-          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
-        </div>
-        {children}
-      </motion.div>
-    </section>
-  );
-};
+const Section: React.FC<{ id: string; title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({
+  id,
+  title,
+  icon,
+  children,
+}) => (
+  <section id={id} className="mx-auto max-w-4xl px-4 py-12">
+    <div className="bg-white/80 dark:bg-neutral-900/80 rounded-2xl p-6 backdrop-blur">
+      <div className="flex items-center gap-2 mb-4">
+        {icon}
+        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
+      </div>
+      {children}
+    </div>
+  </section>
+);
 
-// -------------------------
-// NAVBAR
-// -------------------------
 const Navbar: React.FC = () => (
   <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
-    <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
-      <a href="#home" className="font-bold tracking-tight text-lg flex items-center gap-2">
-        <Sparkles className="w-5 h-5" /> <span>{INFO.name}</span>
-      </a>
-      <div className="hidden md:flex items-center gap-6 text-sm">
-        <a href="#projects" className="hover:underline">Projects</a>
-        <a href="#experience" className="hover:underline">Experience</a>
-        <a href="#skills" className="hover:underline">Skills</a>
-        <a href="#contact" className="hover:underline">Contact</a>
-        <Button asChild className="rounded-2xl">
-          <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
-            <Download className="w-4 h-4 mr-2" /> Resume
-          </a>
-        </Button>
-      </div>
-      <div className="md:hidden">
-        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium">
-          <Mail className="w-4 h-4"/> Contact
+    <nav className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
+      <span className="font-bold tracking-tight text-lg">{INFO.name}</span>
+      <div className="hidden md:flex items-center gap-4 text-sm">
+        <a href="#about" className="hover:underline">
+          About
+        </a>
+        <a href="#professional" className="hover:underline">
+          Professional development
+        </a>
+        <a href="#reflections" className="hover:underline">
+          Reflections
+        </a>
+        <a href="#projects" className="hover:underline">
+          Projects
+        </a>
+        <a href="#contact" className="hover:underline">
+          Contact
         </a>
       </div>
     </nav>
   </header>
 );
 
-// -------------------------
-// HERO
-// -------------------------
-const Hero: React.FC = () => (
-  <section id="home" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
-    <motion.div initial="hidden" animate="show" variants={fade} className="grid md:grid-cols-2 gap-8 items-center">
-      <div>
-        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
-          {INFO.name}
-        </h1>
-        <p className="mt-3 text-xl text-neutral-600 dark:text-neutral-300">{INFO.role}</p>
-        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
-          I build reliable, human‑centered software and systems — from fast frontends to
-          robust backends and data pipelines. Curious by default, practical by design.
-        </p>
-        <div className="mt-6 flex flex-wrap items-center gap-3">
-          <Button asChild className="rounded-2xl">
-            <a href="#projects"><Rocket className="w-4 h-4 mr-2"/> See projects</a>
-          </Button>
-          <Button variant="outline" asChild className="rounded-2xl">
-            <a href={INFO.socials.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2"/> GitHub</a>
-          </Button>
-          <Button variant="outline" asChild className="rounded-2xl">
-            <a href={INFO.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4 mr-2"/> LinkedIn</a>
-          </Button>
-        </div>
-        <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-600 dark:text-neutral-300">
-          <span className="inline-flex items-center gap-2"><Globe className="w-4 h-4"/> {INFO.location}</span>
-          <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4"/> {INFO.phone}</span>
-          <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4"/> {INFO.email}</span>
-        </div>
-      </div>
-      <div className="relative">
-        <motion.div
-          initial={{ opacity: 0, scale: 0.95 }}
-          animate={{ opacity: 1, scale: 1 }}
-          transition={{ duration: 0.6 }}
-          className="rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950"
-        >
-          <div className="grid grid-cols-3 gap-3">
-            {["Next.js", "FastAPI", "Rust", "AWS", "Docker", "Postgres", "SwiftUI", "HPC", "FPGA"].map((t) => (
-              <Badge key={t} variant="secondary" className="justify-center py-2 text-xs rounded-xl">{t}</Badge>
-            ))}
-          </div>
-          <Separator className="my-6" />
-          <div className="flex items-center gap-3">
-            <Code2 className="w-5 h-5"/>
-            <p className="text-sm text-neutral-600 dark:text-neutral-300">
-              Shipping maintainable code, clear docs, and thoughtful UX.
-            </p>
-          </div>
-        </motion.div>
-      </div>
-    </motion.div>
-  </section>
+const About: React.FC = () => (
+  <Section id="about" title="About me" icon={<User className="w-6 h-6" />}> 
+    <p className="font-medium mb-4">{INFO.title}</p>
+    <p>{INFO.about}</p>
+  </Section>
 );
 
-// -------------------------
-// PROJECTS
-// -------------------------
-const Projects: React.FC = () => (
-  <Section id="projects" title="Projects" icon={<Briefcase className="w-6 h-6"/>}>
-    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
-      {PROJECTS.map((p) => (
-        <Card key={p.title} className="rounded-2xl">
-          <CardHeader>
-            <CardTitle className="flex items-center justify-between gap-2">
-              {p.title}
-              <div className="flex items-center gap-2">
-                <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex"><Github className="w-4 h-4"/></a>
-                <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex"><ExternalLink className="w-4 h-4"/></a>
-              </div>
-            </CardTitle>
-            <CardDescription>{p.blurb}</CardDescription>
-          </CardHeader>
-          <CardContent>
-            <div className="flex flex-wrap gap-2">
-              {p.tags.map((t) => (
-                <Badge key={t} variant="outline" className="rounded-xl">{t}</Badge>
-              ))}
-            </div>
-          </CardContent>
-        </Card>
-      ))}
-    </div>
+const Professional: React.FC = () => (
+  <Section id="professional" title="Professional development" icon={<Briefcase className="w-6 h-6" />}> 
+    <p>
+      Throughout my career I have facilitated cross‑border partnerships and
+      led initiatives that empower communities and institutions to grow
+      sustainably.
+    </p>
   </Section>
 );
 
-// -------------------------
-// EXPERIENCE
-// -------------------------
-const Experience: React.FC = () => (
-  <Section id="experience" title="Experience" icon={<Briefcase className="w-6 h-6"/>}>
+const InputFromPeople: React.FC = () => {
+  const [comments, setComments] = useState<{ name: string; message: string }[]>([]);
+
+  useEffect(() => {
+    const stored = window.localStorage.getItem("comments");
+    if (stored) {
+      setComments(JSON.parse(stored));
+    }
+  }, []);
+
+  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
+    e.preventDefault();
+    const data = new FormData(e.currentTarget);
+    const newComment = {
+      name: data.get("name") as string,
+      message: data.get("message") as string,
+    };
+    const updated = [...comments, newComment];
+    setComments(updated);
+    window.localStorage.setItem("comments", JSON.stringify(updated));
+    e.currentTarget.reset();
+  };
+
+  return (
     <div className="space-y-4">
-      {EXPERIENCE.map((e) => (
-        <Card key={e.company} className="rounded-2xl">
-          <CardHeader>
-            <CardTitle className="text-xl">{e.role}</CardTitle>
-            <CardDescription className="flex flex-wrap items-center gap-2">
-              <span className="font-medium">{e.company}</span>
-              <span className="text-neutral-400">•</span>
-              <span>{e.period}</span>
-            </CardDescription>
-          </CardHeader>
-          <CardContent>
-            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
-              {e.points.map((pt, i) => (
-                <li key={i}>{pt}</li>
-              ))}
-            </ul>
-          </CardContent>
-        </Card>
-      ))}
+      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
+        <Input name="name" placeholder="Your name" required className="rounded-xl" />
+        <div className="md:col-span-2">
+          <Textarea
+            name="message"
+            placeholder="Comment"
+            rows={3}
+            required
+            className="rounded-xl"
+          />
+        </div>
+        <div className="md:col-span-2 flex justify-end">
+          <Button type="submit" className="rounded-xl">
+            Submit
+          </Button>
+        </div>
+      </form>
+      <div className="space-y-2">
+        {comments.map((c, i) => (
+          <Card key={i} className="rounded-xl">
+            <CardContent className="p-4">
+              <p className="font-medium">{c.name}</p>
+              <p className="text-sm text-neutral-700 dark:text-neutral-300">
+                {c.message}
+              </p>
+            </CardContent>
+          </Card>
+        ))}
+      </div>
+    </div>
+  );
+};
+
+const Reflections: React.FC = () => (
+  <Section
+    id="reflections"
+    title="Reflections"
+    icon={<BookOpen className="w-6 h-6" />}
+  >
+    <p className="mb-6">
+      Reflections on building sustainable partnerships and empowering
+      communities across borders.
+    </p>
+    <div className="mb-4 flex items-center gap-2">
+      <MessageSquare className="w-5 h-5" />
+      <h3 className="text-lg font-medium">Input from people</h3>
     </div>
+    <InputFromPeople />
   </Section>
 );
 
-// -------------------------
-// SKILLS
-// -------------------------
-const Skills: React.FC = () => (
-  <Section id="skills" title="Skills" icon={<Rocket className="w-6 h-6"/>}>
-    <div className="flex flex-wrap gap-2">
-      {SKILLS.map((s) => (
-        <Badge key={s} variant="secondary" className="rounded-xl py-2 px-3 text-sm">{s}</Badge>
+const Projects: React.FC = () => (
+  <Section id="projects" title="Projects" icon={<FolderOpen className="w-6 h-6" />}> 
+    <div className="space-y-6">
+      {PROJECTS.map((p) => (
+        <Card key={p.title} className="rounded-xl">
+          <CardContent className="p-6 space-y-2">
+            <h3 className="text-xl font-semibold">{p.title}</h3>
+            <p className="text-sm text-neutral-700 dark:text-neutral-300">
+              {p.description}
+            </p>
+          </CardContent>
+        </Card>
       ))}
     </div>
   </Section>
 );
 
-// -------------------------
-// CONTACT
-// -------------------------
 const Contact: React.FC = () => (
-  <Section id="contact" title="Contact" icon={<Mail className="w-6 h-6"/>}>
-    <Card className="rounded-2xl">
-      <CardContent className="p-6">
-        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
-          Want to collaborate, have a role in mind, or just say hi? Drop a note below
-          or email me at <a className="underline" href={`mailto:${INFO.email}`}>{INFO.email}</a>.
-        </p>
-        <form
-          onSubmit={(e) => {
-            e.preventDefault();
-            const data = new FormData(e.currentTarget as HTMLFormElement);
-            const payload = Object.fromEntries(data.entries());
-            console.log("Contact form submitted", payload);
-            alert("Thanks! Your message was captured locally. Hook this up to your backend/email.");
-          }}
-          className="grid md:grid-cols-2 gap-4"
-        >
-          <Input name="name" placeholder="Your name" required className="rounded-xl"/>
-          <Input name="email" type="email" placeholder="Email" required className="rounded-xl"/>
-          <div className="md:col-span-2">
-            <Textarea name="message" placeholder="Message" rows={5} required className="rounded-xl"/>
-          </div>
-          <div className="md:col-span-2 flex justify-end">
-            <Button type="submit" className="rounded-2xl">Send <ArrowRight className="w-4 h-4 ml-2"/></Button>
-          </div>
-        </form>
-      </CardContent>
-    </Card>
+  <Section id="contact" title="Contact" icon={<Mail className="w-6 h-6" />}> 
+    <p>
+      You can reach me at {" "}
+      <a href={`mailto:${INFO.email}`} className="underline">
+        {INFO.email}
+      </a>
+      .
+    </p>
   </Section>
 );
 
-// -------------------------
-// FOOTER
-// -------------------------
-const Footer: React.FC = () => (
-  <footer className="py-10 border-t border-neutral-200 dark:border-neutral-800">
-    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-sm text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-3">
-      <p>© {new Date().getFullYear()} {INFO.name}. All rights reserved.</p>
-      <div className="flex items-center gap-3">
-        <a href={INFO.socials.github} target="_blank" rel="noreferrer" className="inline-flex"><Github className="w-4 h-4"/></a>
-        <a href={INFO.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex"><Linkedin className="w-4 h-4"/></a>
-        <a href={`mailto:${INFO.email}`} className="inline-flex"><Mail className="w-4 h-4"/></a>
-      </div>
-    </div>
-  </footer>
-);
-
-// -------------------------
-// ROOT COMPONENT
-// -------------------------
-export default function Portfolio() {
+export default function Home() {
   return (
-    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
+    <div className="min-h-screen text-neutral-900 dark:text-white">
       <Navbar />
-      <Hero />
-      <Projects />
-      <Experience />
-      <Skills />
-      <Contact />
-      <Footer />
+      <main>
+        <About />
+        <Professional />
+        <Reflections />
+        <Projects />
+        <Contact />
+      </main>
+      <footer className="text-center text-sm py-6">
+        © {new Date().getFullYear()} {INFO.name}
+      </footer>
     </div>
   );
 }
 
-// ---------------------------------------------
-// QUICK START NOTES
-// 1) Update INFO, PROJECTS, EXPERIENCE, SKILLS above.
-// 2) Wire the contact form to your backend/email provider.
-// 3) Add /public/resume.pdf or update INFO.resumeUrl.
-// 4) Optional: convert this to Next.js page (app/page.tsx) or React SPA.
-// 5) Tailwind utility classes + shadcn/ui ensure a clean, modern aesthetic.
-// ---------------------------------------------
 
EOF
)
