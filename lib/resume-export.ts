import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

// Function to capture the resume DOM and convert it to PDF
export const exportResumeToPDF = async (resumeId: string, title: string): Promise<string> => {
  try {
    // Find the resume container element
    const element = document.getElementById(`resume-preview-${resumeId}`)

    if (!element) {
      throw new Error("Resume element not found")
    }

    // Use html2canvas to capture the resume as an image
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL("image/png")

    // Initialize jsPDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // Calculate the ratio to fit the resume in the PDF
    const widthRatio = pdfWidth / canvas.width
    const heightRatio = pdfHeight / canvas.height
    const ratio = Math.min(widthRatio, heightRatio)

    const canvasWidth = canvas.width * ratio
    const canvasHeight = canvas.height * ratio

    // Center the image on the page
    const x = (pdfWidth - canvasWidth) / 2
    const y = 20 // Add a small margin at the top

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", x, y, canvasWidth, canvasHeight)

    // Save the PDF with the resume title
    const filename = `${title.replace(/\s+/g, "_")}_resume.pdf`
    pdf.save(filename)

    return filename
  } catch (error) {
    console.error("Error exporting resume to PDF:", error)
    throw error
  }
}
