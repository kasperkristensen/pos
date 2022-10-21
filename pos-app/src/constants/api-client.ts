import axios from 'axios'

const BACKEND_URL =
  process.env.BACEND_URL || 'http://03a2-83-151-141-70.ngrok.io'

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/pos`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
