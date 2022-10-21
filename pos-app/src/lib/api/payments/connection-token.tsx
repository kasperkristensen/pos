import apiClient from '../../../constants/api-client'

export const connectionToken = async () => {
  const response = await apiClient.post('/payments/connection-token')

  const { secret } = await response.data
  return secret
}
