import React, { useRef } from 'react';
import { AnimatedBeam, Circle, Icons } from './ui/animated-beam';
import { cn } from '../lib/utils';

export default function SkillsBeam() {
  const containerRef = useRef(null);

  const divReactRef = useRef(null);
  const divPythonRef = useRef(null);
  const divJsRef = useRef(null);
  const divIonicRef = useRef(null);

  const divCenterRef = useRef(null);

  const divFirebaseRef = useRef(null);
  const divFigmaRef = useRef(null);
  const divGithubRef = useRef(null);
  const divTinkercadRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/70 dark:bg-zinc-900/60 px-4 py-8 sm:px-8 sm:py-10 shadow-sm dark:shadow-2xl transition-all duration-300"
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-8 sm:gap-10 relative z-10">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Circle ref={divReactRef} className="p-2 sm:p-2.5">
              <Icons.react />
            </Circle>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden xs:inline">
              React
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-row-reverse">
            <Circle ref={divFirebaseRef} className="p-2 sm:p-2.5">
              <Icons.firebase />
            </Circle>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden xs:inline">
              Firebase
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Circle ref={divPythonRef} className="p-2 sm:p-2.5">
              <Icons.python />
            </Circle>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden xs:inline">
              Python
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-row-reverse">
            <Circle ref={divFigmaRef} className="p-2 sm:p-2.5">
              <Icons.figma />
            </Circle>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden xs:inline">
              Figma
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Circle ref={divJsRef} className="p-2 sm:p-2.5">
              <Icons.js />
            </Circle>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden xs:inline">
              JavaScript
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-row-reverse">
            <Circle ref={divGithubRef} className="p-2 sm:p-2.5">
              <Icons.github />
            </Circle>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden xs:inline">
              GitHub
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Circle ref={divIonicRef} className="p-2 sm:p-2.5">
              <Icons.ionic />
            </Circle>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden xs:inline">
              Ionic
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-row-reverse">
            <Circle ref={divTinkercadRef} className="p-2 sm:p-2.5">
              <Icons.tinkercad />
            </Circle>
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden xs:inline">
              Tinkercad 3D
            </span>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <Circle
          ref={divCenterRef}
          className="h-16 w-16 sm:h-20 sm:w-20 p-2 sm:p-2.5 ring-4 ring-emerald-500/25 dark:ring-emerald-400/25 shadow-2xl border-2 border-emerald-500/40 bg-white dark:bg-zinc-950"
        >
          <Icons.antigravity />
        </Circle>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divReactRef}
        toRef={divCenterRef}
        curvature={-60}
        endYOffset={-10}
        dotted
        gradientStartColor="#00ac47"
        gradientStopColor="#61dafb"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divPythonRef}
        toRef={divCenterRef}
        curvature={-25}
        endYOffset={-4}
        dotted
        gradientStartColor="#387eb8"
        gradientStopColor="#ffe052"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divJsRef}
        toRef={divCenterRef}
        curvature={25}
        endYOffset={4}
        dotted
        gradientStartColor="#f7df1e"
        gradientStopColor="#f77f00"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divIonicRef}
        toRef={divCenterRef}
        curvature={60}
        endYOffset={10}
        dotted
        gradientStartColor="#3880ff"
        gradientStopColor="#5b60ff"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divFirebaseRef}
        toRef={divCenterRef}
        curvature={-60}
        endYOffset={-10}
        reverse
        dotted
        gradientStartColor="#ffca28"
        gradientStopColor="#f57c00"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divFigmaRef}
        toRef={divCenterRef}
        curvature={-25}
        endYOffset={-4}
        reverse
        dotted
        gradientStartColor="#f24e1e"
        gradientStopColor="#a259ff"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divGithubRef}
        toRef={divCenterRef}
        curvature={25}
        endYOffset={4}
        reverse
        dotted
        gradientStartColor="#6e5494"
        gradientStopColor="#2dba4e"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divTinkercadRef}
        toRef={divCenterRef}
        curvature={60}
        endYOffset={10}
        reverse
        dotted
        gradientStartColor="#0096d6"
        gradientStopColor="#e6007e"
      />
    </div>
  );
}
