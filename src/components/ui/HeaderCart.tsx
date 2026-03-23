import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, StyleSheet, Platform, StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useAuth } from '~utils/tokenHandling';
import { Typography } from '~components';

interface HeaderCartProps {
  title?: string;
  showCart?: boolean;
  showBack?: boolean; 
}

export const HeaderCart = ({
  title = 'Tienda Demo',
  showCart = true,
  showBack = false,
}: HeaderCartProps) => {
  const navigation = useNavigation();
  const { theme, cartCount } = useAuth();

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <FontAwesome name="chevron-left" size={20} color={theme.primary} />
            </TouchableOpacity>
          )}
          
          <Typography
            color="textPrimary"
            font="titleLargeBold"
            numberOfLines={1}
            style={styles.titleText}
          >
            {title}
          </Typography>
        </View>

        {showCart && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Cart')} 
            style={styles.cartButton}
          >
            <FontAwesome name="shopping-cart" size={35} color={theme.primary} />
            
            {cartCount > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.error }]}>
                <Typography 
                  color="textOnPrimary"
                  font="labelSmallBold"
                  style={styles.badgeText}
                >
                  {cartCount > 9 ? '+9' : String(cartCount)}
                </Typography>
              </View>
            )}
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    paddingRight: 15,
    paddingVertical: 5,
  },
  titleText: {
    flexShrink: 1,
  },
  cartButton: {
    padding: 8,
    position: 'relative', 
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  badgeText: {
    fontSize: 10,
    textAlign: 'center',
  },
});