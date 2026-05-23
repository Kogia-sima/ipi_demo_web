"use client";

import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import {
  type ExfilItem,
  type MapPoint,
  SCENARIOS,
  SOURCE_POINT,
} from "@/data/scenarios";
import { cn } from "@/utils/utils";

type Props = {
  scenarioId: 1 | 2 | 3 | null;
  attackActive: boolean;
};

export function WorldMap({ scenarioId, attackActive }: Props) {
  const scenario = scenarioId ? SCENARIOS[scenarioId] : null;
  const target: MapPoint | null = scenario?.target ?? null;
  const exfilData: ExfilItem[] = scenario?.exfilData ?? [];

  const anchorRight = target ? target.x > 60 : false;
  const anchorBottom = target ? target.y > 45 : false;
  const offsetX = anchorRight ? -2 : 2;
  const offsetY = anchorBottom ? -2 : 2;

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
          {/* Connector from pin to callout */}
          {target && attackActive && (
            <line
              x1={target.x}
              y1={target.y}
              x2={target.x + offsetX}
              y2={target.y + offsetY}
              stroke="#f87171"
              strokeWidth="0.3"
              opacity="0.7"
            />
          )}
        </svg>

        {/* Labels */}
        <Label point={SOURCE_POINT} className="text-sky-300" />
        {target && !attackActive && (
          <Label point={target} className="text-rose-300" />
        )}
        {target && attackActive && (
          <Callout
            target={target}
            items={exfilData}
            anchorRight={anchorRight}
            anchorBottom={anchorBottom}
            offsetX={offsetX}
            offsetY={offsetY}
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

function Callout({
  target,
  items,
  anchorRight,
  anchorBottom,
  offsetX,
  offsetY,
}: {
  target: MapPoint;
  items: ExfilItem[];
  anchorRight: boolean;
  anchorBottom: boolean;
  offsetX: number;
  offsetY: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20",
        "animate-in fade-in-0 zoom-in-95 duration-300",
        anchorBottom ? "slide-in-from-bottom-1" : "slide-in-from-top-1",
      )}
      style={{
        ...(anchorRight
          ? { right: `${100 - (target.x + offsetX)}%` }
          : { left: `${target.x + offsetX}%` }),
        ...(anchorBottom
          ? { bottom: `${100 - (target.y + offsetY)}%` }
          : { top: `${target.y + offsetY}%` }),
      }}
    >
      <div className="w-max max-w-[16rem] space-y-1.5 rounded-lg border border-rose-400/40 bg-zinc-900/95 px-3 py-2 shadow-lg shadow-rose-500/30 backdrop-blur">
        <div className="flex items-center gap-1.5 text-[9px] font-semibold tracking-wider text-rose-300 uppercase">
          <TriangleAlert className="size-3" />
          <span>送信データ</span>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[11px] leading-snug">
          <dt className="whitespace-nowrap text-zinc-400">送信先</dt>
          <dd className="font-medium whitespace-nowrap text-rose-200">
            {target.label}
          </dd>
          {items.map((item, i) => (
            <Fragment key={`${item.label}-${item.value}-${i}`}>
              <dt className="whitespace-nowrap text-zinc-400">{item.label}</dt>
              <dd className="font-mono whitespace-nowrap text-zinc-100">
                {item.value}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}
