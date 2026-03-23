import React from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Typography } from '~components/ui/Typography';
import { HeaderCart } from '~components/ui/HeaderCart';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '~utils/tokenHandling';

export const CartScreen = ({ navigation }: any) => {
  const { 
    theme, 
    cart, 
    cartTotal, 
    addToCart, 
    removeFromCart, 
    clearCart 
  } = useAuth();

  const handleCheckout = () => {
    Alert.alert(
      "¡Pedido Realizado!",
      `Tu compra por $${cartTotal.toFixed(2)} ha sido procesada con éxito (Demo).`,
      [{ text: "Excelente", onPress: () => {
        clearCart();
        navigation.navigate('ProductList');
      }}]
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.cartItem, { backgroundColor: theme.surface }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <Typography font="bodyMediumBold" color="textPrimary" numberOfLines={1}>
          {item.title || ''}
        </Typography>
        <Typography font="titleMediumBold" color="primary">
          ${item.price.toFixed(2) || ''}
        </Typography>

        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => removeFromCart(item.id)}
            style={[styles.qtyButton, { borderColor: theme.outline }]}
          >
            <FontAwesome5 name="trash" size={12} color={theme.error} />
          </TouchableOpacity>
          
          <Typography font="titleMediumBold" color="textPrimary" style={styles.qtyText}>
            {item.qty || ''}
          </Typography>

          <TouchableOpacity 
            onPress={() => addToCart(item)} 
            style={[styles.qtyButton, { backgroundColor: theme.primary }]}
          >
            <FontAwesome5 name="plus" size={12} color={theme.textOnPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome5 name="shopping-basket" size={80} color={theme.outline} />
      <Typography font="titleLargeBold" color="textSecondary" style={{ marginTop: 20 }}>
        Tu carrito está vacío
      </Typography>
      <TouchableOpacity 
        style={[styles.goShopButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('ProductList')}
      >
        <Typography color="textOnPrimary" font="titleMediumBold">Ir a la tienda</Typography>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderCart title="Mi Carrito" showCart={false}  showBack={true} />

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />

          <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.outline }]}>
            <View style={styles.totalRow}>
              <Typography font="displaySmallBold" color="textPrimary">
               Total: {`$${cartTotal.toFixed(2)}`}
              </Typography>
            </View>

            <TouchableOpacity 
              style={[styles.checkoutButton, { backgroundColor: theme.primary }]}
              onPress={handleCheckout}
            >
              <Typography color="textOnPrimary" font="titleMediumBold">
                Finalizar Compra
              </Typography>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <EmptyCart />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 20, paddingBottom: 150 },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  itemImage: { width: 70, height: 70, marginRight: 15 },
  itemDetails: { flex: 1, gap: 5 },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyButton: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  qtyText: { marginHorizontal: 15 },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 25,
    borderTopWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkoutButton: {
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  goShopButton: {
    marginTop: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
  }
});