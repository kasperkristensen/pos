import {
  LineItem,
  ShippingOption,
  PaymentSession,
  Cart,
} from '@medusajs/medusa'
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import {
  formatVariantPrice,
  useAddShippingMethodToCart,
  useCompleteCart,
  useCreatePaymentSession,
  useSetPaymentSession,
} from 'medusa-react'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  TouchableHighlight,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import { theme } from '../../constants/theme'
import { retrieveOptions } from '../../lib/api/cart/get-shipping-options'
import { updateIntent } from '../../lib/api/cart/update-payment-intent'
import { useNotification } from '../../lib/contexts/notification-context'
import { useStore } from '../../lib/contexts/store-context'
import { Text } from '../../modules/common'
import { TrashIcon } from '../../modules/icons/trash-icon'

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
    <View style={styles.BagScreen}>
      <SafeAreaView style={{ paddingHorizontal: 24 }}>
        <Text variant="xxlarge" style={styles.BagHeader}>
          Bag
        </Text>
        <View
          style={{
            borderBottomColor: theme.colors.subtle,
            borderBottomWidth: 1,
            marginBottom: 24,
            width: 32,
          }}
        />
      </SafeAreaView>

      <ScrollView style={{ paddingHorizontal: 24 }}>
        {cart?.items.map((i) => (
          <CartItem item={i} key={i.id} />
        ))}
        <TotalsComponent cart={cart} />
        <TouchableHighlight onPress={resetCart}>
          <BagItemContainer>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text variant="large" weight="semibold" color="textSecondary">
                Clear Bag
              </Text>
              <TrashIcon size={20} />
            </View>
          </BagItemContainer>
        </TouchableHighlight>
      </ScrollView>

      {/* {shippingOptions.length > 1 ? (
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
      ) : null} */}

      <View
        style={{
          backgroundColor: theme.colors.background,
          paddingHorizontal: 24,
          paddingTop: 16,
        }}
      >
        <TouchableHighlight
          disabled={!canPay}
          style={styles.placeOrderButton}
          onPress={handlePayment}
        >
          <Text variant="large" color="textOnColor">
            Pay Order
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const TotalsComponent = ({ cart }: { cart: Cart }) => {
  const getTotalsLine = (label: string, value: number | undefined | null) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text color="textHelper">{label}</Text>
      <Text>{`${value} kr`}</Text>
    </View>
  )
  return (
    <BagItemContainer>
      <View
        style={{
          flexDirection: 'column',
          paddingBottom: 24,
          borderBottomColor: theme.colors.subtle,
          borderBottomWidth: 1,
        }}
      >
        {getTotalsLine('Subtotal', cart.subtotal)}
        {getTotalsLine('Delivery', cart.shipping_total)}
        {getTotalsLine('VAT', cart.tax_total)}
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginTop: 24,
        }}
      >
        <Text variant="large" color="textHelper">
          Total
        </Text>
        <Text variant="xlarge" weight="semibold">
          {`${cart.total} kr`}
        </Text>
      </View>
    </BagItemContainer>
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

const BagItemContainer = ({ children }) => {
  return <View style={styles.BagItemContainer}>{children}</View>
}

type CartItemProps = {
  item: LineItem
}

const CartItem = ({ item }: CartItemProps) => {
  console.log(item.variant)
  return (
    <BagItemContainer>
      <View style={{ flexDirection: 'column' }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text variant="large">{item.variant.product.title}</Text>
          <View
            style={{
              borderRadius: 8,
              backgroundColor: theme.colors.backgroundInverse,
              paddingHorizontal: 8,
            }}
          >
            <Text color="textOnColor">{`x${item.quantity}`}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <View
            style={{ flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Text color="textHelper">{item.variant.title}</Text>
            <Text color="textHelper">{item.variant.ean}</Text>
          </View>
          <View>
            <Text>{`${
              typeof item.total !== 'undefined' && item.total !== null
                ? item.total / 100
                : '-'
            } kr`}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}></View>
      </View>
    </BagItemContainer>
  )
}

const styles = StyleSheet.create({
  BagScreen: {
    height: '100%',
    flexDirection: 'column',
    // paddingHorizontal: 24,
  },
  BagHeader: {
    marginTop: 24,
    marginBottom: 16,
  },
  BagItemContainer: {
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  placeOrderButton: {
    backgroundColor: theme.colors.backgroundInverse,
    color: theme.colors.textOnColor,
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
  },
  actions: {
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CartScreen
