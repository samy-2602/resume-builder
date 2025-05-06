"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { PricingSection } from "@/components/pricing-section"
import { FooterSection } from "@/components/footer-section"
import { motion, AnimatePresence, slideUp, container, item } from "@/lib/framer-motion"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                Sam-Scripts
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Free Forever
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hover:text-cyan-600 transition-all duration-300 hover:bg-cyan-50 dark:hover:bg-cyan-950"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white transition-all duration-300 shadow-md hover:shadow-lg">
                Create Free Resume Now
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                Free Resume Builder for Your Dream Job
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Create professional, ATS-friendly resumes in minutes. No credit card required. Free forever.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white text-lg px-8 py-6 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Start Building Your Free Resume
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="py-20" itemScope itemType="https://schema.org/ItemList">
          <div className="container mx-auto px-4">
            <meta itemProp="name" content="Free Resume Builder Features" />
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent"
              variants={slideUp}
              initial="initial"
              animate="animate"
            >
              Why Choose Our Free Resume Builder?
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.article 
                className="relative p-6 rounded-xl border border-transparent hover:border-cyan-500 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 cursor-pointer group"
                variants={item}
                whileHover={{ y: -5 }}
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-violet-50 dark:from-cyan-950 dark:to-violet-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative z-10">
                  <div className="mb-4 text-cyan-600 dark:text-cyan-400">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4" itemProp="name">ATS-Optimized Templates</h3>
                  <p className="text-gray-600 dark:text-gray-300" itemProp="description">
                    Our free resume templates are designed to pass Applicant Tracking Systems and land you more interviews. 
                    Built with modern ATS algorithms in mind.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      Guaranteed ATS readability
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      Keyword optimization
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      Industry-specific formats
                    </li>
                  </ul>
                </div>
              </motion.article>

              <motion.article 
                className="relative p-6 rounded-xl border border-transparent hover:border-cyan-500 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 cursor-pointer group"
                variants={item}
                whileHover={{ y: -5 }}
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-violet-50 dark:from-cyan-950 dark:to-violet-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative z-10">
                  <div className="mb-4 text-cyan-600 dark:text-cyan-400">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4" itemProp="name">Easy to Use Interface</h3>
                  <p className="text-gray-600 dark:text-gray-300" itemProp="description">
                    Simple, intuitive interface that helps you create a professional resume in minutes, not hours. 
                    Smart features to speed up your resume creation.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      Drag-and-drop sections
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      Real-time preview
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      Smart text suggestions
                    </li>
                  </ul>
                </div>
              </motion.article>

              <motion.article 
                className="relative p-6 rounded-xl border border-transparent hover:border-cyan-500 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 cursor-pointer group"
                variants={item}
                whileHover={{ y: -5 }}
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-violet-50 dark:from-cyan-950 dark:to-violet-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative z-10">
                  <div className="mb-4 text-cyan-600 dark:text-cyan-400">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4" itemProp="name">100% Free Forever</h3>
                  <p className="text-gray-600 dark:text-gray-300" itemProp="description">
                    No hidden fees, no credit card required. Create unlimited resumes and download as PDF for free. 
                    All features included.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      Unlimited resumes
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      Free PDF downloads
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      All templates included
                    </li>
                  </ul>
                </div>
              </motion.article>
            </motion.div>
          </div>
        </section>

        <FeatureSection />
        <TestimonialSection />
        <PricingSection />
      </main>
      <FooterSection />
    </div>
  )
}
