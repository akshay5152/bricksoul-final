"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import { ArrowDown } from "lucide-react"

import HeroImageScene from "./hero-image-scene"

const ease = [0.22, 1, 0.36, 1] as const

export default function ScrollJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  // Smooth the raw scroll for the camera so the zoom feels cinematic
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 })

  // ---- Stage opacities (5 rooms, each owns ~0.2 of scroll) ----
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.17], [1, 1, 0])
  const stage1Y = useTransform(scrollYProgress, [0, 0.17], [0, -60])

  // Framer's style binding for opacity breaks on containers with animated motion
  // children, so we write these two opacities to the DOM directly.
  const stage1Ref = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  useMotionValueEvent(stage1Opacity, "change", (v) => {
    if (stage1Ref.current) {
      stage1Ref.current.style.opacity = String(v)
      stage1Ref.current.style.pointerEvents = v < 0.05 ? "none" : "auto"
    }
  })
  const stage2Opacity = useTransform(scrollYProgress, [0.22, 0.27, 0.34, 0.39], [0, 1, 1, 0])
  const stage3Opacity = useTransform(scrollYProgress, [0.42, 0.47, 0.54, 0.59], [0, 1, 1, 0])
  const stage4Opacity = useTransform(scrollYProgress, [0.62, 0.67, 0.74, 0.79], [0, 1, 1, 0])
  const stage5Opacity = useTransform(scrollYProgress, [0.83, 0.9, 1], [0, 1, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  const fadeToNext = useTransform(scrollYProgress, [0.96, 1], [0, 0.5])
  useMotionValueEvent(hintOpacity, "change", (v) => {
    if (hintRef.current) hintRef.current.style.opacity = String(v)
  })

  return (
    <section ref={ref} id="top" className="relative h-[700vh]">
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-screen scroll-zoom walkthrough of the building */}
        <div className="absolute inset-0 z-0">
          <HeroImageScene progress={smoothProgress} />
        </div>

        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-background/60" />
        <motion.div
          style={{ opacity: fadeToNext }}
          className="pointer-events-none absolute inset-0 z-10 bg-background"
        />

        {/* ---- Stage 1: Hero intro (exterior) ---- */}
        <div ref={stage1Ref} className="absolute inset-0 z-20">
          <motion.div
            style={{ y: stage1Y }}
            className="flex h-full w-full flex-col items-start justify-center px-6 lg:px-16"
          >
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="mb-6 text-xs uppercase tracking-[0.35em] text-primary"
            >
              Architecture Studio — Est. 2012
            </motion.p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-foreground text-balance md:text-7xl lg:text-8xl">
              {["We build in", "concrete, light", "and grey."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.35 + i * 0.14, ease }}
                  >
                    {i === 2 ? (
                      <>
                        and <em className="text-primary">grey.</em>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease }}
              className="mt-8 max-w-md leading-relaxed text-muted-foreground text-pretty"
            >
              Brick &amp; Soul is a studio for residential, cultural and public architecture. Scroll to step through
              the doorway and walk the whole house.
            </motion.p>
          </motion.div>
        </div>

        {/* ---- Stage 2: Entrance hall (right) ---- */}
        <motion.div
          style={{ opacity: stage2Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end px-6 lg:px-16"
        >
          <div className="max-w-sm text-right">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">01 — Arrival</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
              The hall receives you in silence.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
              A double-height threshold of white walls and grey concrete — the pause between the street and the life
              inside.
            </p>
          </div>
        </motion.div>

        {/* ---- Stage 3: Living space (bottom left) ---- */}
        <motion.div
          style={{ opacity: stage3Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-start px-6 pb-28 lg:px-16"
        >
          <div className="max-w-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">02 — Living</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
              One window. One room. Enough.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
              The living space frames a single view and lets the grey light do the decorating.
            </p>
          </div>
        </motion.div>

        {/* ---- Stage 4: Staircase (top right) ---- */}
        <motion.div
          style={{ opacity: stage4Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-start justify-end px-6 pt-32 lg:px-16"
        >
          <div className="max-w-sm text-right">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">03 — Ascent</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
              The stair climbs toward the skylight.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
              Cast in a single pour, the staircase is the building&apos;s spine — every step tuned to the light from
              above.
            </p>
          </div>
        </motion.div>

        {/* ---- Stage 5: Upper gallery (center) ---- */}
        <motion.div
          style={{ opacity: stage5Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">04 — Light</p>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight text-foreground text-balance md:text-6xl">
            Step inside the work.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground text-pretty">
            The gallery opens to the sky. Keep scrolling to see what we have built.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <div ref={hintRef} className="absolute inset-x-0 bottom-0 z-20">
          <div className="flex items-center justify-between px-6 pb-8 lg:px-16">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowDown size={14} className="text-primary" aria-hidden="true" />
              </motion.span>
              <span>Scroll to walk through the building</span>
            </div>
            <p className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground sm:block">
              Kochi — Bengaluru — Dubai
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
