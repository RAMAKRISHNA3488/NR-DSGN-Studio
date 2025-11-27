"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Video } from "lucide-react"
import { cn } from "@/lib/utils"


export function BookCall() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / 20,
        y: (e.clientY - rect.top - rect.height / 2) / 20,
      })
    }
  }

  const scrollToCalendar = () => {
    const calendarSection = document.getElementById("calendar-section")
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="book"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-24 sm:py-32 bg-secondary/30 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        {/* Floating Elements */}
        <div
          className="absolute top-10 left-10 w-20 h-20 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center transition-transform duration-500"
          style={{ transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)` }}
        >
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>
        <div
          className="absolute top-20 right-16 w-16 h-16 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center transition-transform duration-500"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        >
          <Clock className="w-6 h-6 text-muted-foreground" />
        </div>
        <div
          className="absolute bottom-10 right-10 w-14 h-14 rounded-xl bg-foreground/5 border border-border flex items-center justify-center transition-transform duration-500"
          style={{ transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)` }}
        >
          <Video className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Content */}
        <div
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6">
            Book a{" "}
            <span className="relative inline-block">
              <span className="relative z-10 underline decoration-wavy decoration-foreground/30 underline-offset-8">
                15-min
              </span>
            </span>{" "}
            call
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            Please select the time that fits you or just
            <br />
            Email us at{" "}
            <a href="mailto:narasimha9885780378@gmail.com" className="text-foreground underline-animation font-medium">
              nrdsgn@gmail.com
            </a>
          </p>

          <Button
            size="lg"
            onClick={scrollToCalendar}
            className="group magnetic-btn rounded-full px-10 h-16 text-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:shadow-2xl hover:shadow-foreground/20 hover:scale-105 active:scale-95"
          >
            Schedule a Call
            <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          {/* Trust Elements */}
          <div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Smooth Communication
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Flexible Revisions
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Post-Project Support
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
