"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { DashboardShell } from "@/components/dashboard-shell"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { LoadingState } from "@/components/loading-state"
import { ConfettiEffect } from "@/components/confetti-effect"
import { exportResumeToPDF } from "@/lib/resume-export"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Download, Eye, EyeOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"


interface ResumeData {
  id: string
  title: string
  template: string
  updatedAt: string
  createdAt: string
  sections: {
    personalInfo: {
      name: string
      email: string
      phone: string
      location: string
      website: string
      summary: string
    }
    experience: Array<{
      company: string
      position: string
      startDate: string
      endDate: string
      current: boolean
      description: string
    }>
    education: Array<{
      institution: string
      degree: string
      field: string
      startDate: string
      endDate: string
      current: boolean
      description: string
    }>
    skills: string[]
    certifications: Array<{
      name: string
      issuer: string
      date: string
      url: string
    }>
    projects: Array<{
      name: string
      description: string
      url: string
      startDate: string
      endDate: string
    }>
  }
}




export default function EditResumeClient({ id }: { id: string }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchResume = async () => {
      if (!user) return

      try {
        const resumeRef = doc(db, "users", user.uid, "resumes", id)
        const resumeSnap = await getDoc(resumeRef)

        if (resumeSnap.exists()) {
          setResumeData({
            id: resumeSnap.id,
            ...resumeSnap.data(),
          } as ResumeData)
        } else {
          toast({
            title: "Resume not found",
            description: "The resume you're looking for doesn't exist.",
            variant: "destructive",
          })
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error fetching resume:", error)
        toast({
          title: "Error loading resume",
          description: "There was a problem loading your resume. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchResume()
    }
  }, [user, id, router, toast])

  const handleSave = async () => {
    if (!user || !resumeData) return

    setIsSaving(true)

    try {
      const resumeRef = doc(db, "users", user.uid, "resumes", id)

      await updateDoc(resumeRef, {
        ...resumeData,
        updatedAt: new Date().toISOString(),
      })

      toast({
        title: "Resume saved!",
        description: "Your resume has been saved successfully.",
      })

      setHasChanges(false)
      setShowConfetti(true)

      // Hide confetti after a few seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    } catch (error) {
      toast({
        title: "Error saving resume",
        description: "There was a problem saving your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateResumeData = (newData: Partial<ResumeData>) => {
    if (resumeData) {
      setResumeData({ ...resumeData, ...newData })
      setHasChanges(true)
    }
  }

  const handleExportPDF = async () => {
    if (!resumeData) return

    setIsExporting(true)

    try {
      // Show preview first if it's not already visible
      if (!showPreview) {
        setShowPreview(true)
        // Wait for the preview to render
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      await exportResumeToPDF(resumeData.id, resumeData.title)

      toast({
        title: "PDF exported successfully",
        description: "Your resume has been downloaded as a PDF file.",
      })
    } catch (error) {
      console.error("Error exporting PDF:", error)
      toast({
        title: "Export failed",
        description: "There was a problem exporting your resume to PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  if (loading || !user || isLoading) {
    return <LoadingState />
  }

  if (!resumeData) {
    return null
  }

  return (
    <DashboardShell>
      <ConfettiEffect trigger={showConfetti} />

      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{resumeData.title}</h1>
              <p className="text-muted-foreground">Template: {resumeData.template}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300"
            >
              {showPreview ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              disabled={isExporting}
              className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              {isExporting ? "Exporting..." : "Export PDF"}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              size="sm"
              className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">
          <motion.div
            className={`flex-1 overflow-auto ${showPreview ? "hidden md:block md:w-1/2" : "w-full"}`}
            animate={{
              width: showPreview ? "50%" : "100%",
              opacity: 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <ResumeEditor resumeData={resumeData} onUpdateResumeData={handleUpdateResumeData} />
          </motion.div>

          <AnimatePresence>
            {showPreview && (
              <motion.div
                className="flex-1 overflow-auto bg-white dark:bg-gray-900 rounded-lg border shadow-sm"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "50%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ResumePreview resumeData={resumeData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardShell>
  )
}
