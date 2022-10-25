import {
  LineItem,
  ShippingOption,
  PaymentSession,
  Cart,
} from '@medusajs/medusa'
import {
  useAddShippingMethodToCart,
  useCompleteCart,
  useCreatePaymentSession,
  useSetPaymentSession,
} from 'medusa-react'
import { useEffect, useState } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { retrieveOptions } from '../../lib/api/cart/get-shipping-options'
import { useStore } from '../../lib/contexts/store-context'

const CartScreen = () => {
  const { cart, updateCart } = useStore()
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [paymentSessions, setPaymentSessions] = useState<PaymentSession[]>([])

  if (!cart) {
    return null
  }

  const { mutate: createPaymentSessions } = useCreatePaymentSession(cart.id)
  const { mutate: complete } = useCompleteCart(cart.id)

  useEffect(() => {
    retrieveOptions(cart.id)
      .then((res) => setShippingOptions(res)) //setShippingOptions(res))
      .catch((err) => console.log('an error happened', err))
  }, [cart])

  console.log(shippingOptions)
  // const { shipping_options, isLoading } = useShippingOptions(cart.id)

  const initializePaymentSessions = () => {
    createPaymentSessions(undefined, {
      onSuccess: ({ cart }) => {
        setPaymentSessions(cart.payment_sessions)
      },
    })
  }

  const handlePayment = () => {
    // CREATE PAYMENT INTENT
    console.log('done')
  }

  const handlePaymentComplete = () => {
    updateCart({ email: 'test@test.test' }).then(() => {
      complete(undefined)
    })
  }

  return (
    <View>
      <View>
        <Text>Cart</Text>
        {cart?.items.map((i) => (
          <CartItem item={i} key={i.id} />
        ))}
      </View>

      <View>
        <Text>Shipping Method</Text>
        {shippingOptions?.map((so) => (
          <ShippingMethodItem
            so={so}
            cart={cart.id}
            key={so.id}
            onSelect={initializePaymentSessions}
          />
        ))}
      </View>

      <View>
        <Text>Payment</Text>
        {paymentSessions?.map((so) => (
          <PaymentElement
            cartId={cart.id}
            key={so.id}
            paymentSession={so}
            onComplete={handlePaymentComplete}
          />
        ))}
      </View>
    </View>
  )
}

const ShippingMethodItem = ({
  so,
  cart,
  onSelect,
}: {
  cart: string
  so: ShippingOption
  onSelect: () => void
}) => {
  const { mutate: addShipping } = useAddShippingMethodToCart(cart)
  const handlePress = () => {
    addShipping(
      { option_id: so.id },
      {
        onError: (error) => alert(error),
        onSuccess: onSelect,
      }
    )
  }

  return (
    <TouchableHighlight onPress={handlePress} style={{ padding: 15 }}>
      <Text>{so.name}</Text>
    </TouchableHighlight>
  )
}

const PaymentElement = ({
  paymentSession,
  cartId,
  onComplete,
}: {
  paymentSession: PaymentSession
  cartId: string
  onComplete: () => void
}) => {
  if (!cartId) {
    return null
  }

  const { mutate: setPaymentSession } = useSetPaymentSession(cartId)

  const handlePress = () => {
    console.log('payment session', paymentSession)

    console.log(
      `setting payment session with provider id: ${paymentSession.id}`
    )
    setPaymentSession(
      { provider_id: paymentSession.provider_id },
      {
        onSuccess: () => {
          onComplete()
        },
      }
    )
  }

  switch (paymentSession.provider_id) {
    case 'manual':
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === 'development' ? (
        <PaymentTest onPress={handlePress} />
      ) : null
    default:
      return null
  }
}

const PaymentTest = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Text>Manual Payment</Text>
    </TouchableHighlight>
  )
}

type CartItemProps = {
  item: LineItem
}
const CartItem = ({ item }: CartItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: '#f7f7f7',
        borderWidth: 1,
        backgroundColor: '#fff',
      }}
    >
      {item.thumbnail ? (
        <Image
          style={{
            width: 30,
            height: 40,
            borderRadius: 5,
            marginHorizontal: 10,
          }}
          source={{ uri: item.thumbnail }}
        />
      ) : (
        <View
          style={{
            width: 30,
            height: 40,
            backgroundColor: 'grey',
            borderRadius: 5,
            marginHorizontal: 10,
          }}
        />
      )}
      <View
        style={{ flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <Text>{item.variant.title}</Text>
        <Text>{item.variant.ean}</Text>
      </View>
    </View>
  )
}

export default CartScreen
