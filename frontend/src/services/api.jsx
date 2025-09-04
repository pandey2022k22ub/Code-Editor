import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";


class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        
      },
    })
  }

  setAuthToken(token) {
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete this.api.defaults.headers.common["Authorization"]
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.api.post("/auth/login", { email, password })
  }

  async signup(email, password) {
    return this.api.post("/auth/signup", { email, password })
  }

  // Generate endpoint
  async generateComponent(prompt) {
    return this.api.post("/generate", { prompt })
  }

  // Session endpoints
  async createSession(sessionName) {
    return this.api.post("/sessions/create", { sessionName })
  }

  async getAllSessions() {
    return this.api.get("/sessions")
  }

  async getSessionById(id) {
    return this.api.get(`/sessions/${id}`)
  }

  async updateSession(id, data) {
    return this.api.put(`/sessions/${id}`, data)
  }
}

export const apiService = new ApiService()
