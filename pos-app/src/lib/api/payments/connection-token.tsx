import apiClient from '../../../constants/api-client'

export const connectionToken = async () => {
  const response = await apiClient.get('/payments/connection-token')

  const { secret } = await response.data
  return secret
}
