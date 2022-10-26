import { ProductVariant } from '@medusajs/medusa'
import { useQuery } from 'react-query'
import apiClient from '../../../constants/api-client'
import { Response, ResponsePromise, UseQueryOptionsWrapper } from '../types'

type ProductVariantResponse = {
  variant: ProductVariant
}

export const retrieveVariant = async (
  barcode: string
): ResponsePromise<ProductVariantResponse> => {
  console.log(barcode)
  const { data, ...rest } = await apiClient
    .get(`/variants/${barcode}`)
    .then((res) => res.data)

  return { ...data, ...rest }
}

const useVariant = (
  barcode?: string,
  options?: UseQueryOptionsWrapper<
    Response<ProductVariantResponse>,
    Error,
    ['variant', string | undefined]
  >
) => {
  const { data, ...rest } = useQuery(
    ['variant', barcode],
    () => retrieveVariant(barcode!),
    options
  )

  return { ...data, ...rest }
}

export default useVariant
