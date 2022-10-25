import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "react-query"
import axios from 'axios'

const BACKEND_URL =
  process.env.BACKEND_URL || 'https://f371-109-178-130-188.ngrok.io'

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/pos`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
export const apiClientMedusa = axios.create({
  baseURL: `${BACKEND_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

const medusaQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      retry: 3,
    },
  },
})

const medusaClient = new Medusa({ baseUrl: BACKEND_URL, maxRetries: 3 })

export { BACKEND_URL, medusaQueryClient, medusaClient }

export default apiClient
