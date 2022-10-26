import {
  LineItem,
  ShippingOption,
  PaymentSession,
  Cart,
} from '@medusajs/medusa'
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import {
  useAddShippingMethodToCart,
  useCompleteCart,
  useCreatePaymentSession,
  useSetPaymentSession,
} from 'medusa-react'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { retrieveOptions } from '../../lib/api/cart/get-shipping-options'
import { updateIntent } from '../../lib/api/cart/update-payment-intent'
import { useNotification } from '../../lib/contexts/notification-context'
import { useStore } from '../../lib/contexts/store-context'

const CartScreen = () => {
  const { cart, updateCart, resetCart } = useStore()
  const { retrievePaymentIntent, collectPaymentMethod, processPayment } =
    useStripeTerminal()

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [paymentSessions, setPaymentSessions] = useState<PaymentSession[]>([])
  const [canPay, setCanPay] = useState<boolean>(false)

  if (!cart) {
    return null
  }

  const { mutate: addShipping } = useAddShippingMethodToCart(cart.id)
  const { mutate: setPaymentSession } = useSetPaymentSession(cart.id)
  const { mutate: createPaymentSessions } = useCreatePaymentSession(cart.id)
  const { mutate: complete } = useCompleteCart(cart.id)

  useEffect(() => {
    const manualShippingOptions = shippingOptions.filter(
      (so) => so.provider_id === 'manual'
    )
    if (manualShippingOptions.length !== 1 || canPay) {
      return
    }

    addShipping(
      { option_id: manualShippingOptions[0].id },
      {
        onError: (error) => alert(error),
        onSuccess: initializePaymentSessions,
      }
    )
  }, [shippingOptions])

  useEffect(() => {
    retrieveOptions(cart.id)
      .then((res) => setShippingOptions(res))
      .catch((err) =>
        showNotification({
          content: err.message,
        })
      )
  }, [cart])

  const address = {
    first_name: 'John',
    last_name: 'Doe',
    address_1: 'Grønningen 15',
    address_2: '3. th',
    city: 'Copenhagen',
    country_code: 'DK',
    postal_code: '1230',
  }

  const initializePaymentSessions = () => {
    updateCart({
      email: 'test@test.test',
      shipping_address: address,
      billing_address: address,
    }).then(() => {
      createPaymentSessions(undefined, {
        onSuccess: ({ cart }) => {
          setPaymentSessions(cart.payment_sessions)

          const stripeSession = cart.payment_sessions.find(
            (ps) => ps.provider_id === 'stripe'
          )

          setPaymentSession(
            { provider_id: 'stripe' },
            {
              onSuccess: () => {
                updateIntent(stripeSession?.data.id as string)
                  .then(() => {
                    setCanPay(true)
                    showNotification({
                      content: 'Ready to go',
                      duration: 3000,
                    })
                  })
                  .catch((err) => console.log(err))
              },
            }
          )
        },
      })
    })
  }

  const { showNotification, hideNotification } = useNotification()

  const handlePayment = async () => {
    const paymentSession = paymentSessions.find(
      (ps) => ps.provider_id === 'stripe'
    )

    if (!paymentSession) {
      showNotification({ content: 'Stripe is not installed', duration: 3000 })
      return
    }

    const { paymentIntent, error } = await retrievePaymentIntent(
      paymentSession.data.client_secret as string
    )

    if (!paymentIntent) {
      console.log(error.message)
      showNotification({ content: error.message, duration: 3000 })
      return
    }

    const paymentIntentId = paymentSession.data.id as string

    const collectRes = await collectPaymentMethod({
      paymentIntentId: paymentIntent.id,
    })

    if (collectRes.error) {
      console.log(collectRes.error.message)
      showNotification({ content: collectRes.error.message, duration: 3000 })
      return
    }

    const processRes = await processPayment(paymentIntentId)

    if (processRes.error) {
      showNotification({ content: processRes.error.message, duration: 3000 })
      return
    }

    complete(undefined)
  }

  return (
    <View>
      <View>
        <Text>Cart</Text>
        {cart?.items.map((i) => (
          <CartItem item={i} key={i.id} />
        ))}
      </View>

      {shippingOptions.length > 1 ? (
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
      ) : null}

      <View style={{ marginVertical: 10 }}>
        {canPay ? (
          <TouchableHighlight
            style={{
              padding: 15,
              width: '100%',
              marginBottom: 10,
              alignItems: 'center',
            }}
            onPress={handlePayment}
          >
            <Text>Pay Order</Text>
          </TouchableHighlight>
        ) : (
          <ActivityIndicator size="large" />
        )}
        <TouchableHighlight
          style={{ padding: 15, alignItems: 'center', width: '100%' }}
          onPress={resetCart}
        >
          <Text>Clear Cart</Text>
        </TouchableHighlight>
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

type CartItemProps = {
  item: LineItem
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: '#f7f7f7',
        borderWidth: 1,
        backgroundColor: '#fff',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
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
      <View style={{ justifyContent: 'center' }}>
        <Text>{`x${item.quantity}`}</Text>
      </View>
    </View>
  )
}

export default CartScreen
