"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Trash2, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface ExperienceFormProps {
  data: Experience[]
  onUpdate: (data: Experience[]) => void
}

export function ExperienceForm({ data, onUpdate }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(data)

  const handleAddExperience = () => {
    const newExperience: Experience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }

    const updatedExperiences = [...experiences, newExperience]
    setExperiences(updatedExperiences)
    onUpdate(updatedExperiences)
  }

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    onUpdate(updatedExperiences)
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | boolean) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    }

    setExperiences(updatedExperiences)
    onUpdate(updatedExperiences)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button
          onClick={handleAddExperience}
          className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 shadow-sm hover:shadow-md group"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Experience
        </Button>
      </div>

      <AnimatePresence>
        {experiences.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            No work experience added yet. Click "Add Experience" to get started.
          </motion.div>
        ) : (
          experiences.map((experience, index) => (
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
                    <div className="text-lg font-medium">Experience {index + 1}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveExperience(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 -mt-2 -mr-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`position-${index}`}>Job Title</Label>
                      <Input
                        id={`position-${index}`}
                        value={experience.position}
                        onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                        placeholder="Software Engineer"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input
                        id={`company-${index}`}
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                        placeholder="Acme Inc."
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        value={experience.startDate}
                        onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                        placeholder="MM/YYYY"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`endDate-${index}`}>End Date</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`current-${index}`}
                            checked={experience.current}
                            onCheckedChange={(checked) => handleExperienceChange(index, "current", checked)}
                          />
                          <Label htmlFor={`current-${index}`} className="text-sm">
                            Current
                          </Label>
                        </div>
                      </div>
                      <Input
                        id={`endDate-${index}`}
                        value={experience.endDate}
                        onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={experience.current}
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-[120px] transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use bullet points and action verbs. Focus on achievements and quantifiable results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {experiences.length > 0 && (
        <Button
          onClick={handleAddExperience}
          variant="outline"
          className="w-full border-dashed border-cyan-200 dark:border-cyan-800 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Experience
        </Button>
      )}
    </motion.div>
  )
}
