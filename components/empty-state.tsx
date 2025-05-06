"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center mt-6"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900">
        <FileText className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold">No resumes yet</h3>
      <p className="mt-2 text-center text-gray-500 dark:text-gray-400 max-w-sm">
        You haven't created any resumes yet. Start by creating your first ATS-optimized resume.
      </p>
      <div className="mt-6">
        <Link href="/resume/new">
          <Button className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 shadow-md hover:shadow-lg group">
            <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
            Create Resume
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
