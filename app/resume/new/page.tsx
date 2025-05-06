"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { DashboardShell } from "@/components/dashboard-shell"
import { TemplateSelector } from "@/components/template-selector"
import { LoadingState } from "@/components/loading-state"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function NewResumePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleCreateResume = async () => {
    if (!user) return

    if (!title.trim()) {
      toast({
        title: "Resume title required",
        description: "Please enter a title for your resume.",
        variant: "destructive",
      })
      return
    }

    if (!selectedTemplate) {
      toast({
        title: "Template selection required",
        description: "Please select a template for your resume.",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)
    try {
      const resumeId = crypto.randomUUID()
      const resumeRef = doc(db, "users", user.uid, "resumes", resumeId)

      await setDoc(resumeRef, {
        title,
        template: selectedTemplate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sections: {
          personalInfo: {
            name: "",
            email: "",
            phone: "",
            location: "",
            website: "",
            summary: "",
          },
          experience: [],
          education: [],
          skills: [],
          certifications: [],
          projects: [],
        },
      })

      toast({
        title: "Resume created",
        description: "Your new resume has been created successfully.",
      })

      router.push(`/resume/edit/${resumeId}`)
    } catch (error) {
      toast({
        title: "Error creating resume",
        description: "There was a problem creating your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  if (loading || !user) {
    return <LoadingState />
  }

  return (
    <DashboardShell>
      <div className="max-w-8xl mx-auto py-8">
        <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Create New Resume</h1>
              <p className="text-muted-foreground">
                Fill in the details below to create your new resume.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Resume Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Software Engineer Resume"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Choose a descriptive name that reflects the position or industry you're targeting.
                  </p>
                </div>
              </div>

              <div className="mx-auto space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Choose a Template</h2>
                  <p className="text-muted-foreground mb-4">
                    Select a template that best represents your professional style.
                  </p>
                </div>
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelect={setSelectedTemplate}
                />
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button
                onClick={handleCreateResume}
                disabled={isCreating}
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white"
              >
                {isCreating ? "Creating Resume..." : "Create Resume"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  )
}
