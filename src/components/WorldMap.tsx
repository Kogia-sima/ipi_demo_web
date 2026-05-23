"use client";

import Image from "next/image";
import { type MapPoint, SCENARIOS, SOURCE_POINT } from "@/data/scenarios";
import { cn } from "@/utils/utils";

type Props = {
  scenarioId: 1 | 2 | 3 | null;
  attackActive: boolean;
};

export function WorldMap({ scenarioId, attackActive }: Props) {
  const target: MapPoint | null = scenarioId
    ? SCENARIOS[scenarioId].target
    : null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="relative aspect-640/350 w-full">
        <Image
          src="/worldmap.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-80"
          draggable={false}
          priority
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <title>世界地図上の通信経路</title>
          {/* Source pin */}
          <Pin x={SOURCE_POINT.x} y={SOURCE_POINT.y} color="#38bdf8" />
          {/* Target pin */}
          {target && (
            <Pin
              x={target.x}
              y={target.y}
              color="#f87171"
              pulse={attackActive}
            />
          )}
          {/* Animated packet */}
          {target && attackActive && (
            <AnimatedPacket from={SOURCE_POINT} to={target} />
          )}
        </svg>

        {/* Labels */}
        <Label point={SOURCE_POINT} className="text-sky-300" />
        {target && (
          <Label
            point={target}
            className={cn(
              "text-rose-300",
              attackActive && "font-semibold text-rose-200",
            )}
          />
        )}
      </div>
    </div>
  );
}

function Pin({
  x,
  y,
  color,
  pulse,
}: {
  x: number;
  y: number;
  color: string;
  pulse?: boolean;
}) {
  return (
    <g>
      {pulse && (
        <circle
          cx={x}
          cy={y}
          r="2"
          fill={color}
          opacity="0.35"
          style={{
            transformOrigin: `${x}% ${y}%`,
            animation: "ipi-pin-pulse 1.4s ease-out infinite",
          }}
        />
      )}
      <circle cx={x} cy={y} r="1.1" fill={color} />
      <circle cx={x} cy={y} r="0.5" fill="#fff" />
    </g>
  );
}

function AnimatedPacket({ from, to }: { from: MapPoint; to: MapPoint }) {
  const path = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - 12} ${to.x} ${to.y}`;
  return (
    <g>
      <path
        d={path}
        stroke="#f87171"
        strokeWidth="0.4"
        strokeDasharray="0.8 0.8"
        fill="none"
        opacity="0.7"
      />
      <circle r="0.9" fill="#fde68a">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={path} />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

function Label({ point, className }: { point: MapPoint; className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute -translate-x-1/2 translate-y-2 text-[10px] tracking-wide whitespace-nowrap drop-shadow-md",
        className,
      )}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      {point.label}
    </span>
  );
}
