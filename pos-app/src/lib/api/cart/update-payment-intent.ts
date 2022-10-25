import {ShippingOption} from '@medusajs/medusa'
import { useQuery } from '@tanstack/react-query'
import {apiClientMedusa} from '../../../constants/api-client'

export const updateIntent = async (id: string): Promise<ShippingOption[]> => {
  const response = await apiClientMedusa.post(`/pos/payments/update-intent/${id}`)

  const { status } = await response.data
  return status
}


const useUpdateIntent = (id: string) => {
  return useQuery(['payment', id], () => updateIntent(id!))
}

export default useUpdateIntent