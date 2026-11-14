import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import avatarImg from './assets/avatar.png';
import logoUns from './assets/logo-uns.jpg';
import logoWibawa from './assets/logo-wibawa.png';
import logoBem from './assets/logo-bem.png';
import logoEnuma from './assets/logo-enuma.png';
import logoSmk from './assets/logo-smk2.png';
import {
  PROFILE,
  WORK_EXPERIENCE,
  EDUCATION,
  SKILLS,
  PROJECTS,
  COMPETITIONS
} from './data/portfolioData';
import Dock from './components/Dock';
import ProjectModal from './components/ProjectModal';
import SkillsBeam from './components/SkillsBeam';
import {
  MapPinIcon,
  ExternalLinkIcon,
  GlobeIcon,
  GithubIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  SearchIcon,
  SparklesIcon,
  PhoneIcon,
  MailIcon,
  DownloadIcon
} from './components/Icons';

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeView, setActiveView] = useState('home');

  const [selectedProject, setSelectedProject] = useState(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setToastMessage(`${label} berhasil disalin ke clipboard!`);
      setTimeout(() => setToastMessage(''), 2500);
    }
  };

  const categories = ['Semua', 'IoT & Hardware', 'Robotika & Kontrol', 'Mobile & UI/AR', 'Simulasi & 3D CAD'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory = activeCategory === 'Semua' || project.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const homeFeaturedProjects = useMemo(() => {
    return PROJECTS.filter((p) => p.featured);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-200 relative pb-28">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left z-50 shadow-[0_1px_10px_rgba(16,185,129,0.5)]"
      />

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium shadow-2xl backdrop-blur-md animate-fade-in">
          <CheckIcon className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
        {activeView === 'home' && (
          <div className="space-y-14 sm:space-y-18 animate-fade-in">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start justify-between gap-6 sm:gap-8"
            >
              <div className="space-y-3.5">
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Halo, saya {PROFILE.name} 👋
                </h1>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                  I’m passionate about programming and technology
and love to use my skill to create innovative solution
through code.
                </p>
              </div>

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0"
              >
                <img
                  src={avatarImg || PROFILE.avatar}
                  alt={PROFILE.fullName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800 shadow-md bg-zinc-100 dark:bg-zinc-800"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = '1';
                      e.currentTarget.src = 'https://github.com/zhafraz.png';
                    }
                  }}
                />
              </motion.div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3.5"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Tentang Saya
              </h2>
              <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                <MapPinIcon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <span>{PROFILE.location}</span>
              </div>
              <div className="text-base sm:text-[17px] text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-3.5">
                <p>
                  Mahasiswa aktif S1 Pendidikan Teknik Informatika dan Komputer Universitas Sebelas Maret
dengan pengalaman magang industri (PKL) di bidang pengembangan web, aplikasi, dan IoT serta
aktif sebagai Staf Riset dan Data BEM FKIP UNS. Memiliki kemampuan dalam analisis data,
pemrograman, dan dasar desain web/mobile. Terbiasa berpikir analitis dan kreatif dalam
memecahkan masalah teknis maupun organisasi.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Pengalaman Kerja &amp; Organisasi
              </h2>
              <div className="space-y-5">
                {WORK_EXPERIENCE.map((exp, index) => {
                  const logoSrc = exp.logoImage?.includes('wibawa')
                    ? logoWibawa
                    : exp.logoImage?.includes('bem')
                    ? logoBem
                    : exp.logoImage?.includes('uns')
                    ? logoUns
                    : exp.logoImage?.includes('enuma')
                    ? logoEnuma
                    : exp.logoImage || null;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4 group"
                    >
                      {logoSrc ? (
                        <div className="w-11 h-11 rounded-full shrink-0 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm mt-0.5 flex items-center justify-center p-1.5 ring-1 ring-zinc-200/60 dark:ring-zinc-800/60 transition-transform duration-200 group-hover:scale-105">
                          <img
                            src={logoSrc}
                            alt={exp.company}
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                      ) : (
                        <div className={`w-11 h-11 rounded-full shrink-0 bg-gradient-to-br ${exp.logoColor} text-white flex items-center justify-center font-bold text-sm shadow-sm mt-0.5 transition-transform duration-200 group-hover:scale-105`}>
                          {exp.logoText}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                          <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {exp.company}
                          </h3>
                          <span className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 shrink-0 font-mono">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                          {exp.role}
                        </p>
                        <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Pendidikan
              </h2>
              <div className="space-y-5">
                {EDUCATION.map((edu, index) => {
                  const logoSrc = edu.logoImage?.includes('uns')
                    ? logoUns
                    : edu.logoImage?.includes('smk')
                    ? logoSmk
                    : edu.logoImage || null;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4 group"
                    >
                      {logoSrc ? (
                        <div className="w-11 h-11 rounded-full shrink-0 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm mt-0.5 flex items-center justify-center p-1.5 ring-1 ring-zinc-200/60 dark:ring-zinc-800/60 transition-transform duration-200 group-hover:scale-105">
                          <img
                            src={logoSrc}
                            alt={edu.school}
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                      ) : (
                        <div className={`w-11 h-11 rounded-full shrink-0 bg-gradient-to-br ${edu.logoColor} text-white flex items-center justify-center font-bold text-sm shadow-sm mt-0.5 transition-transform duration-200 group-hover:scale-105`}>
                          {edu.logoText}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                          <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {edu.school}
                          </h3>
                          <span className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 shrink-0 font-mono">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                          {edu.degree}
                        </p>
                        {edu.description && (
                          <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Keahlian &amp; Teknologi
                </h2>
              </div>

              <SkillsBeam />

              <div className="flex flex-wrap gap-2.5 pt-2">
                {SKILLS.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.025 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-colors flex items-center gap-2 cursor-default ${skill.bg}`}
                  >
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 block">
                    PROYEK PILIHAN
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
                    Beberapa karya dan proyek utama.
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveView('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition group"
                >
                  <span>Lihat semua proyek</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {homeFeaturedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedProject(project)}
                    className="group rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-950/20 p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      <div className={`w-full h-40 rounded-xl overflow-hidden border ${project.bannerColor} ${project.accentBg} flex items-center justify-center p-3 relative`}>
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="max-h-full max-w-full object-contain rounded shadow-sm group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="text-sm font-mono font-bold text-zinc-400">
                            {project.title}
                          </div>
                        )}
                        <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 backdrop-blur-sm">
                          {project.badgeText || project.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
                          {project.date}
                        </p>
                      </div>

                      <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3.5 mt-3.5 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/70 dark:border-zinc-700/70"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="sm:hidden pt-2 text-center">
                <button
                  onClick={() => {
                    setActiveView('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  <span>Lihat semua proyek</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.section>

            <motion.section
              id="competitions"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 pt-4"
            >
              <div className="text-center space-y-3.5">
                <div className="inline-block">
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Eksplorasi &amp; Inovasi Berkelanjutan
                </h2>
                <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
                  Selama masa studi, saya aktif mengikuti kompetisi inovasi teknologi, program kewirausahaan perguruan tinggi, serta menjadi instruktur teknis. Pengalaman ini memberikan wawasan mendalam dan kesempatan kolaborasi yang berharga.
                </p>
              </div>

              <div className="space-y-7 relative before:absolute before:top-2 before:bottom-2 before:left-4 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800 pl-2">
                {COMPETITIONS.map((comp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-9 group"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                      className="absolute left-2.5 top-2 w-3.5 h-3.5 rounded-full bg-zinc-900 dark:bg-zinc-100 ring-4 ring-white dark:ring-[#09090b] group-hover:scale-125 transition-transform"
                    />

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs sm:text-sm font-mono text-zinc-400 dark:text-zinc-500">
                          {comp.date}
                        </span>
                        {comp.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80">
                            {comp.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {comp.title}
                      </h3>

                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        {comp.location}
                      </p>

                      <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                        {comp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pt-10 border-t border-zinc-200 dark:border-zinc-800/80 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Tertarik untuk berdiskusi atau berkolaborasi?
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Surakarta, Jawa Tengah, Indonesia
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => copyToClipboard(PROFILE.socials.campusEmail, 'Email Kampus')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                  >
                    <CopyIcon className="w-4 h-4" />
                    <span>Salin Email</span>
                  </button>

                  <a
                    href={PROFILE.socials.cvAndPortoUrl || 'https://drive.google.com/drive/u/4/folders/1beJXzjF_D6JmbAux-LUXsQDzLfWEVyA7'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition shadow-sm"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Unduh CV &amp; Porto</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 pt-3 font-mono">
                <div>
                  © 2026 {PROFILE.name} (@{PROFILE.handle})
                </div>
              </div>
            </motion.footer>
          </div>
        )}

        {activeView === 'projects' && (
          <div className="space-y-9 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-7">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Arsip Proyek
                </h1>
                <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-1.5">
                  Koleksi karya, eksperimen hardware, dan aplikasi yang telah dikembangkan.
                </p>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div className="hidden sm:block text-left">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                    {PROJECTS.length}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
                    TOTAL PROYEK
                  </div>
                </div>

                <div className="hidden sm:block text-left">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                    {homeFeaturedProjects.length}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
                    DI BERANDA
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-semibold text-zinc-900 dark:text-zinc-100 transition"
                >
                  <span>Kembali ke Beranda</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="relative">
                <SearchIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari proyek berdasarkan nama, teknologi, atau kata kunci..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition ${
                      activeCategory === cat
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200/60 dark:border-zinc-800/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                ARSIP LENGKAP
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                Semua proyek ({filteredProjects.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedProject(project)}
                  className="group rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-950/20 p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className={`w-full h-40 rounded-xl overflow-hidden border ${project.bannerColor} ${project.accentBg} flex items-center justify-center p-3 relative`}>
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="max-h-full max-w-full object-contain rounded shadow-sm group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-sm font-mono font-bold text-zinc-400">
                          {project.title}
                        </div>
                      )}
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 backdrop-blur-sm">
                        {project.badgeText || project.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
                        {project.date}
                      </p>
                    </div>

                    <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3.5 mt-3.5 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/70 dark:border-zinc-700/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm">
                      {project.links?.website && (
                        <a
                          href={project.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                        >
                          <GlobeIcon className="w-3.5 h-3.5" />
                          <span>Website</span>
                        </a>
                      )}
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-14 text-zinc-400 text-sm">
                Tidak ada proyek yang sesuai dengan kriteria pencarian. Silakan coba kata kunci lain.
              </div>
            )}
          </div>
        )}
      </main>

      <Dock
        activeView={activeView}
        setActiveView={setActiveView}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
