import React from 'react';
import { XIcon, ExternalLinkIcon, GithubIcon, GlobeIcon, CpuIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          aria-label="Close dialog"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {project.badgeText || project.category}
            </span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 font-mono">
              {project.date}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-1">
            {project.subtitle}
          </p>
        </div>

        {project.image && (
          <div className="rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-950/60 flex items-center justify-center max-h-80">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-80 object-contain"
            />
          </div>
        )}

        <p className="text-base sm:text-[17px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {project.description}
        </p>

        {project.architecture && (
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              <CpuIcon className="w-4 h-4 text-emerald-500" />
              <span>Alur Sistem &amp; Arsitektur Teknis</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 text-sm">
              <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70">
                <span className="font-semibold text-cyan-600 dark:text-cyan-400 block mb-1">
                  1. Input / Pemicu Sensor:
                </span>
                <span className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {project.architecture.input}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                  2. Mikrokontroler / Proses Logika:
                </span>
                <span className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {project.architecture.process}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70">
                <span className="font-semibold text-purple-600 dark:text-purple-400 block mb-1">
                  3. Output / Aktuator &amp; UI Telemetri:
                </span>
                <span className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {project.architecture.output}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Teknologi &amp; Tools yang Digunakan:
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            {project.links?.website && (
              <a
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs sm:text-sm font-semibold hover:opacity-90 transition"
              >
                <GlobeIcon className="w-4 h-4" />
                <span>Buka Demo / Web</span>
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold transition"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Kode Sumber</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
