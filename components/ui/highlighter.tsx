"use client"

import { useLayoutEffect, useRef } from "react"
import type React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let rafId: number | null = null
    let handleResize: (() => void) | null = null

    if (!shouldReduceMotion && shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      const currentAnnotation = annotate(element, annotationConfig)
      annotation = currentAnnotation
      currentAnnotation.show()

      const redraw = () => {
        currentAnnotation.hide()
        currentAnnotation.show()
      }

      handleResize = () => {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId)
        }
        rafId = window.requestAnimationFrame(redraw)
      }

      resizeObserver = new ResizeObserver(() => {
        handleResize?.()
      })

      resizeObserver.observe(element)
      window.addEventListener("resize", handleResize, { passive: true })
    }

    return () => {
      annotation?.remove()
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      if (handleResize) {
        window.removeEventListener("resize", handleResize)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    shouldReduceMotion,
  ])

  if (shouldReduceMotion) {
    return (
      <span
        ref={elementRef}
        className="relative inline-block rounded-[0.2rem] bg-transparent px-0.5"
        style={{ backgroundColor: color }}
      >
        {children}
      </span>
    )
  }

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
