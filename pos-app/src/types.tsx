/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

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
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
  Scanner: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  User: undefined
  Search: undefined
  BarcodeScanner: undefined
  Cart: undefined
  DiscoverReader: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
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
