"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ResumeList } from "@/components/resume-list"
import { EmptyState } from "@/components/empty-state"
import { LoadingState } from "@/components/loading-state"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Resume = {
  id: string
  title: string
  template: string
  updatedAt: string
  createdAt: string
}



export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const fetchResumes = async () => {
    if (!user) return

    try {
      const resumesRef = collection(db, "users", user.uid, "resumes")
      const q = query(resumesRef, orderBy("updatedAt", sortOrder))
      const querySnapshot = await getDocs(q)

      const resumeData: Resume[] = []
      querySnapshot.forEach((doc) => {
        resumeData.push({
          id: doc.id,
          title: doc.data().title,
          template: doc.data().template,
          updatedAt: doc.data().updatedAt,
          createdAt: doc.data().createdAt,
        })
      })

      setResumes(resumeData)
    } catch (error) {
      console.error("Error fetching resumes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchResumes()
    }
  }, [user, sortOrder])

  const handleResumeDelete = (id: string) => {
    // Update local state immediately
    setResumes(prevResumes => prevResumes.filter(resume => resume.id !== id))
  }

  const filteredResumes = resumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading || !user) {
    return (
      <DashboardShell>
        <div className="space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardHeader 
          heading="My Professional Resumes" 
          text="Create, edit and manage your free ATS-optimized resumes."
        >
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search your resumes..."
              aria-label="Search resumes"
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              aria-label="Sort resumes"
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </div>
        </DashboardHeader>
        
        <div role="main" aria-label="Resume list">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingState />
            ) : filteredResumes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <EmptyState />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6">
                  <ResumeList resumes={filteredResumes} onDelete={handleResumeDelete} />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </DashboardShell>
  )
}
