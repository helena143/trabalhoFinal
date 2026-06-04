import axios from "axios"

const API = "http://localhost:3000/api/auth"

interface AuthData {
  email: string
  password: string
  name?: string
}

export const login = (data: AuthData) => {
  return axios.post(`${API}/login`, data)
}

export const register = (data: AuthData) => {
  return axios.post(`${API}/register`, data)
}