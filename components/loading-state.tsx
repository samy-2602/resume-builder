"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState() {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-violet-600 mb-8"
      />
      <div className="space-y-2 w-[250px]">
        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-800" />
        <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  )
}
