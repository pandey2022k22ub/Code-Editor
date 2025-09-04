"use client"

import { useState, useEffect } from "react"
import { apiService } from "../services/api"
import toast from "react-hot-toast"
import { ClockIcon, EyeIcon, TrashIcon, PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline"

const Sessions = () => {
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSession, setSelectedSession] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSessionName, setNewSessionName] = useState("")

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await apiService.getAllSessions()
      setSessions(response.data)
    } catch (error) {
      toast.error("Failed to fetch sessions")
    } finally {
      setIsLoading(false)
    }
  }

  const createSession = async () => {
    if (!newSessionName.trim()) {
      toast.error("Please enter a session name")
      return
    }

    try {
      const response = await apiService.createSession(newSessionName)
      setSessions([response.data, ...sessions])
      setNewSessionName("")
      setShowCreateModal(false)
      toast.success("Session created successfully!")
    } catch (error) {
      toast.error("Failed to create session")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Session History</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">View and manage your component generation sessions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Session</span>
        </button>
      </div>

      {/* Sessions Grid */}
      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <DocumentTextIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No sessions yet</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Create your first session to start generating components
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Create Session
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">{session.sessionName}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedSession(session)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span>Created {formatDate(session.createdAt)}</span>
                </div>

                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Messages:</span> {session.chatHistory.length}
                </div>

                {session.code.jsx && (
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">Generated Code Preview:</div>
                    <pre className="text-xs text-slate-800 dark:text-slate-200 overflow-hidden">
                      <code>{session.code.jsx.substring(0, 100)}...</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Create New Session</h3>
            <input
              type="text"
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              placeholder="Enter session name"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors mb-4"
            />
            <div className="flex items-center space-x-3">
              <button
                onClick={createSession}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setNewSessionName("")
                }}
                className="flex-1 py-2 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedSession.sessionName}</h3>
              <button
                onClick={() => setSelectedSession(null)}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {selectedSession.code.jsx ? (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-slate-900 dark:text-white">Generated Code:</h4>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{selectedSession.code.jsx}</code>
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No code generated in this session yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sessions
