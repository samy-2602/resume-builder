"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "A clean and traditional template perfect for corporate roles",
    image: "/templates/professional.svg",
  },
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary design with a fresh and innovative layout",
    image: "/templates/modern.svg",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A simple and elegant template that lets your content shine",
    image: "/templates/minimal.svg",
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold and unique design for creative professionals",
    image: "/templates/creative.svg",
  },
  {
    id: "executive",
    name: "Executive",
    description: "A sophisticated template for senior-level positions",
    image: "/templates/executive.svg",
  },
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 py-8 md:py-12">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              Resume Templates
            </h1>
            <p className="text-muted-foreground mt-2">
              Choose from our collection of professionally designed templates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedTemplate === template.id
                    ? "border-cyan-600 dark:border-cyan-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[210/297] rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                    <img
                      src={template.image}
                      alt={`${template.name} template preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/signup?template=${template.id}`} className="w-full">
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 group"
                    >
                      Use Template
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 