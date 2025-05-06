"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface Certification {
  name: string
  issuer: string
  date: string
  url: string
}

interface CertificationsFormProps {
  data: Certification[]
  onUpdate: (data: Certification[]) => void
}

export function CertificationsForm({ data, onUpdate }: CertificationsFormProps) {
  const [certifications, setCertifications] = useState<Certification[]>(data)

  const handleAddCertification = () => {
    const newCertification: Certification = {
      name: "",
      issuer: "",
      date: "",
      url: "",
    }

    const updatedCertifications = [...certifications, newCertification]
    setCertifications(updatedCertifications)
    onUpdate(updatedCertifications)
  }

  const handleRemoveCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index)
    setCertifications(updatedCertifications)
    onUpdate(updatedCertifications)
  }

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = [...certifications]
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    }

    setCertifications(updatedCertifications)
    onUpdate(updatedCertifications)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <Button
          onClick={handleAddCertification}
          className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 shadow-sm hover:shadow-md group"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Certification
        </Button>
      </div>

      <AnimatePresence>
        {certifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            No certifications added yet. Click "Add Certification" to get started.
          </motion.div>
        ) : (
          certifications.map((certification, index) => (
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
                    <div className="text-lg font-medium">Certification {index + 1}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCertification(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 -mt-2 -mr-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`certName-${index}`}>Certification Name</Label>
                      <Input
                        id={`certName-${index}`}
                        value={certification.name}
                        onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                        placeholder="AWS Certified Solutions Architect"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`certIssuer-${index}`}>Issuing Organization</Label>
                      <Input
                        id={`certIssuer-${index}`}
                        value={certification.issuer}
                        onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
                        placeholder="Amazon Web Services"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`certDate-${index}`}>Date Earned</Label>
                      <Input
                        id={`certDate-${index}`}
                        value={certification.date}
                        onChange={(e) => handleCertificationChange(index, "date", e.target.value)}
                        placeholder="MM/YYYY"
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`certUrl-${index}`}>Credential URL (Optional)</Label>
                      <Input
                        id={`certUrl-${index}`}
                        value={certification.url}
                        onChange={(e) => handleCertificationChange(index, "url", e.target.value)}
                        placeholder="https://www.credential.net/..."
                        className="transition-all duration-300 focus:border-cyan-600 focus:ring-cyan-600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {certifications.length > 0 && (
        <Button
          onClick={handleAddCertification}
          variant="outline"
          className="w-full border-dashed border-cyan-200 dark:border-cyan-800 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Certification
        </Button>
      )}
    </motion.div>
  )
}
