"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/resume-forms/personal-info-form"
import { ExperienceForm } from "@/components/resume-forms/experience-form"
import { EducationForm } from "@/components/resume-forms/education-form"
import { SkillsForm } from "@/components/resume-forms/skills-form"
import { ProjectsForm } from "@/components/resume-forms/projects-form"
import { CertificationsForm } from "@/components/resume-forms/certifications-form"

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

interface ResumeEditorProps {
  resumeData: ResumeData
  onUpdateResumeData: (data: Partial<ResumeData>) => void
}

export function ResumeEditor({ resumeData, onUpdateResumeData }: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState("personal-info")

  const handleUpdateSection = (section: string, data: any) => {
    onUpdateResumeData({
      sections: {
        ...resumeData.sections,
        [section]: data,
      },
    })
  }

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full rounded-t-lg rounded-b-none bg-gray-100 dark:bg-gray-900">
          <TabsTrigger
            value="personal-info"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-500"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-500"
          >
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-500"
          >
            Education
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-500"
          >
            Skills
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-500"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="certifications"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-500"
          >
            Certifications
          </TabsTrigger>
        </TabsList>
        <div className="p-6">
          <TabsContent value="personal-info" className="mt-0">
            <PersonalInfoForm
              data={resumeData.sections.personalInfo}
              onUpdate={(data) => handleUpdateSection("personalInfo", data)}
            />
          </TabsContent>
          <TabsContent value="experience" className="mt-0">
            <ExperienceForm
              data={resumeData.sections.experience}
              onUpdate={(data) => handleUpdateSection("experience", data)}
            />
          </TabsContent>
          <TabsContent value="education" className="mt-0">
            <EducationForm
              data={resumeData.sections.education}
              onUpdate={(data) => handleUpdateSection("education", data)}
            />
          </TabsContent>
          <TabsContent value="skills" className="mt-0">
            <SkillsForm data={resumeData.sections.skills} onUpdate={(data) => handleUpdateSection("skills", data)} />
          </TabsContent>
          <TabsContent value="projects" className="mt-0">
            <ProjectsForm
              data={resumeData.sections.projects}
              onUpdate={(data) => handleUpdateSection("projects", data)}
            />
          </TabsContent>
          <TabsContent value="certifications" className="mt-0">
            <CertificationsForm
              data={resumeData.sections.certifications}
              onUpdate={(data) => handleUpdateSection("certifications", data)}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
