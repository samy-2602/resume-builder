"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Template, templates } from "@/lib/templates"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelect: (template: string) => void
}

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-3">
        {templates.map((template: Template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`relative cursor-pointer overflow-hidden border-2 transition-all duration-200 ${
                selectedTemplate === template.id
                  ? "border-cyan-600 dark:border-cyan-500"
                  : "hover:border-cyan-200 dark:hover:border-cyan-800"
              }`}
              onClick={() => onSelect(template.id)}
            >
              <div className="h-100 aspect-[4/3] relative bg-gray-50 dark:bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="object-contain p-4"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-medium text-white mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{template.description}</p>
                </div>
              </div>
              {selectedTemplate === template.id && (
                <motion.div
                  className="absolute inset-0 bg-cyan-600/10 dark:bg-cyan-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
