"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SkillsFormProps {
  data: string[]
  onUpdate: (data: string[]) => void
}

export function SkillsForm({ data, onUpdate }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(data)
  const [newSkill, setNewSkill] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      onUpdate(updatedSkills)
      setNewSkill("")
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index)
    setSkills(updatedSkills)
    onUpdate(updatedSkills)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Add relevant skills that showcase your expertise. Include technical skills, soft skills, and tools you're
        proficient with.
      </p>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            ref={inputRef}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill (e.g., JavaScript, Project Management)"
            className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
          />
        </div>
        <Button
          onClick={handleAddSkill}
          disabled={!newSkill.trim()}
          className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 shadow-sm hover:shadow-md group"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add
        </Button>
      </div>

      <div className="mt-4">
        <Label className="mb-2 block">Your Skills</Label>
        {skills.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 border border-dashed rounded-md">
            No skills added yet. Add your first skill above.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center gap-1 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-3 py-1.5 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-1 rounded-full p-0.5 hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {skill}</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}
