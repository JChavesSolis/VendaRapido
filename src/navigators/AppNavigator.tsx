import React from 'react';
import { Dimensions, Platform, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '~utils/tokenHandling';
import { CartScreen, HomeScreen, LoginScreen, ProductDetailScreen, ProfileScreen } from '~screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ iconName, color, size }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <FontAwesome5 name={iconName} size={size} color={color} />
  </View>
);

const AppNavigator = () => {
  const { isLogged, loading, theme } = useAuth();
  
  const { height: screenHeight } = Dimensions.get('window');
  const tabBarHeight = screenHeight * 0.12 

  if (loading) return null;

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      {isLogged ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.surface, 
              height: tabBarHeight,
              borderTopWidth: 0,
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
            },
            tabBarActiveTintColor: theme.primary,     
            tabBarInactiveTintColor: theme.textSecondary,
            tabBarLabelStyle: { 
              fontSize: 11, 
              marginBottom: 8,
              fontFamily: 'Arial-Regular'
            },
          }}>
          
          <Tab.Screen
            name="MainProducts"
            children={() => (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ProductList" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            )}
            options={{
              title: 'Tienda',
              headerShown: false,
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: (props) => (
                <TabIcon 
                  iconName="store" 
                  {...props} 
                />
              )
            }}
          />

          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Mi Perfil',
              headerShown: false,
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: (props) => (
                <TabIcon 
                  iconName="user-circle" 
                  {...props} 
                />
              )
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;