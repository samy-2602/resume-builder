"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { FileText, MoreVertical, Edit, Trash, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"

interface Resume {
  id: string
  title: string
  template: string
  updatedAt: string
  createdAt: string
}

interface ResumeListProps {
  resumes: Resume[]
  onDelete?: (id: string) => void
}

export function ResumeList({ resumes: initialResumes, onDelete }: ResumeListProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [resumes, setResumes] = useState<Resume[]>(initialResumes)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!user || isDeleting) return

    setIsDeleting(id)
    try {
      await deleteDoc(doc(db, "users", user.uid, "resumes", id))
      
      // Update local state
      setResumes(prevResumes => prevResumes.filter(resume => resume.id !== id))
      
      // Notify parent component
      onDelete?.(id)

      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting resume:", error)
      toast({
        title: "Error",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence mode="popLayout">
        {resumes.map((resume) => (
          <motion.div
            key={resume.id}
            variants={item}
            layout
            className="group relative h-full"
            whileHover={{ scale: 1.02, zIndex: 1 }}
            onHoverStart={() => setExpandedId(resume.id)}
            onHoverEnd={() => setExpandedId(null)}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="relative h-full rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300">
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem asChild>
                      <Link href={`/resume/edit/${resume.id}`} className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/resume/preview/${resume.id}`} className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600 cursor-pointer" 
                      onClick={() => handleDelete(resume.id)}
                      disabled={isDeleting === resume.id}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      {isDeleting === resume.id ? "Deleting..." : "Delete"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Link href={`/resume/edit/${resume.id}`} className="block h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full p-3 bg-gradient-to-br from-cyan-100 to-violet-100 dark:from-cyan-900 dark:to-violet-900 shrink-0">
                      <FileText className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium leading-tight group-hover:text-cyan-600 transition-colors mb-1 line-clamp-1">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 break-words">
                        {resume.template}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 flex items-center justify-between text-xs text-muted-foreground border-t">
                    <span className="truncate">
                      Updated {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}
                    </span>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>Template</span>
                    </div>
                  </div>
                </div>
              </Link>

              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-violet-600 rounded-b-xl"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: expandedId === resume.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
