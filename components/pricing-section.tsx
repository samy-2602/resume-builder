"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out SamScripts",
      features: [
        "1 Resume",
        "Basic Templates",
        "PDF Export",
        "ATS-Optimized",
        "X|Cloud Storage",
        "X|Premium Templates",
        "X|Resume Analytics",
        "X|Priority Support",
      ],
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "Everything you need for job hunting",
      popular: true,
      features: [
        "Unlimited Resumes",
        "All Templates",
        "PDF Export",
        "ATS-Optimized",
        "Cloud Storage",
        "Premium Templates",
        "Resume Analytics",
        "X|Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "per month",
      description: "For serious job seekers and professionals",
      features: [
        "Unlimited Resumes",
        "All Templates",
        "PDF Export",
        "ATS-Optimized",
        "Cloud Storage",
        "Premium Templates",
        "Resume Analytics",
        "Priority Support",
      ],
    },
  ]

  return (
    ''
  )
}
