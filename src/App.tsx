import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  Code2,
  Database,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Terminal,
  Users,
} from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'

const profile = {
  name: 'Vikas K',
  title: 'Computer Science Student · Aspiring Software & Web Developer',
  email: 'vikaskkumar45668@gmail.com',
  phone: '+91 9980500751',
  location: 'Mysuru, Karnataka',
}

const skillGroups = [
  {
    icon: Code2,
    title: 'Programming languages',
    items: ['C', 'Java', 'Python'],
  },
  {
    icon: Terminal,
    title: 'Tools & technologies',
    items: ['Git', 'GitHub', 'MongoDB', 'Docker', 'Jenkins'],
  },
  {
    icon: Database,
    title: 'Core subjects',
    items: ['Data Structures', 'Object-Oriented Programming', 'Database Management Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering'],
  },
  {
    icon: Users,
    title: 'People skills',
    items: ['Team Collaboration', 'Team Management', 'Event Planning', 'Problem Solving'],
  },
]

const projects = [
  {
    number: '01',
    name: 'CARVIO',
    subtitle: 'Intelligent Career Guidance & Entrepreneurial Support System',
    description:
      'An AI-based platform that helps students find suitable career paths and take practical steps toward their goals.',
    points: [
      'Generates career recommendations from skills, interests, and academic data.',
      'Analyzes resumes to surface skills missing for a target role.',
      'Presents career insights and improvement suggestions in a user-friendly experience.',
    ],
    tags: ['Career guidance', 'AI-based recommendations', 'Resume analysis'],
    theme: 'carvio',
  },
  {
    number: '02',
    name: 'Farmer Friendly Consultancy',
    subtitle: 'FFC · HackNova 1.0',
    description:
      'A farmer-focused consultancy platform designed to make practical agricultural guidance easier to access.',
    points: [
      'Shares information about crops, fertilizers, and modern farming techniques.',
      'Organizes guidance in a clear and accessible interface.',
      'Built with a team during the 24-hour HackNova 1.0 national-level hackathon.',
    ],
    tags: ['Agriculture guidance', 'Accessible interface', 'Hackathon project'],
    theme: 'ffc',
  },
]

function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '40px', amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function PageScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null
  return <motion.div className="page-scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
}

function Header() {
  const [activeSection, setActiveSection] = useState('about')
  const reduceMotion = useReducedMotion()
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const observedSections = sections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.15, 0.3, 0.5] })

    observedSections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    const section = document.getElementById(sectionId)
    if (!section) return
    window.history.pushState(null, '', `#${sectionId}`)
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Vikas K, home">
        VK<span>.</span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {sections.map(({ id, label }) => (
          <a
            className={`nav-link${activeSection === id ? ' is-active' : ''}`}
            href={`#${id}`}
            key={id}
            aria-current={activeSection === id ? 'location' : undefined}
            onClick={(event) => navigateTo(event, id)}
          >
            {activeSection === id && <motion.span className="nav-active-highlight" layoutId="active-nav-highlight" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="nav-link-label">{label}</span>
          </a>
        ))}
      </nav>
      <a className="header-cta" href={`mailto:${profile.email}`}>
        Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </header>
  )
}

