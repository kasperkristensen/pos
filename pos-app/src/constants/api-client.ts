import axios from 'axios'

export const BACKEND_URL =
  process.env.BACKEND_URL || 'http://ddab-83-151-141-70.ngrok.io'

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/pos`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
