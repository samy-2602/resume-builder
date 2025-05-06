"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface Project {
  name: string
  description: string
  url: string
  startDate: string
  endDate: string
}

interface ProjectsFormProps {
  data: Project[]
  onUpdate: (data: Project[]) => void
}

export function ProjectsForm({ data, onUpdate }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(data)

  const handleAddProject = () => {
    const newProject: Project = {
      name: "",
      description: "",
      url: "",
      startDate: "",
      endDate: "",
    }

    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    onUpdate(updatedProjects)
  }

  const handleRemoveProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
    onUpdate(updatedProjects)
  }

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    }

    setProjects(updatedProjects)
    onUpdate(updatedProjects)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button
          onClick={handleAddProject}
          className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 shadow-sm hover:shadow-md group"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Project
        </Button>
      </div>

      <AnimatePresence>
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            No projects added yet. Click "Add Project" to get started.
          </motion.div>
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-cyan-100 dark:border-cyan-900">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-lg font-medium">Project {index + 1}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProject(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 -mt-2 -mr-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`projectName-${index}`}>Project Name</Label>
                      <Input
                        id={`projectName-${index}`}
                        value={project.name}
                        onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                        placeholder="E-commerce Website"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`projectStartDate-${index}`}>Start Date (Optional)</Label>
                        <Input
                          id={`projectStartDate-${index}`}
                          value={project.startDate}
                          onChange={(e) => handleProjectChange(index, "startDate", e.target.value)}
                          placeholder="MM/YYYY"
                          className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`projectEndDate-${index}`}>End Date (Optional)</Label>
                        <Input
                          id={`projectEndDate-${index}`}
                          value={project.endDate}
                          onChange={(e) => handleProjectChange(index, "endDate", e.target.value)}
                          placeholder="MM/YYYY"
                          className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`projectUrl-${index}`}>Project URL (Optional)</Label>
                      <Input
                        id={`projectUrl-${index}`}
                        value={project.url}
                        onChange={(e) => handleProjectChange(index, "url", e.target.value)}
                        placeholder="https://example.com"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`projectDescription-${index}`}>Description</Label>
                      <Textarea
                        id={`projectDescription-${index}`}
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                        placeholder="Describe the project, your role, technologies used, and outcomes..."
                        className="min-h-[120px] transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {projects.length > 0 && (
        <Button
          onClick={handleAddProject}
          variant="outline"
          className="w-full border-dashed border-cyan-200 dark:border-cyan-800 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Project
        </Button>
      )}
    </motion.div>
  )
}
