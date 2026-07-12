import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  Download,
  ArrowUp,
  Moon,
  Sun,
  Menu,
  X,
  Code2,
  Sparkles,
  Cpu,
  Rocket,
  Palette,
  Layers,
  Database,
  Server,
  Wrench,
  Trophy,
  GraduationCap,
  Briefcase,
  Award,
  Star,
  MapPin,
  Phone,
  Send,
  ExternalLink,
  Github as GH,
  CheckCircle2,
  Zap,
  Globe,
  Brain,
  MonitorSmartphone,
  GitBranch,
  FileCode,
  Boxes,
  Terminal,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import p1 from "@/assets/project1.jpg";
import p2 from "@/assets/project2.jpg";
import p3 from "@/assets/project3.jpg";
import p4 from "@/assets/project4.jpg";
import p5 from "@/assets/project5.jpg";
import p6 from "@/assets/project6.jpg";

/* ---------------- Data ---------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const TYPING = [
  "Front-End Developer",
  "React & Next.js Engineer",
  "UI/UX Enthusiast",
  "Software Developer",
];

const SKILLS = {
  Frontend: [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 92 },
    { name: "JavaScript", level: 93 },
    { name: "TypeScript", level: 88 },
    { name: "React.js", level: 94 },
    { name: "Next.js", level: 88 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Bootstrap", level: 85 },
  ],
  Backend: [
    { name: "Node.js", level: 82 },
    { name: "Express.js", level: 80 },
  ],
  Database: [
    { name: "MongoDB", level: 78 },
    { name: "MySQL", level: 75 },
  ],
  Tools: [
    { name: "Git", level: 90 },
    { name: "GitHub", level: 92 },
    { name: "VS Code", level: 95 },
    { name: "Postman", level: 85 },
    { name: "Figma", level: 80 },
  ],
};

const TECH_STACK = [
  { name: "React", icon: Code2 },
  { name: "JavaScript", icon: FileCode },
  { name: "TypeScript", icon: FileCode },
  { name: "Node.js", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: Github },
  { name: "Tailwind", icon: Palette },
  { name: "Express", icon: Boxes },
  { name: "HTML", icon: Globe },
  { name: "CSS", icon: Layers },
  { name: "Next.js", icon: Rocket },
];

const PROJECTS = [
  {
    name: "Agro Infinity",
    image: p1,
    tag: "Full Stack",
    description: "Smart agriculture platform helping farmers monitor crops, predict yields, and connect directly with buyers through an intuitive dashboard.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    features: ["Crop health tracking", "Market price insights", "Farmer–buyer marketplace", "Weather-aware alerts"],
    status: "Live",
    github: "https://github.com/saisree80038-afk/agro-infinity",
    demo: "https://github.com/saisree80038-afk/agro-infinity",
  },
  {
    name: "Saisree Icecream Scoops & Fantasy",
    image: p2,
    tag: "Frontend",
    description: "Playful, fully responsive website for a boutique ice cream brand with animated menu, flavor customizer, and online ordering.",
    tech: ["React", "Tailwind", "Framer Motion", "JavaScript"],
    features: ["Interactive flavor menu", "Cart & checkout flow", "Mobile-first design", "Smooth animations"],
    status: "Live",
    github: "https://github.com/saisree80038-afk/saisree-icecream",
    demo: "https://github.com/saisree80038-afk/saisree-icecream",
  },
  {
    name: "Clean-Tech: Waste Management with Transfer Learning",
    image: p3,
    tag: "AI Projects",
    description: "Deep learning system that classifies waste in real time using transfer learning on pre-trained CNNs, enabling smarter recycling and cleaner cities.",
    tech: ["Python", "TensorFlow", "Keras", "Flask", "React"],
    features: ["Transfer learning (VGG16/ResNet)", "Real-time image classification", "Web-based prediction UI", "Model accuracy dashboard"],
    status: "Live",
    github: "https://github.com/saisree80038-afk/clean-tech-waste-management",
    demo: "https://github.com/saisree80038-afk/clean-tech-waste-management",
  },
];

const PROJECT_FILTERS = ["All", "Frontend", "Full Stack", "AI Projects", "Personal"] as const;

const EXPERIENCE = [
  {
    role: "Frontend Developer Intern",
    org: "Nebula Labs",
    period: "Jun 2024 — Dec 2024",
    points: [
      "Built reusable React component library used across 3 products.",
      "Reduced bundle size by 32% through code splitting and lazy loading.",
      "Owned the migration to TypeScript for a 20k-LOC codebase.",
    ],
  },
  {
    role: "Freelance Web Developer",
    org: "Independent",
    period: "2023 — Present",
    points: [
      "Delivered 12+ landing pages and portfolio sites for global clients.",
      "Improved average Lighthouse score from 68 to 96.",
      "Set up CI/CD pipelines on Vercel and Netlify.",
    ],
  },
  {
    role: "Full-Stack Training Program",
    org: "CodeCamp Pro",
    period: "Jan 2023 — May 2023",
    points: [
      "Completed 400+ hours of MERN stack curriculum.",
      "Shipped 5 capstone projects with production deploys.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "National Institute of Technology",
    year: "2021 — 2025",
    score: "CGPA 8.7 / 10",
  },
  {
    degree: "Higher Secondary (PCM + Computer Science)",
    school: "Delhi Public School",
    year: "2019 — 2021",
    score: "92%",
  },
];

const CERTIFICATIONS = [
  { name: "ServiceNow Certified System Administrator", org: "ServiceNow", date: "2024" },
  { name: "Programming in Java", org: "NPTEL", date: "2024" },
  { name: "Machine Learning Specialization", org: "DeepLearning.AI", date: "2024" },
  { name: "Meta Front-End Developer", org: "Meta / Coursera", date: "2023" },
  { name: "AWS Cloud Practitioner", org: "Amazon Web Services", date: "2024" },
  { name: "Google UX Design", org: "Google", date: "2023" },
];

const ACHIEVEMENTS = [
  { title: "Smart India Hackathon Finalist", detail: "Top 20 of 3,200+ teams", icon: Trophy },
  { title: "LeetCode 500+ Problems", detail: "Consistent daily streak", icon: Zap },
  { title: "Open Source Contributor", detail: "12+ merged PRs in 2024", icon: Github },
  { title: "Best UI Award", detail: "College Tech Fest 2024", icon: Star },
];

const STATS = [
  { label: "Projects Shipped", value: 40 },
  { label: "Happy Clients", value: 18 },
  { label: "GitHub Repos", value: 62 },
  { label: "Cups of Coffee", value: 999 },
];

const SERVICES = [
  { icon: MonitorSmartphone, title: "Front-End Development", desc: "Pixel-perfect, accessible interfaces in React & Next.js." },
  { icon: Globe, title: "Responsive Websites", desc: "Fully responsive sites that feel great on every screen." },
  { icon: Rocket, title: "Landing Pages", desc: "High-converting landing pages built for speed and clarity." },
  { icon: Palette, title: "UI Implementation", desc: "Turning Figma designs into production-grade code." },
  { icon: Sparkles, title: "Portfolio Sites", desc: "Personal brand websites for creators and developers." },
  { icon: Zap, title: "Performance Audits", desc: "Lighthouse tuning, image work, and Core Web Vitals fixes." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Product Manager, Nebula Labs", rating: 5, text: "Saisree ships fast and thinks about the user. The dashboard he built raised our activation by 24%." },
  { name: "Marco Weiss", role: "Founder, Vertex", rating: 5, text: "Incredible eye for design and unusually clean code. Would hire again in a heartbeat." },
  { name: "Aisha Khan", role: "Design Lead, Lumen", rating: 5, text: "Best Figma-to-React handoff I've ever worked with. Motion details on point." },
];

const GH_STATS = [
  { label: "Repositories", value: "62" },
  { label: "Contributions", value: "1.2k" },
  { label: "Stars Earned", value: "340" },
  { label: "Followers", value: "180" },
];

const GH_LANGS = [
  { name: "TypeScript", pct: 38 },
  { name: "JavaScript", pct: 27 },
  { name: "Python", pct: 15 },
  { name: "CSS", pct: 12 },
  { name: "Other", pct: 8 },
];

/* ---------------- Helpers ---------------- */

