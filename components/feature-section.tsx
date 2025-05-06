"use client"

import { motion } from "framer-motion"
import { FileText, Download, Sparkles, Zap, Shield, Palette } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-cyan-600" />,
      title: "ATS-Optimized Templates",
      description:
        "Our templates are designed to pass through Applicant Tracking Systems with ease, ensuring your resume gets seen by human recruiters.",
    },
    {
      icon: <Download className="h-10 w-10 text-violet-600" />,
      title: "Export to PDF",
      description: "Download your resume as a professional PDF file ready to be submitted to potential employers.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-rose-500" />,
      title: "Modern Designs",
      description: "Choose from a variety of modern, professional templates that will make your resume stand out.",
    },
    {
      icon: <Zap className="h-10 w-10 text-cyan-600" />,
      title: "Real-time Preview",
      description:
        "See changes to your resume in real-time as you edit, ensuring your resume looks exactly how you want it.",
    },
    {
      icon: <Shield className="h-10 w-10 text-violet-600" />,
      title: "Secure Cloud Storage",
      description: "Your resumes are securely stored in the cloud, allowing you to access and edit them from anywhere.",
    },
    {
      icon: <Palette className="h-10 w-10 text-rose-500" />,
      title: "Customizable Sections",
      description:
        "Add, remove, and rearrange sections to create a resume that highlights your unique skills and experience.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features for Your{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              Perfect Resume
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 md:text-xl max-w-3xl mx-auto">
            Everything you need to create a professional, ATS-friendly resume that gets you noticed by employers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-cyan-200 dark:hover:border-cyan-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-600 to-violet-600 transition-all duration-300 group-hover:w-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
