"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const projects = [
  {
    title: "Grey Cube House",
    category: "Private Residence",
    year: "2025",
    location: "Kochi",
    image: "/images/project-grey-cube-house.png",
    alt: "Minimalist cubic house with grey and white painted concrete facade",
  },
  {
    title: "Pavilion of Silence",
    category: "Public Space",
    year: "2024",
    location: "Bengaluru",
    image: "/images/project-grey-pavilion.png",
    alt: "Minimalist white and grey concrete pavilion in an open plaza",
  },
  {
    title: "Shadow Grid Courtyard",
    category: "Residential",
    year: "2024",
    location: "Kochi",
    image: "/images/project-grey-courtyard.png",
    alt: "Interior courtyard with perforated white walls casting a shadow grid",
  },
  {
    title: "Vaulted Culture Hall",
    category: "Cultural",
    year: "2023",
    location: "Dubai",
    image: "/images/project-grey-hall.png",
    alt: "Vast cultural hall with grey concrete vaulted ceiling and skylight",
  },
]

/** Direction-aware variants — each frame slides in from the side you pressed. */
const frameVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "60%" : "-60%",
    opacity: 0,
    scale: 0.92,
  }),
  center: { x: "0%", opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-40%" : "40%",
    opacity: 0,
    scale: 0.96,
  }),
}

/** The image inside the frame moves slightly less, creating a parallax layer. */
const imageVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "12%" : "-12%", scale: 1.15 }),
  center: { x: "0%", scale: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? "-8%" : "8%", scale: 1.08 }),
}

/** Text block trails the frame for the multi-frame layered motion. */
const textVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
}

export default function Projects() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])

  const paginate = (dir: number) => {
    setState(([i]) => [(i + dir + projects.length) % projects.length, dir])
  }

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return (
    <section id="work" className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">Selected Work</p>
            <h2 className="font-serif text-4xl text-foreground text-balance md:text-6xl">
              Spaces that hold <em className="text-primary">memory</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="flex items-center gap-4"
          >
            <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous project"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next project"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---- Slider stage: main frame + peeking next frame ---- */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative flex items-stretch gap-6">
          {/* Main frame */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted lg:w-3/4">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={project.title}
                custom={direction}
                variants={frameVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease }}
                className="absolute inset-0 overflow-hidden"
              >
                <motion.div
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Caption overlaid on the frame */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 lg:p-8">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={project.title}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, delay: 0.08, ease }}
                >
                  <p className="mb-1 text-xs uppercase tracking-[0.3em] text-primary">
                    {project.category} — {project.location}
                  </p>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-3xl text-foreground md:text-5xl">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Peeking next frame (second motion layer) */}
          <div className="relative hidden w-1/4 overflow-hidden rounded-sm bg-muted lg:block">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={next.title}
                custom={direction}
                initial={{ x: direction > 0 ? "70%" : "-70%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: direction > 0 ? "-30%" : "30%", opacity: 0 }}
                transition={{ duration: 0.85, delay: 0.12, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={next.image || "/placeholder.svg"}
                  alt={next.alt}
                  fill
                  sizes="25vw"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-background/40" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Up next</p>
                  <p className="mt-1 font-serif text-lg text-foreground">{next.title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="absolute inset-0 z-10"
              aria-label={`View next project: ${next.title}`}
            />
          </div>
        </div>

        {/* Progress track */}
        <div className="mt-8 flex gap-2" role="tablist" aria-label="Project slides">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${p.title}`}
              onClick={() => setState(([cur]) => [i, i > cur ? 1 : -1])}
              className="group flex-1 py-2"
            >
              <span
                className={`block h-0.5 w-full transition-colors duration-500 ${
                  i === index ? "bg-primary" : "bg-border group-hover:bg-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
