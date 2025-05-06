"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      content:
        "SamScripts helped me land my dream job at a top tech company. The ATS-optimized templates made all the difference in getting past the initial screening.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Marketing Manager",
      content:
        "I was struggling to get interviews until I used SamScripts. The modern templates and ATS optimization features helped my resume stand out from the crowd.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content:
        "The real-time preview feature saved me so much time. I could see exactly how my resume would look as I was building it. Highly recommend!",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
  ]

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-cyan-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Users{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 md:text-xl max-w-3xl mx-auto">
            Join thousands of job seekers who have successfully landed interviews with SamScripts.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-cyan-100 dark:bg-cyan-900">
                    <img
                      src={testimonials[current].avatar || "/placeholder.svg"}
                      alt={testimonials[current].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                    <div className="bg-gradient-to-r from-cyan-600 to-violet-600 rounded-full p-1">
                      <Star className="h-4 w-4 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonials[current].content}"
                </blockquote>
                <div>
                  <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
