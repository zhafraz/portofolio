import React, { useEffect, useId, useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import antigravityLogo from '../../assets/logo-google-antigravity.png';

export const Circle = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-110 hover:border-zinc-400 dark:hover:border-zinc-600',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Circle.displayName = 'Circle';

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 4,
  delay = 0,
  pathColor = 'currentColor',
  pathWidth = 2,
  pathOpacity = 0.15,
  gradientStartColor = '#00ac47',
  gradientStopColor = '#ffba00',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  dotted = false,
  dotSpacing = 6,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ['90%', '-10%'],
        x2: ['100%', '0%'],
        y1: ['0%', '0%'],
        y2: ['0%', '0%'],
      }
    : {
        x1: ['10%', '110%'],
        x2: ['0%', '100%'],
        y1: ['0%', '0%'],
        y2: ['0%', '0%'],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlX = (startX + endX) / 2;
        const controlY = (startY + endY) / 2 + curvature;
        const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updatePath);
    updatePath();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePath);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'pointer-events-none absolute left-0 top-0 transform-gpu stroke-2 text-zinc-400 dark:text-zinc-600',
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        strokeDasharray={dotted ? `${dotSpacing} ${dotSpacing}` : undefined}
      />
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeOpacity="1"
        strokeLinecap="round"
        strokeDasharray={dotted ? `${dotSpacing} ${dotSpacing}` : undefined}
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: '0%',
            x2: '0%',
            y1: '0%',
            y2: '0%',
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

