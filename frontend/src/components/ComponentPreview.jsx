

import { useState, useEffect } from "react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

const ComponentPreview = ({ code }) => {
  const [error, setError] = useState(null)
  const [previewHtml, setPreviewHtml] = useState("")

  useEffect(() => {
    try {
      // Simple JSX to HTML conversion for preview
      // This is a basic implementation - in production you'd want a more robust solution
      const htmlContent = code
        .replace(/className=/g, "class=")
        .replace(/onClick=/g, "onclick=")
        .replace(/onChange=/g, "onchange=")
        .replace(/onSubmit=/g, "onsubmit=")
        .replace(/{/g, "")
        .replace(/}/g, "")
        .replace(/"/g, '"')
        .replace(/'/g, "'")

      // Add Tailwind CSS
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `

      setPreviewHtml(fullHtml)
      setError(null)
    } catch (err) {
      setError("Failed to render preview")
    }
  }, [code])

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-2">Preview Error</h3>
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 border-b border-slate-200 dark:border-slate-700">
        <span className="text-sm text-slate-600 dark:text-slate-400">Preview</span>
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 min-h-[200px]">
        <iframe
          srcDoc={previewHtml}
          className="w-full h-96 border-0"
          title="Component Preview"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  )
}

export default ComponentPreview
