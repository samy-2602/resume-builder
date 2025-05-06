"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

interface ConfettiEffectProps {
  trigger: boolean
}

export function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const [effectTriggered, setEffectTriggered] = useState(false)

  useEffect(() => {
    if (trigger && !effectTriggered) {
      setEffectTriggered(true)

      // Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0891b2", "#7c3aed", "#f43f5e"],
      })

      // Reset after a delay
      const timer = setTimeout(() => {
        setEffectTriggered(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [trigger, effectTriggered])

  // This is a non-visual component
  return null
}
