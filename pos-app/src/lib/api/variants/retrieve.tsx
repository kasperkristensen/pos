import { useQuery } from '@tanstack/react-query'
import apiClient from '../../../constants/api-client'

export const request = async (barcode: string) => {
  return await apiClient
    .get(`/variants/${barcode}`)
    .then(({ data: { variant } }) => {
      return variant
    })
    .catch((error) => {
      alert(JSON.stringify(error, null, 2))
      return undefined
    })
}

const useVariant = (barcode?: string) => {
  return useQuery(['variant', barcode], () => request(barcode!), {
    enabled: !!barcode,
  })
}

export default useVariant
