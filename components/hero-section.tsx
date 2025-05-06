"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGetStarted = () => {
    router.push("/signup")
  }

  const handleViewTemplates = () => {
    router.push("/templates")
  }

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-lg bg-cyan-100 dark:bg-cyan-900 px-3 py-1 text-sm text-cyan-600 dark:text-cyan-300 mb-4 w-fit">
              ATS-Optimized Resumes
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-cyan-600 via-violet-600 to-rose-500 bg-clip-text text-transparent">
              Land Your Dream Job With a Perfect Resume
            </h1>
            <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl">
              Create professional, ATS-friendly resumes in minutes. Stand out from the competition with modern templates
              designed to get you noticed.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                onClick={handleGetStarted}
                variant="default"
                size="lg"
                className="curosor-pointer bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg group hover:scale-105 active:scale-95"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={handleViewTemplates}
                variant="outline"
                size="lg"
                className="curosor-pointer border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:scale-105 active:scale-95"
              >
                View Templates
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              {["ATS-Optimized", "Modern Templates", "PDF Export"].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-cyan-500/20 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black">
                <div className="p-8 h-full flex flex-col">
                  <div className="h-8 w-32 bg-cyan-600 rounded-md mb-6"></div>
                  <div className="flex gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-violet-600"></div>
                    <div className="flex flex-col justify-center gap-2">
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  </div>
                  <div className="mt-6">
                    <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
