"use client"

import { motion } from "framer-motion"

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

interface ResumePreviewProps {
  resumeData: ResumeData
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills, certifications, projects } = resumeData.sections

  // Render different templates based on the selected template
  const renderTemplate = () => {
    switch (resumeData.template) {
      case "professional":
        return renderProfessionalTemplate()
      case "modern":
        return renderModernTemplate()
      case "minimal":
      default:
        return renderMinimalTemplate()
    }
  }

  const renderProfessionalTemplate = () => {
    return (
      <div className="bg-white text-gray-800 p-8 shadow-sm max-w-[800px] mx-auto">
        <header className="border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-cyan-600">{personalInfo.name || "Your Name"}</h1>
          <div className="flex flex-wrap gap-3 mt-2 text-sm">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </header>

        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-cyan-600 mb-2">Professional Summary</h2>
            <p className="whitespace-pre-wrap break-words">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-cyan-600 mb-2">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{exp.position}</h3>
                    <div className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <div className="text-sm">{exp.company}</div>
                  <p className="mt-1 text-sm whitespace-pre-wrap break-words">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-cyan-600 mb-2">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className="text-sm text-gray-600">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                  <div className="text-sm">{edu.institution}</div>
                  {edu.description && <p className="mt-1 text-sm whitespace-pre-wrap break-words">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-cyan-600 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-cyan-600 mb-2">Projects</h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{project.name}</h3>
                    {(project.startDate || project.endDate) && (
                      <div className="text-sm text-gray-600">
                        {project.startDate} - {project.endDate}
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-sm whitespace-pre-wrap break-words">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cyan-600 hover:underline"
                    >
                      Project Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-cyan-600 mb-2">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{cert.name}</h3>
                    {cert.date && <div className="text-sm text-gray-600">{cert.date}</div>}
                  </div>
                  <div className="text-sm">{cert.issuer}</div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cyan-600 hover:underline"
                    >
                      Verify
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="text-sm whitespace-pre-wrap break-words">
          {personalInfo.website && (
            <a 
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:underline break-all"
            >
              {personalInfo.website}
            </a>
          )}
        </div>
      </div>
    )
  }

  const renderModernTemplate = () => {
    return (
      <div className="bg-white text-gray-800 max-w-[800px] mx-auto">
        <header className="bg-gradient-to-r from-cyan-600 to-violet-600 text-white p-8">
          <h1 className="text-3xl font-bold">{personalInfo.name || "Your Name"}</h1>
          <div className="flex flex-wrap gap-3 mt-2 text-sm">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
          {personalInfo.summary && <p className="mt-4 text-white/90">{personalInfo.summary}</p>}
        </header>

        <div className="p-8">
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-cyan-600 border-b border-gray-200 pb-2 mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <div className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    <div className="text-cyan-600">{exp.company}</div>
                    <p className="mt-2 text-sm whitespace-pre-wrap break-words">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-cyan-600 border-b border-gray-200 pb-2 mb-4">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold">
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                      </div>
                    </div>
                    <div className="text-cyan-600">{edu.institution}</div>
                    {edu.description && <p className="mt-2 text-sm whitespace-pre-wrap break-words">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-cyan-600 border-b border-gray-200 pb-2 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-cyan-600 border-b border-gray-200 pb-2 mb-4">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h3 className="font-medium">{cert.name}</h3>
                      <div className="text-sm">
                        {cert.issuer} {cert.date && `• ${cert.date}`}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {projects.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-cyan-600 border-b border-gray-200 pb-2 mb-4">Projects</h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      {(project.startDate || project.endDate) && (
                        <div className="text-sm text-gray-600">
                          {project.startDate} - {project.endDate}
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm whitespace-pre-wrap break-words">{project.description}</p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  const renderMinimalTemplate = () => {
    return (
      <div className="bg-white text-gray-800 p-8 max-w-[800px] mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </header>

        {personalInfo.summary && (
          <section className="mb-8">
            <p className="text-center whitespace-pre-wrap break-words">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-center uppercase">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <div className="text-sm">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <div className="italic">{exp.company}</div>
                  <p className="mt-2 text-sm whitespace-pre-wrap break-words">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-center uppercase">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className="text-sm">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                  <div className="italic">{edu.institution}</div>
                  {edu.description && <p className="mt-2 text-sm whitespace-pre-wrap break-words">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-center uppercase">Skills</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="border border-gray-300 px-3 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-center uppercase">Projects</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{project.name}</h3>
                    {(project.startDate || project.endDate) && (
                      <div className="text-sm">
                        {project.startDate} - {project.endDate}
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm whitespace-pre-wrap break-words">{project.description}</p>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                      Project Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-center uppercase">Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <div className="text-sm">
                    {cert.issuer} {cert.date && `• ${cert.date}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 overflow-auto h-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Resume Preview</h2>
        <div className="text-sm text-gray-500">Template: {resumeData.template}</div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="border rounded-lg overflow-hidden shadow-sm"
      >
        <div id={`resume-preview-${resumeData.id}`}>{renderTemplate()}</div>
      </motion.div>
    </div>
  )
}
