import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              SamScripts
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Create professional, ATS-friendly resumes that help you land your dream job.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#templates"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-500 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SamScripts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
