import { Reader } from '@stripe/stripe-terminal-react-native'

export const formatReader = (device: Reader.DeviceType) => {
  // 'chipper1X' | 'chipper2X' | 'stripeM2' | 'verifoneP400' | 'wiseCube' | 'wisePad3' | 'wisePosE' | 'cotsDevice';
  switch (device) {
    case 'chipper1X':
      return 'Chipper 1X'
    case 'chipper2X':
      return 'Chipper 2X'
    case 'stripeM2':
      return 'Stripe M2'
    case 'verifoneP400':
      return 'Verifone P400'
    case 'wiseCube':
      return 'BBPOS WiseCube'
    case 'wisePad3':
      return 'BBPOS WisePad 3'
    case 'wisePosE':
      return 'BBPOS WisePos E'
    case 'cotsDevice':
      return 'COTS Device'
  }
}