export const Icons = {
  react: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full text-[#087ea4] dark:text-[#58c4dc] fill-current">
      <title>React</title>
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  reactjs: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full text-[#087ea4] dark:text-[#58c4dc] fill-current">
      <title>React</title>
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),

  python: () => (
    <svg viewBox="0 0 110 110" className="w-full h-full">
      <title>Python</title>
      <path
        fill="#387eb8"
        d="M54.5 10c-24.1 0-22.6 10.4-22.6 10.4l.03 10.8h23v3.3H22.3s-12.3 1.4-12.3 22.6c0 21.2 10.7 22.1 10.7 22.1h6.4v-9.2c0-10.4 8.7-10.4 8.7-10.4h22.8s8.4.2 8.4-8.2V20.4s1.7-10.4-22.5-10.4zm-12.6 7a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"
      />
      <path
        fill="#ffe052"
        d="M55.5 100c24.1 0 22.6-10.4 22.6-10.4l-.03-10.8h-23v-3.3h32.6s12.3-1.4 12.3-22.6c0-21.2-10.7-22.1-10.7-22.1h-6.4v9.2c0 10.4-8.7 10.4-8.7 10.4H50.9s-8.4-.2-8.4 8.2v31s-1.7 10.4 22.5 10.4zm12.6-7a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
      />
    </svg>
  ),

  js: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
      <title>JavaScript</title>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1.1 0 1.9-.6 1.9-1.9V8H9.3v7.8c0 .5-.3.7-.7.7-.3 0-.6-.2-.8-.6L7 16.5zm8.5-4.2c-.8-.5-1.5-.9-2.1-1.3-.4-.3-.6-.6-.6-1 0-.6.5-1 1.2-1 .7 0 1.2.3 1.6.8l1.2-.9c-.7-.9-1.6-1.3-2.8-1.3-1.6 0-2.8 1-2.8 2.5 0 1.1.6 1.8 1.9 2.5.9.5 1.7.9 2.2 1.3.5.4.7.8.7 1.3 0 .8-.7 1.4-1.6 1.4-1 0-1.7-.5-2.2-1.3l-1.3.9c.7 1.3 1.9 1.9 3.5 1.9 2 0 3.3-1.1 3.3-2.8 0-1.2-.7-2-2-2.7z"
        fill="#000000"
      />
    </svg>
  ),
  javascript: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
      <title>JavaScript</title>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1.1 0 1.9-.6 1.9-1.9V8H9.3v7.8c0 .5-.3.7-.7.7-.3 0-.6-.2-.8-.6L7 16.5zm8.5-4.2c-.8-.5-1.5-.9-2.1-1.3-.4-.3-.6-.6-.6-1 0-.6.5-1 1.2-1 .7 0 1.2.3 1.6.8l1.2-.9c-.7-.9-1.6-1.3-2.8-1.3-1.6 0-2.8 1-2.8 2.5 0 1.1.6 1.8 1.9 2.5.9.5 1.7.9 2.2 1.3.5.4.7.8.7 1.3 0 .8-.7 1.4-1.6 1.4-1 0-1.7-.5-2.2-1.3l-1.3.9c.7 1.3 1.9 1.9 3.5 1.9 2 0 3.3-1.1 3.3-2.8 0-1.2-.7-2-2-2.7z"
        fill="#000000"
      />
    </svg>
  ),

  ionic: () => (
    <svg viewBox="0 0 512 512" className="w-full h-full" fill="none">
      <title>Ionic</title>
      <circle cx="256" cy="256" r="256" fill="#3880FF" />
      <circle cx="256" cy="256" r="68" fill="#FFFFFF" />
      <circle cx="396" cy="256" r="34" fill="#FFFFFF" />
      <circle cx="160" cy="156" r="26" fill="#FFFFFF" />
    </svg>
  ),

  firebase: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
      <title>Firebase</title>
      <path d="M4.2 17.5L7.8 2.8c.1-.4.6-.5.9-.2l4.1 7.6-8.6 7.3z" fill="#FFA000" />
      <path d="M14.5 9.1L12.7 5.7c-.2-.4-.7-.4-.9 0L4.2 17.5l10.3-8.4z" fill="#F57C00" />
      <path d="M12.8 21.6l6.9-4.1-3.9-9.9c-.2-.4-.7-.5-.9-.1L4.2 17.5l8.6 4.1z" fill="#FFCA28" />
      <path d="M12.8 21.6l6.9-4.1-4.9-3.2-2 7.3z" fill="#FFA000" />
    </svg>
  ),

  figma: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
      <title>Figma</title>
      <path d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z" fill="#0ACF83" />
      <path d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z" fill="#A259FF" />
      <path d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z" fill="#F24E1E" />
      <path d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z" fill="#FF7262" />
      <path d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12Z" fill="#1ABCFE" />
    </svg>
  ),

  github: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-zinc-900 dark:text-white">
      <title>GitHub</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),

  tinkercad: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full" fill="none">
      <title>Tinkercad 3D</title>
      <path d="M64 14 L112 38 L112 88 L64 114 L16 88 L16 38 Z" fill="#0096D6" />
      <path d="M64 14 L112 38 L64 64 L16 38 Z" fill="#FFD100" />
      <path d="M64 64 L112 38 L112 88 L64 114 Z" fill="#E6007E" />
      <path d="M16 38 L64 64 L64 114 L16 88 Z" fill="#0072CE" />
    </svg>
  ),
  thinkercad: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full" fill="none">
      <title>Tinkercad 3D</title>
      <path d="M64 14 L112 38 L112 88 L64 114 L16 88 L16 38 Z" fill="#0096D6" />
      <path d="M64 14 L112 38 L64 64 L16 38 Z" fill="#FFD100" />
      <path d="M64 64 L112 38 L112 88 L64 114 Z" fill="#E6007E" />
      <path d="M16 38 L64 64 L64 114 L16 88 Z" fill="#0072CE" />
    </svg>
  ),

  antigravity: () => (
    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1 bg-white dark:bg-zinc-950">
      <img
        src={antigravityLogo}
        alt="Google Antigravity"
        className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-transform hover:scale-110 duration-200"
        onError={(e) => {
          e.target.src = '/img/logo-google-antigravity.png';
        }}
      />
    </div>
  ),
  logo: () => (
    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1 bg-white dark:bg-zinc-950">
      <img
        src={antigravityLogo}
        alt="Google Antigravity"
        className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-transform hover:scale-110 duration-200"
        onError={(e) => {
          e.target.src = '/img/logo-google-antigravity.png';
        }}
      />
    </div>
  ),
};
