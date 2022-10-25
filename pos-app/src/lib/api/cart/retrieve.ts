import apiClient from '../../../constants/api-client'

export const retrieveCart = async (id: string) => {
  const response = await apiClient.get(`/carts/${id}`)

  const { cart } = await response.data
  return cart
}
