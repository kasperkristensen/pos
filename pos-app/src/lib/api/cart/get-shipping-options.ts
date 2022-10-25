import {ShippingOption} from '@medusajs/medusa'
import { useQuery } from '@tanstack/react-query'
import {apiClientMedusa} from '../../../constants/api-client'

export const retrieveOptions = async (id: string): Promise<ShippingOption[]> => {
  const response = await apiClientMedusa.get(`/store/shipping-options/${id}`)

  const { shipping_options } = await response.data
  return shipping_options
}


const useShippingOptions = (id: string) => {
  return useQuery(['shippingOptions', id], () => retrieveOptions(id!))
}

export default useShippingOptions