import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Free Resume Builder | Create Professional ATS-Friendly Resumes",
  description: "Create professional, ATS-optimized resumes for free. Modern templates, easy-to-use builder, and instant PDF download. Stand out with our free resume builder.",
  keywords: "free resume builder, resume maker, ATS resume, professional resume, CV builder, job application, career tools",
  openGraph: {
    title: "Free Resume Builder | Create Professional ATS-Friendly Resumes",
    description: "Create professional, ATS-optimized resumes for free. Modern templates, easy-to-use builder, and instant PDF download. Stand out with our free resume builder.",
    type: "website",
    locale: "en_US",
    url: "https://samscripts.com",
    siteName: "SamScripts Resume Builder",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "SamScripts Free Resume Builder"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder | Create Professional ATS-Friendly Resumes",
    description: "Create professional, ATS-optimized resumes for free. Modern templates, easy-to-use builder, and instant PDF download.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: 'SamScripts Resume Builder'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
