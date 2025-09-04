"use client"

import { useState } from "react"
import { apiService } from "../services/api"
import toast from "react-hot-toast"
import {
  SparklesIcon,
  DocumentArrowDownIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline"
import ComponentPreview from "../components/ComponentPreview"

const Dashboard = () => {
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    setIsLoading(true)
    try {
      const response = await apiService.generateComponent(prompt)
      setGeneratedCode(response.data.jsx)
      toast.success("Component generated successfully!")
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to generate component")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    toast.success("Code copied to clipboard!")
  }

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "generated-component.jsx"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Component downloaded!")
  }

  const examplePrompts = [
    "Create a responsive navbar with logo on left and navigation links on right",
    "Build a modern card component with image, title, description and button",
    "Design a contact form with name, email, message fields and submit button",
    "Create a pricing table with 3 tiers and feature comparison",
    "Build a hero section with background image, title, subtitle and CTA button",
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">✨ AI Component Generator</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Describe your component and let AI generate beautiful, responsive React code for you
        </p>
      </div>

      {/* Generator Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Describe your component
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors resize-none"
              placeholder="e.g., Create a responsive navbar with logo on left and navigation links on right..."
            />
          </div>

          {/* ✅ Updated button with same red gradient as Login/Signup */}
          <button
  type="submit"
  disabled={isLoading}
  style={{
    background: "linear-gradient(to right, #2563eb, #9333ea)", // 🔹 Same gradient as login/signup
    color: "white",
    padding: "12px 24px",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.6 : 1,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(147, 51, 234, 0.5)"
    e.currentTarget.style.transform = "scale(1.03)"
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 99, 235, 0.4)"
    e.currentTarget.style.transform = "scale(1)"
  }}
>
  {isLoading ? (
    <>
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      <span>Generating...</span>
    </>
  ) : (
    <>
      <SparklesIcon className="h-5 w-5" />
      <span>Generate</span>
    </>
  )}
</button>

        </form>

        {/* Example Prompts */}
        <div className="mt-10">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">💡 Try these examples:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="text-left p-4 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Component Display */}
      {generatedCode && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">⚡ Generated Component</h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-slate-200 dark:bg-slate-600 rounded-lg p-1">
                <button
                  onClick={() => setShowPreview(true)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    showPreview
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    !showPreview
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <CodeBracketIcon className="h-4 w-4" />
                  <span>Code</span>
                </button>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1 px-3 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors shadow-sm"
              >
                <ClipboardDocumentIcon className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-black rounded-lg hover:bg-red-700 transition-colors shadow-md"
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {showPreview ? (
              <ComponentPreview code={generatedCode} />
            ) : (
              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-5 rounded-xl overflow-x-auto text-sm">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
