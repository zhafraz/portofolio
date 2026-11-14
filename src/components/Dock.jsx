import React, { useState } from 'react';
import {
  HomeIcon,
  FolderIcon,
  TrophyIcon,
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
  InstagramIcon,
  SunIcon,
  MoonIcon
} from './Icons';
import { PROFILE } from '../data/portfolioData';

export default function Dock({ activeView, setActiveView, theme, toggleTheme }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const dockItems = [
    {
      id: 'home',
      label: 'Beranda',
      icon: HomeIcon,
      onClick: () => {
        setActiveView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: activeView === 'home'
    },
    {
      id: 'projects',
      label: 'Proyek',
      icon: FolderIcon,
      onClick: () => {
        setActiveView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: activeView === 'projects'
    },
    {
      id: 'competitions',
      label: 'Prestasi',
      icon: TrophyIcon,
      onClick: () => {
        if (activeView !== 'home') {
          setActiveView('home');
          setTimeout(() => {
            const el = document.getElementById('competitions');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const el = document.getElementById('competitions');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      },
      isActive: false
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: GithubIcon,
      href: PROFILE.socials.github,
      external: true
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: LinkedinIcon,
      href: PROFILE.socials.linkedin,
      external: true
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: InstagramIcon,
      href: PROFILE.socials.instagram,
      external: true
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav
        aria-label="Floating Navigation Dock"
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.14)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.55)] transition-all duration-200"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isButton = !item.href;
          const Component = isButton ? 'button' : 'a';
          const linkProps = isButton
            ? { onClick: item.onClick, type: 'button' }
            : { href: item.href, target: '_blank', rel: 'noopener noreferrer' };

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {hoveredItem === item.id && (
                <div className="absolute -top-11 px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg whitespace-nowrap pointer-events-none transition-all duration-150 animate-fade-in">
                  {item.label}
                </div>
              )}

              <Component
                {...linkProps}
                className={`p-2.5 sm:p-3 rounded-full transition-all duration-200 flex items-center justify-center ${
                  item.isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 scale-105 shadow-inner'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </Component>
            </div>
          );
        })}

        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <div
          className="relative flex flex-col items-center"
          onMouseEnter={() => setHoveredItem('theme')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === 'theme' && (
            <div className="absolute -top-11 px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg whitespace-nowrap pointer-events-none transition-all duration-150">
              {theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
            </div>
          )}

          <button
            onClick={toggleTheme}
            type="button"
            className="p-2.5 sm:p-3 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all duration-200 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <MoonIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-zinc-700 transition-transform hover:-rotate-12" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
