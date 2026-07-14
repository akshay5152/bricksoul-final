"use client"

import Image from "next/image"
import { motion, type MotionValue, useTransform } from "framer-motion"

/**
 * Five-layer scroll-zoom that walks INTO and THROUGH the building:
 * exterior -> entrance hall -> living space -> staircase -> upper gallery.
 * Each layer zooms deep toward its central opening, then dissolves to
 * reveal the next room, so scrolling feels like moving through the house.
 */

const LAYERS = [
  {
    src: "/images/grey-building-exterior.png",
    alt: "Grey and white painted square building, frontal view at overcast daylight",
    priority: true,
  },
  {
    src: "/images/grey-interior-hall.png",
    alt: "Minimal grey and white double-height entrance hall",
    priority: false,
  },
  {
    src: "/images/grey-interior-living.png",
    alt: "Grey monochrome living space with concrete floor and soft light",
    priority: false,
  },
  {
    src: "/images/grey-interior-stair.png",
    alt: "Sculptural grey concrete staircase lit by a skylight",
    priority: false,
  },
  {
    src: "/images/grey-interior-gallery.png",
    alt: "Upper gallery corridor with square openings and soft grey light",
    priority: false,
  },
]

const STAGE = 1 / LAYERS.length // each room owns an equal slice of scroll

function Layer({
  progress,
  index,
}: {
  progress: MotionValue<number>
  index: number
}) {
  const isFirst = index === 0
  const isLast = index === LAYERS.length - 1

  const start = index * STAGE
  const end = start + STAGE

  // Enter slightly zoomed (as if emerging from the previous doorway),
  // settle, then zoom hard toward the center to pass into the next room.
  const scale = useTransform(
    progress,
    isFirst ? [start, end] : [start - STAGE * 0.35, start, end],
    isFirst ? [1.04, 3.4] : [1.45, 1.04, isLast ? 1.18 : 3.4],
  )
  // Fade out at the very end of the slice; the last room never fades.
  const opacity = useTransform(
    progress,
    isLast ? [start - STAGE * 0.3, start] : [start - STAGE * 0.3, start, end - STAGE * 0.22, end],
    isFirst ? [1, 1, 1, 0] : isLast ? [0, 1] : [0, 1, 1, 0],
  )
  const y = useTransform(progress, [start, end], ["0%", "-4%"])

  const layer = LAYERS[index]

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className="absolute inset-0 h-full w-full will-change-transform"
    >
      <Image
        src={layer.src || "/placeholder.svg"}
        alt={layer.alt}
        fill
        priority={layer.priority}
        sizes="100vw"
        quality={95}
        className="object-cover object-center"
      />
    </motion.div>
  )
}

export default function HeroImageScene({
  progress,
}: {
  progress: MotionValue<number>
}) {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-background">
      {/* Render back-to-front so earlier rooms sit on top and dissolve away */}
      {LAYERS.map((layer, i) => (
        <Layer key={layer.src} progress={progress} index={LAYERS.length - 1 - i} />
      ))}

      {/* Cool grey grade for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/15 to-background/80" />
    </div>
  )
}
