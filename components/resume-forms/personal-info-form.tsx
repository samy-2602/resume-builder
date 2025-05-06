"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
}

interface PersonalInfoFormProps {
  data: PersonalInfo
  onUpdate: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ data, onUpdate }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
            className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="website">Website/LinkedIn</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
            className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="A brief summary of your professional background and career goals..."
          className="min-h-[120px] transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Write a concise summary highlighting your skills, experience, and career goals. This is often the first thing
          recruiters read.
        </p>
      </div>
    </motion.div>
  )
}