function CodePreview() {
  return (
    <div className="code-card" aria-label="A code-inspired profile card">
      <div className="code-card-bar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <span>vikas.ts</span>
        <span className="code-card-status"><b /> available to collaborate</span>
      </div>
      <div className="code-card-body" aria-hidden="true">
        <div className="code-line"><span className="line-number">01</span><span><i>const</i> <b>developer</b> = {'{'}</span></div>
        <div className="code-line code-indent"><span className="line-number">02</span><span><em>name</em>: <strong>&apos;Vikas K&apos;</strong>,</span></div>
        <div className="code-line code-indent"><span className="line-number">03</span><span><em>focus</em>: <strong>&apos;Software + Web&apos;</strong>,</span></div>
        <div className="code-line code-indent"><span className="line-number">04</span><span><em>degree</em>: <strong>&apos;B.E. Computer Science&apos;</strong>,</span></div>
        <div className="code-line code-indent"><span className="line-number">05</span><span><em>gradYear</em>: <strong>2027</strong>,</span></div>
        <div className="code-line code-indent"><span className="line-number">06</span><span><em>cgpa</em>: <strong>8.09</strong>,</span></div>
        <div className="code-line"><span className="line-number">07</span><span>{'}'}</span></div>
        <div className="code-cursor" />
      </div>
      <div className="code-card-footer">
        <span><span className="status-dot" /> Learning by building</span>
        <span>MY / IN</span>
      </div>
      <div className="floating-chip chip-top"><Code2 size={15} /> Java · Python · C</div>
      <div className="floating-chip chip-bottom"><GraduationCap size={16} /> CSE ’27</div>
    </div>
  )
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const reduceMotion = useReducedMotion()
  const artY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 135])
  const artScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 0.9])
  const artRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [2, 2] : [2, -4])
  const artOpacity = useTransform(scrollYProgress, [0, 0.85, 1], reduceMotion ? [1, 1, 1] : [1, 0.55, 0.15])

  return (
    <section className="hero-section" id="top" ref={sectionRef}>
      <div className="hero-layout">
        <div className="hero-copy">
          <FadeIn className="hero-eyebrow" y={12}>
            <span className="eyebrow-line" /> {profile.title}
          </FadeIn>
          <FadeIn delay={0.1} y={34}>
            <h1>Building ideas<br /><span>into useful</span><br />software<span className="hero-period">.</span></h1>
          </FadeIn>
          <FadeIn className="hero-description" delay={0.2} y={20}>
            <p>
              I&apos;m {profile.name}, a computer science student focused on software and web development. I enjoy solving problems and building practical, user-friendly applications.
            </p>
          </FadeIn>
          <FadeIn className="hero-actions" delay={0.3} y={14}>
            <a className="button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
            <a className="text-link" href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={16} /></a>
          </FadeIn>
          <FadeIn className="hero-location" delay={0.4} y={10}>
            <MapPin size={15} /> {profile.location}
          </FadeIn>
        </div>
        <motion.div className="hero-art" style={{ y: artY, scale: artScale, rotate: artRotate, opacity: artOpacity }}>
          <FadeIn className="hero-art-entry" delay={0.25} y={20}>
            <CodePreview />
          </FadeIn>
        </motion.div>
      </div>
      <div className="hero-bottomline"><span>SCROLL TO EXPLORE</span><span className="line-through" /><span>01 / 05</span></div>
    </section>
  )
}

function TechStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const reduceMotion = useReducedMotion()
  const tickerX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [38, -38])
  const items = ['C', 'JAVA', 'PYTHON', 'GIT', 'GITHUB', 'MONGODB', 'DOCKER', 'JENKINS']
  return (
    <section className="tech-strip" aria-label="Technologies and tools" ref={sectionRef}>
      <span className="strip-label">TOOLS I WORK WITH</span>
      <motion.div className="strip-items" style={{ x: tickerX }}>
        {items.map((item, index) => <span key={item}>{item}{index < items.length - 1 && <i>·</i>}</span>)}
      </motion.div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section section-pad" id="about">
      <div className="section-topline"><span>01 — ABOUT</span><span>A LITTLE CONTEXT</span></div>
      <div className="about-grid">
        <FadeIn>
          <h2 className="section-title">Curious by nature.<br /><span>Built to solve.</span></h2>
        </FadeIn>
        <FadeIn className="about-text" delay={0.1}>
          <p className="section-kicker">MY APPROACH</p>
          <p className="body-large">
            I&apos;m pursuing a Bachelor of Engineering in Computer Science at Government Engineering College, Kushalnagar. I&apos;m eager to apply my programming, problem-solving, and teamwork skills to build efficient, scalable applications.
          </p>
          <div className="about-facts">
            <div><span>01</span><p>Hands-on project experience</p></div>
            <div><span>02</span><p>Hackathon team contributor</p></div>
            <div><span>03</span><p>Focused on continuous learning</p></div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section className="skills-section section-pad" id="skills">
      <div className="section-topline"><span>02 — SKILLS</span><span>FOUNDATIONS & TOOLKIT</span></div>
      <FadeIn className="skills-heading-row">
        <h2 className="section-title">What I bring<br /><span>to the table.</span></h2>
        <p>Programming foundations, practical tooling, and the people skills to make good work happen together.</p>
      </FadeIn>
      <div className="skill-list">
        {skillGroups.map(({ icon: Icon, title, items }, index) => (
          <FadeIn className="skill-row" delay={index * 0.06} key={title}>
            <div className="skill-row-heading"><span className="skill-icon"><Icon size={19} /></span><h3>{title}</h3><span className="skill-index">0{index + 1}</span></div>
            <div className="skill-tags">{items.map((item) => <span className="skill-tag" key={item}>{item}</span>)}</div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function CarvioVisual() {
  return (
    <div className="project-visual carvio-visual" aria-hidden="true">
      <div className="visual-window">
        <div className="visual-topbar"><span>CARVIO</span><span className="visual-avatar">VK</span></div>
        <div className="visual-content">
          <div className="visual-greeting">YOUR NEXT CHAPTER</div>
          <div className="visual-headline">Find a path<br /><b>that fits you.</b></div>
          <div className="career-match"><span><i /> CAREER MATCH</span><strong>92%</strong></div>
          <div className="visual-skills"><span>Problem solving</span><span>Technology</span><span>Creative thinking</span></div>
        </div>
        <div className="visual-footer"><span>RECOMMENDED PATH</span><b>Software Developer <ArrowUpRight size={14} /></b></div>
      </div>
      <div className="visual-orb" />
      <span className="visual-label">CONCEPT VISUAL</span>
    </div>
  )
}

function FarmerVisual() {
  return (
    <div className="project-visual ffc-visual" aria-hidden="true">
      <div className="ffc-window">
        <div className="ffc-nav"><span className="ffc-mark">ffc<span>•</span></span><span>GROW WITH CONFIDENCE</span><span className="ffc-menu">☰</span></div>
        <div className="ffc-hero"><span>FARMER FRIENDLY CONSULTANCY</span><b>Better guidance.<br /><i>Healthier harvests.</i></b><small>Practical information for every growing season.</small><span className="ffc-mock-button">EXPLORE GUIDANCE <ArrowRight size={12} /></span></div>
        <div className="ffc-topics"><span>01 <b>CROPS</b></span><span>02 <b>FERTILIZERS</b></span><span>03 <b>TECHNIQUES</b></span></div>
      </div>
      <div className="ffc-sun" />
      <span className="visual-label">CONCEPT VISUAL</span>
    </div>
  )
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const reduceMotion = useReducedMotion()
  const cardY = useTransform(scrollYProgress, [0, 0.45, 1], reduceMotion ? [0, 0, 0] : [70, 0, -42])
  const cardScale = useTransform(scrollYProgress, [0, 0.45, 1], reduceMotion ? [1, 1, 1] : [0.96, 1, 0.98])
  const cardRotate = useTransform(scrollYProgress, [0, 0.45, 1], reduceMotion ? [0, 0, 0] : [2.4, 0, -1.2])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.28, 1], reduceMotion ? [1, 1, 1] : [0.35, 1, 0.82])

  return (
    <motion.div
      className="project-scroll-shell"
      ref={cardRef}
      style={{ y: cardY, scale: cardScale, rotateX: cardRotate, opacity: cardOpacity, transformPerspective: 1200 }}
    >
      <FadeIn className={`project-card project-card--${project.theme}`} delay={index * 0.12} y={30}>
        <div className="project-card-info">
          <div className="project-number">{project.number}<span> / 02</span></div>
          <p className="project-subtitle">{project.subtitle}</p>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <ul className="project-points">{project.points.map((point) => <li key={point}>{point}</li>)}</ul>
          <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a className="project-contact-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Question about ${project.name}`)}`}>
            Ask me about this project <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="project-card-art">{project.theme === 'carvio' ? <CarvioVisual /> : <FarmerVisual />}</div>
      </FadeIn>
    </motion.div>
  )
}

function ProjectsSection() {
  return (
    <section className="projects-section section-pad" id="projects">
      <div className="section-topline"><span>03 — SELECTED PROJECTS</span><span>BUILT WITH PURPOSE</span></div>
      <FadeIn className="projects-intro">
        <h2 className="section-title">A couple of ideas<br /><span>made tangible.</span></h2>
        <p>Projects shaped by real problems, thoughtful collaboration, and the drive to make technology useful.</p>
      </FadeIn>
      <div className="project-stack">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
    </section>
  )
}

function EducationSection() {
  return (
    <section className="education-section section-pad" id="education">
      <div className="section-topline"><span>04 — EDUCATION & GROWTH</span><span>ALWAYS IN PROGRESS</span></div>
      <div className="education-grid">
        <FadeIn className="education-main">
          <p className="section-kicker"><GraduationCap size={17} /> EDUCATION</p>
          <h2>Learning the<br /><span>why behind it.</span></h2>
          <div className="education-card">
            <div className="education-card-top"><span>2023 — 2027</span><span>IN PROGRESS</span></div>
            <h3>Government Engineering College, Kushalnagar</h3>
            <p>Bachelor of Engineering in Computer Science and Engineering</p>
            <div className="education-score"><span>VTU</span><strong>8.09 <small>CGPA</small></strong></div>
          </div>
        </FadeIn>
        <div className="education-side">
          <FadeIn className="credential-block" delay={0.1}>
            <p className="section-kicker"><Award size={17} /> CERTIFICATIONS</p>
            <article><span>OCT 2025</span><h3>HackNova 1.0</h3><p>National Level Hackathon Participation<br />Coorg Institute of Technology, Ponnampet</p></article>
            <article><span>NOV 2024</span><h3>English Skills for Youth</h3><p>Practice Club Leader Training<br />British Council &amp; Microsoft</p></article>
          </FadeIn>
          <FadeIn className="credential-block activity-block" delay={0.2}>
            <p className="section-kicker"><Users size={17} /> ACTIVITIES</p>
            <article><h3>Hackathon collaborator</h3><p>Worked with a team in a 24-hour national-level hackathon to build an innovative solution.</p></article>
            <article><h3>Practice Club Leader</h3><p>Completed training focused on communication, leadership, and English proficiency.</p></article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <footer className="contact-section section-pad" id="contact">
      <div className="section-topline"><span>05 — CONTACT</span><span>OPEN TO OPPORTUNITIES</span></div>
      <div className="contact-content">
        <FadeIn>
          <p className="section-kicker">HAVE A PROJECT OR OPPORTUNITY?</p>
          <h2>Let&apos;s build<br /><span>what&apos;s next.</span></h2>
        </FadeIn>
        <FadeIn className="contact-details" delay={0.1}>
          <a className="contact-email" href={`mailto:${profile.email}`}><Mail size={18} />{profile.email}<ArrowUpRight size={17} /></a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone size={16} />{profile.phone}</a>
          <p><MapPin size={16} />{profile.location}</p>
        </FadeIn>
      </div>
      <div className="footer-bottom"><a className="wordmark" href="#top">VK<span>.</span></a><span>© {new Date().getFullYear()} {profile.name}</span><a href="#top">BACK TO TOP <ArrowUpRight size={13} /></a></div>
    </footer>
  )
}

export default function App() {
  return (
    <main className="site-shell">
      <PageScrollProgress />
      <Header />
      <HeroSection />
      <TechStrip />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </main>
  )
}
