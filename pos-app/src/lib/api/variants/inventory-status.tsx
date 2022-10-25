import { useQuery } from 'react-query'
import apiClient from '../../../constants/api-client'

export const request = async (barcode: string) => {
  return await apiClient
    .get(`/variants/${barcode}/inventory`)
    .then(({ data: { status } }) => {
      return status
    })
}

const useVariant = (barcode?: string) => {
  return useQuery(['inventory', barcode], () => request(barcode!), {
    enabled: !!barcode,
  })
}

export default useVariant
