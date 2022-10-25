import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'
import { useTheme } from '../lib/contexts/theme-context'
import { Box } from '../modules/common'
import {
  BarcodeIcon,
  CogIcon,
  HelpIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
} from '../modules/icons'
import TabButton from '../modules/navigation/tab-button'
import ProductScreen from '../screens/app/product-screen'
import SearchScreen from '../screens/app/search-screen'
import BarcodeScreen from '../screens/barcode-screen'
import DiscoverReadersScreen from '../screens/discover-readers-screen'
import Home from '../screens/home'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import {
  BottomScreenProps,
  BottomTabParamList,
  MainStackParamList,
  RootStackParamList,
} from '../types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const Main = createNativeStackNavigator<MainStackParamList>()

const MainNavigator = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name="Bottom"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Main.Group>
        <Main.Screen
          name="Product"
          component={ProductScreen}
          options={{
            headerShown: false,
          }}
        />
      </Main.Group>
    </Main.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<BottomTabParamList>()

function BottomTabNavigator() {
  const { theme } = useTheme()

  return (
    <BottomTab.Navigator
      initialRouteName="User"
      screenOptions={{
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          borderTopWidth: 0,
          paddingHorizontal: theme.spacing.xl,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: BottomScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? 'iconPrimary' : 'iconPlaceholder'} />
          ),
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitle: () => null,
          headerLeft: () => (
            <Box radii="none" pl="l" backgroundColor="transparent">
              <Pressable
                onPress={() => navigation.navigate('Scanner')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <HelpIcon color="iconSecondary" />
              </Pressable>
            </Box>
          ),
          headerRight: () => (
            <Box radii="none" pr="l" backgroundColor="transparent">
              <Pressable
                onPress={() => navigation.navigate('Scanner')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <CogIcon color="iconSecondary" />
              </Pressable>
            </Box>
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerShown: false,
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <SearchIcon color={focused ? 'iconPrimary' : 'iconPlaceholder'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="BarcodeScanner"
        component={BarcodeScreen}
        options={{
          title: 'Scanner',
          headerShown: false,
          tabBarButton: (props) => (
            <TabButton
              {...props}
              style={{
                marginLeft: theme.spacing.base,
              }}
            />
          ),
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({ focused }) => (
            <BarcodeIcon color={focused ? 'iconPrimary' : 'iconPlaceholder'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="DiscoverReader"
        component={DiscoverReadersScreen}
        options={{
          title: 'Cart',
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <MenuIcon color={focused ? 'iconPrimary' : 'iconPlaceholder'} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

export default RootNavigator
