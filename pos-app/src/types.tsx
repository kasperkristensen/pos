/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Order, ProductVariant } from '@medusajs/medusa'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ComponentPropsWithoutRef } from 'react'
import { View } from 'react-native'
import { Theme } from './constants/theme'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<MainStackParamList> | undefined
  Modal: undefined
  NotFound: undefined
  Scanner: undefined
}

export type MainStackParamList = {
  Bottom: NavigatorScreenParams<BottomTabParamList> | undefined
  Product: { barcode: string; variant: ProductVariant }
  ReaderSettings: undefined
  OrderConfirmed: { order: Order }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type BottomTabParamList = {
  Home: undefined
  User: undefined
  Search: undefined
  BarcodeScanner: undefined
  Cart: undefined
}

export type BottomScreenProps<Screen extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type ActionScreenProps<
  Screen extends keyof Omit<MainStackParamList, 'Bottom'>
> = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type AuthenticationStackParamList = {
  InitialAuth: undefined
  EmailAuth: undefined
  PinAuth: undefined
}

export type AuthenticationStackScreenProps<
  Screen extends keyof AuthenticationStackParamList
> = NativeStackScreenProps<AuthenticationStackParamList, Screen>

export type IconProps = {
  size?: number
  color?: keyof Theme['colors']
} & ComponentPropsWithoutRef<typeof View>