function useTyping(words: string[], speed = 80, pause = 1400) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        const next = w.slice(0, text.length + 1);
        setText(next);
        if (next === w) setTimeout(() => setDel(true), pause);
      } else {
        const next = w.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next === "") {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return text;
}

function Counter({ to, duration = 1600 }: { to: number; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setN(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n.toLocaleString()}</span>;
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
        {eyebrow}
      </div>
      <h2 className="text-4xl font-bold sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

/* ---------------- Backgrounds ---------------- */

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-neon-cyan/60"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, filter: "blur(0.5px)" }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ---------------- Sections ---------------- */

function Nav({ theme, setTheme }: { theme: "dark" | "light"; setTheme: (t: "dark" | "light") => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass" : ""}`}>
          <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </span>
            <span className="text-gradient">Saisree.dev</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="#contact" className="hidden rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105 md:inline-block">
              Hire me
            </a>
            <button className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-border" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-secondary">
                  {n.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Hero() {
  const typing = useTyping(TYPING);
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-neon-purple/30 blur-3xl animate-blob" />
      <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-neon-blue/30 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
      <Particles />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.15fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            Available for new projects
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">Eediga Saisree</span>
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-lg text-muted-foreground sm:text-xl">
            <span className="text-neon-cyan">&gt;</span>
            <span className="text-foreground">{typing}</span>
            <span className="inline-block h-5 w-[2px] bg-foreground animate-blink" />
          </div>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Building modern, scalable, and user-friendly digital experiences.
          </p>
          <p className="mt-3 max-w-xl text-muted-foreground">
            I'm a front-end and software developer who loves shipping crisp interfaces, thoughtful motion, and code that ages well.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/resume.pdf" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-5 py-3 font-medium backdrop-blur transition-colors hover:bg-secondary">
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/saisree80038-afk", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/eediga-saisree-57994031b", label: "LinkedIn" },
              { icon: Mail, href: "mailto:saisree80038@gmail.com", label: "Email" },
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
            ].map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-secondary/40 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:text-foreground hover:shadow-glow">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-primary blur-3xl opacity-40" />
          <div className="glass relative overflow-hidden rounded-[2rem] p-3 shadow-glow">
            <img src={profileImg} alt="Eediga Saisree" width={768} height={768} className="w-full rounded-[1.5rem] object-cover" />
            <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
          </div>
          {[
            { icon: Code2, style: "top-4 -left-6", delay: 0 },
            { icon: Cpu, style: "-right-6 top-16", delay: 1 },
            { icon: Rocket, style: "-left-4 bottom-24", delay: 2 },
            { icon: Sparkles, style: "-right-4 bottom-8", delay: 3 },
          ].map((f, i) => (
            <motion.div
              key={i}
              className={`absolute ${f.style} grid h-12 w-12 place-items-center rounded-2xl glass shadow-glow`}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
            >
              <f.icon className="h-5 w-5 text-neon-cyan" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const interests = [
    { icon: Code2, label: "Front-End Development" },
    { icon: Palette, label: "UI / UX Design" },
    { icon: Brain, label: "Artificial Intelligence" },
    { icon: Sparkles, label: "Emerging Technologies" },
  ];
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="About Me" title="A quick introduction" subtitle="Curious builder turning ideas into fast, elegant products." />
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass rounded-2xl p-6 lg:col-span-2">
            <h3 className="mb-3 text-xl font-semibold">Who I am</h3>
            <p className="text-muted-foreground">
              I'm Saisree — a software developer specializing in modern front-end engineering. I love the moment when a
              well-designed interface just clicks: readable code, calm motion, and interactions that feel obvious in hindsight.
              Over the last three years I've shipped everything from tiny landing pages to full-stack dashboards.
            </p>
            <p className="mt-4 text-muted-foreground">
              I graduated in Computer Science and Engineering with a focus on human-computer interaction. My career objective is
              to keep working at the intersection of design and engineering — building products that people actually enjoy using
              and that scale gracefully as they grow.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-2xl p-6">
            <h3 className="mb-4 text-xl font-semibold">Interests</h3>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((i) => (
                <div key={i.label} className="rounded-xl border border-border bg-secondary/30 p-3">
                  <i.icon className="mb-2 h-5 w-5 text-neon-cyan" />
                  <div className="text-sm font-medium">{i.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-gradient">
                <Counter to={s.value} />+
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups: [string, { icon: typeof Code2; color: string }][] = [
    ["Frontend", { icon: Layers, color: "from-neon-blue to-neon-purple" }],
    ["Backend", { icon: Server, color: "from-neon-purple to-neon-cyan" }],
    ["Database", { icon: Database, color: "from-neon-cyan to-neon-blue" }],
    ["Tools", { icon: Wrench, color: "from-neon-purple to-neon-blue" }],
  ];
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Skills" title="Tools I build with" subtitle="A living stack — always learning, always shipping." />
        <div className="grid gap-6 md:grid-cols-2">
          {groups.map(([group, meta]) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <meta.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold">{group}</h3>
              </div>
              <div className="space-y-4">
                {SKILLS[group as keyof typeof SKILLS].map((s) => (
                  <div key={s.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium">{s.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {["Responsive Web Design", "REST APIs", "UI/UX Principles", "Problem Solving", "Agile Development", "Testing", "Accessibility", "SEO"].map((s) => (
            <div key={s} className="glass flex items-center gap-2 rounded-xl px-4 py-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-neon-cyan" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Projects" title="Featured work" subtitle="A selection of things I've built recently — click through to explore." />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                filter === f
                  ? "border-transparent bg-gradient-primary text-primary-foreground shadow-glow"
                  : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, idx) => (
              <motion.article
                key={p.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass group relative overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" width={1024} height={640} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/60 px-2.5 py-1 font-mono text-xs backdrop-blur">
                    {p.tag}
                  </span>
                  <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs backdrop-blur ${p.status === "Live" ? "bg-neon-cyan/20 text-neon-cyan" : "bg-neon-purple/20 text-neon-purple"}`}>
                    ● {p.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <ul className="mt-4 space-y-1 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-neon-cyan" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-3">
                    <a href={p.github} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                      <GH className="h-4 w-4" /> Code
                    </a>
                    <a href={p.demo} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
                      Live <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Timeline({ items }: { items: { title: string; sub: string; period: string; points?: string[] }[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent md:left-1/2" />
      <div className="space-y-8">
        {items.map((it, i) => (
          <motion.div
            key={it.title + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className={`relative grid gap-3 pl-12 md:grid-cols-2 md:gap-8 md:pl-0 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}
          >
            <span className="absolute left-2 top-2 h-4 w-4 rounded-full bg-gradient-primary shadow-glow md:left-1/2 md:-translate-x-1/2" />
            <div className={`glass rounded-2xl p-5 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
              <div className="mb-1 font-mono text-xs text-neon-cyan">{it.period}</div>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <div className="text-sm text-muted-foreground">{it.sub}</div>
              {it.points && (
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {it.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neon-cyan" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Experience" title="Where I've worked" />
        <Timeline items={EXPERIENCE.map((e) => ({ title: e.role, sub: e.org, period: e.period, points: e.points }))} />

        <div className="mt-20">
          <SectionTitle eyebrow="Education" title="Academic journey" />
          <Timeline items={EDUCATION.map((e) => ({ title: e.degree, sub: `${e.school} · ${e.score}`, period: e.year }))} />
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Certifications" title="Learning never stops" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <motion.a
              key={c.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass group flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <Award className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.org} · {c.date}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-neon-cyan opacity-0 transition-opacity group-hover:opacity-100">
                  View credential <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Achievements" title="Wins & milestones" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <a.icon className="h-6 w-6" />
              </span>
              <div className="font-semibold">{a.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{a.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section id="stack" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Tech Stack" title="My daily toolkit" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {TECH_STACK.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -6, rotate: -2 }}
              className="glass group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-shadow hover:shadow-glow"
            >
              <t.icon className="h-8 w-8 text-neon-cyan transition-transform group-hover:scale-110" />
              <span className="text-xs font-medium text-muted-foreground">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Services" title="How I can help" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubStats() {
  return (
    <section id="github" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="GitHub" title="Developer dashboard" />
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {GH_STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-secondary/30 p-4 text-center">
                    <div className="text-2xl font-bold text-gradient">{s.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Terminal className="h-4 w-4" /> Contribution heatmap
                </div>
                <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-1">
                  {Array.from({ length: 30 * 7 }).map((_, i) => {
                    const intensity = Math.random();
                    const shade =
                      intensity < 0.35 ? "bg-secondary/60" :
                      intensity < 0.6 ? "bg-neon-blue/40" :
                      intensity < 0.85 ? "bg-neon-purple/60" : "bg-neon-cyan/80";
                    return <div key={i} className={`aspect-square rounded-sm ${shade}`} />;
                  })}
                </div>
              </div>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Layers className="h-4 w-4" /> Most used languages
              </div>
              <div className="space-y-3">
                {GH_LANGS.map((l) => (
                  <div key={l.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{l.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{l.pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${l.pct}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full bg-gradient-primary" />
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://github.com/saisree80038-afk" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-2 text-sm transition-colors hover:bg-secondary">
                <Github className="h-4 w-4" /> View full profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="testimonials" className="relative py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle eyebrow="Testimonials" title="Kind words" />
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-4 flex justify-center gap-1">
                {Array.from({ length: TESTIMONIALS[idx].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-neon-cyan text-neon-cyan" />
                ))}
              </div>
              <p className="text-lg text-foreground sm:text-xl">"{TESTIMONIALS[idx].text}"</p>
              <div className="mt-6">
                <div className="font-semibold">{TESTIMONIALS[idx].name}</div>
                <div className="text-sm text-muted-foreground">{TESTIMONIALS[idx].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-gradient-primary" : "w-2 bg-secondary"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email.";
    if (!form.message.trim()) errs.message = "Please add a message.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const input = "w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-neon-purple";

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Contact" title="Let's build something great" subtitle="Have a project in mind or just want to say hi? I usually reply within 24 hours." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "saisree80038@gmail.com", href: "mailto:saisree80038@gmail.com" },
              { icon: Phone, label: "Phone", value: "+1 (555) 010-2288", href: "tel:+15550102288" },
              { icon: MapPin, label: "Location", value: "Remote · Open worldwide" },
              { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/eediga-saisree", href: "https://www.linkedin.com/in/eediga-saisree-57994031b" },
              { icon: Github, label: "GitHub", value: "github.com/saisree80038-afk", href: "https://github.com/saisree80038-afk" },
            ].map((c) => (
              <a key={c.label} href={c.href ?? "#"} className="glass flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="truncate font-medium">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
          <form onSubmit={submit} className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Name</label>
                <input className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <input className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Subject</label>
              <input className={input} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Project inquiry" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea rows={5} className={input} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project…" />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
              <Send className="h-4 w-4" /> Send message
            </button>
            <AnimatePresence>
              {sent && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 p-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-neon-cyan" /> Message sent — I'll get back to you shortly!
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border py-10">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </span>
            <span className="text-gradient">Saisree.dev</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Building modern, scalable, and user-friendly digital experiences.
          </p>
        </div>
        <div>
          <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Quick links</div>
          <div className="grid grid-cols-2 gap-1 text-sm">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-muted-foreground hover:text-foreground">{n.label}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Elsewhere</div>
          <div className="flex gap-2">
            {[
              { icon: Github, href: "https://github.com/saisree80038-afk" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/eediga-saisree-57994031b" },
              { icon: Mail, href: "mailto:saisree80038@gmail.com" },
              { icon: Instagram, href: "https://instagram.com" },
            ].map((s, i) => (
              <a key={i} href={s.href} className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/40 transition-colors hover:bg-secondary">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-border px-4 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Eediga Saisree. Crafted with React, Tailwind & a lot of coffee.
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return <motion.div style={{ scaleX: w, transformOrigin: "0%" }} className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-primary" />;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Root ---------------- */

export function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <ScrollProgress />
      <Nav theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Achievements />
        <TechStack />
        <Services />
        <GitHubStats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}