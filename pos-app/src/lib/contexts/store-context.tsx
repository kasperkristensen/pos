import { Region, StorePostCartsCartReq } from '@medusajs/medusa'
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateCart,
  useUpdateLineItem,
} from 'medusa-react'
import { Cart } from 'medusa-react/dist/types'
import React, { useEffect, useState } from 'react'
import { retrieveCart } from '../api/cart/retrieve'

interface VariantInfoProps {
  variantId: string
  quantity: number
}

interface LineInfoProps {
  lineId: string
  quantity: number
}

interface StoreContext {
  countryCode: string | undefined
  addItem: (item: VariantInfoProps) => void
  updateItem: (item: LineInfoProps) => void
  deleteItem: (lineId: string) => void
  updateCart: (update: StorePostCartsCartReq) => Promise<void>
  resetCart: () => void
  cart?: Cart
  addLineItemState: AddLineItemState | null
  clearAddLineItemState: () => void
}

const StoreContext = React.createContext<StoreContext | null>(null)

export const useStore = (): StoreContext => {
  const context = React.useContext(StoreContext)
  if (context === null) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

interface StoreProps {
  children: React.ReactNode
}

type StoreProviderState = {
  regionId?: string
  countryCode?: string
  cart_id?: string
  cart?: Cart
}

type reducerAction = {
  type: string
  payload: any
}

const reducer = (
  state: StoreProviderState,
  action: reducerAction
): StoreProviderState => {
  switch (action.type) {
    case 'set_region':
      return {
        ...state,
        regionId: action.payload.regionId,
        countryCode: action.payload.countryCode,
      }
    case 'set_cart_id':
      return {
        ...state,
        cart_id: action.payload,
      }
    case 'set_cart':
      return {
        ...state,
        cart: action.payload,
        cart_id: action.payload.id,
      }
    default:
      return state
  }
}

type AddLineItemState = {
  status: 'loading' | 'success' | 'error'
  itemCount: number
}

export const StoreProvider = ({ children }: StoreProps) => {
  const { cart, setCart, createCart } = useCart()
  const [state, dispatch] = React.useReducer(reducer, {})
  const updateCart = useUpdateCart(state.cart_id || '')
  const [addLineItemState, setAddLineItemState] =
    useState<AddLineItemState | null>(null)

  const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
  const { mutate: addLineItem } = useCreateLineItem(state.cart?.id!)
  const removeLineItem = useDeleteLineItem(state.cart?.id!)
  const adjustLineItem = useUpdateLineItem(state.cart?.id!)

  const storeRegion = (regionId: string, countryCode: string | undefined) => {
    dispatch({ type: 'set_region', payload: { regionId, countryCode } })

    setCountryCode(countryCode)
  }

  useEffect(() => {
    const { countryCode } = state
    if (countryCode) {
      setCountryCode(countryCode)
    }
  }, [])

  const getRegion = () => {
    const { countryCode, regionId } = state
    return { countryCode, regionId }
  }

  const setRegion = async (
    regionId: string,
    countryCode: string | undefined
  ) => {
    await updateCart.mutateAsync(
      {
        region_id: regionId,
      },
      {
        onSuccess: ({ cart }) => {
          dispatch({ type: 'set_cart', payload: cart })
          setCart(cart)
          storeCart(cart.id)
          storeRegion(regionId, countryCode)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error(error)
          }
        },
      }
    )
  }

  const ensureRegion = (region: Region) => {
    // if (!IS_SERVER) {
    const { regionId, countryCode } = getRegion() || {
      regionId: region.id,
      countryCode: region.countries[0].iso_2,
    }

    if (regionId !== region.id) {
      setRegion(region.id, countryCode)
    }

    storeRegion(region.id, countryCode)
    setCountryCode(countryCode)
    // }
  }

  const storeCart = (id: string) => {
    dispatch({ type: 'set_cart_id', payload: id })
  }

  const getCart = () => {
    return state.cart_id
  }

  const deleteCart = () => {
    dispatch({ type: 'set_cart_id', payload: undefined })
  }

  const createNewCart = async (regionId?: string) => {
    await createCart.mutateAsync(
      { region_id: regionId },
      {
        onSuccess: ({ cart }) => {
          dispatch({ type: 'set_cart', payload: cart })
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error(error)
          }
        },
      }
    )
  }

  const updateCartFields = async (updateCartProps: StorePostCartsCartReq) => {
    await updateCart.mutateAsync(updateCartProps, {
      onSuccess: ({ cart }) => {
        dispatch({ type: 'set_cart', payload: cart })
        setCart(cart)
        storeCart(cart.id)
        ensureRegion(cart.region)
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
      },
    })
  }

  const resetCart = () => {
    deleteCart()

    const savedRegion = getRegion()

    createCart.mutate(
      {
        region_id: savedRegion?.regionId,
      },
      {
        onSuccess: ({ cart }) => {
          dispatch({ type: 'set_cart', payload: cart })
          storeCart(cart.id)
          ensureRegion(cart.region)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error(error)
          }
        },
      }
    )
  }

  useEffect(() => {
    const ensureCart = async () => {
      const cartId = getCart()
      const region = getRegion()

      if (cartId) {
        const cartRes = await retrieveCart(cartId)
          .then((cart) => {
            return cart
          })
          .catch(async (_) => {
            return null
          })

        if (!cartRes || cartRes.completed_at) {
          deleteCart()
          await createNewCart(region?.regionId)
          return
        }

        dispatch({ type: 'set_cart', payload: cartRes })
        // setCart(cartRes)
        ensureRegion(cartRes.region)
      } else {
        await createNewCart(region?.regionId)
      }
    }

    if (!cart?.id) {
      ensureCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addItem = ({
    variantId,
    quantity,
  }: {
    variantId: string
    quantity: number
  }) => {
    setAddLineItemState({ status: 'loading', itemCount: quantity })

    addLineItem(
      {
        variant_id: variantId,
        quantity: quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setAddLineItemState((prev) => ({
            ...prev!,
            status: 'success',
          }))
          dispatch({ type: 'set_cart', payload: cart })
          storeCart(cart.id)
        },
        onError: (error) => {
          setAddLineItemState((prev) => ({
            ...prev!,
            status: 'error',
          }))
        },
      }
    )
  }

  const clearAddLineItemState = () => {
    setAddLineItemState(null)
  }

  const deleteItem = (lineId: string) => {
    removeLineItem.mutate(
      {
        lineId,
      },
      {
        onSuccess: ({ cart }) => {
          dispatch({ type: 'set_cart', payload: cart })
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          alert(error)
        },
      }
    )
  }

  const updateItem = ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    adjustLineItem.mutate(
      {
        lineId,
        quantity,
      },
      {
        onSuccess: ({ cart }) => {
          dispatch({ type: 'set_cart', payload: cart })
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          alert(error)
        },
      }
    )
  }

  return (
    <StoreContext.Provider
      value={{
        countryCode,
        addItem,
        deleteItem,
        updateItem,
        resetCart,
        updateCart: updateCartFields,
        cart: state.cart,
        addLineItemState,
        clearAddLineItemState,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
