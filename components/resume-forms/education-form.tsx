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

interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface EducationFormProps {
  data: Education[]
  onUpdate: (data: Education[]) => void
}

export function EducationForm({ data, onUpdate }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(data)

  const handleAddEducation = () => {
    const newEducation: Education = {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }

    const updatedEducations = [...educations, newEducation]
    setEducations(updatedEducations)
    onUpdate(updatedEducations)
  }

  const handleRemoveEducation = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    onUpdate(updatedEducations)
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string | boolean) => {
    const updatedEducations = [...educations]
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value,
    }

    setEducations(updatedEducations)
    onUpdate(updatedEducations)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button
          onClick={handleAddEducation}
          className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 shadow-sm hover:shadow-md group"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Education
        </Button>
      </div>

      <AnimatePresence>
        {educations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            No education added yet. Click "Add Education" to get started.
          </motion.div>
        ) : (
          educations.map((education, index) => (
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
                    <div className="text-lg font-medium">Education {index + 1}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveEducation(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 -mt-2 -mr-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`}>Institution</Label>
                      <Input
                        id={`institution-${index}`}
                        value={education.institution}
                        onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                        placeholder="University of Example"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        value={education.degree}
                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                        placeholder="Bachelor of Science"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`field-${index}`}>Field of Study</Label>
                      <Input
                        id={`field-${index}`}
                        value={education.field}
                        onChange={(e) => handleEducationChange(index, "field", e.target.value)}
                        placeholder="Computer Science"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`eduStartDate-${index}`}>Start Date</Label>
                      <Input
                        id={`eduStartDate-${index}`}
                        value={education.startDate}
                        onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                        placeholder="MM/YYYY"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`eduEndDate-${index}`}>End Date</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`eduCurrent-${index}`}
                            checked={education.current}
                            onCheckedChange={(checked) => handleEducationChange(index, "current", checked)}
                          />
                          <Label htmlFor={`eduCurrent-${index}`} className="text-sm">
                            Current
                          </Label>
                        </div>
                      </div>
                      <Input
                        id={`eduEndDate-${index}`}
                        value={education.endDate}
                        onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={education.current}
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`eduDescription-${index}`}>Description (Optional)</Label>
                    <Textarea
                      id={`eduDescription-${index}`}
                      value={education.description}
                      onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                      placeholder="Relevant coursework, achievements, activities..."
                      className="min-h-[100px] transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {educations.length > 0 && (
        <Button
          onClick={handleAddEducation}
          variant="outline"
          className="w-full border-dashed border-cyan-200 dark:border-cyan-800 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Education
        </Button>
      )}
    </motion.div>
  )
}
