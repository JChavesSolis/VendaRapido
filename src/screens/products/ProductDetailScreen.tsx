import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { HeaderCart, Typography } from '~components';
import { productService } from '~services/product.service';
import { useAuth } from '~utils/tokenHandling';

export const ProductDetailScreen = ({ route }: any) => {
  const { productId } = route.params;
  const { theme, addToCart } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const loadProduct = async () => {
    const data = await productService.getProduct(productId);
    if (data) setProduct(data);
    setLoading(false);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color={theme.primary} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderCart title="Detalle" />
      <ScrollView>
        <View style={[styles.imageContainer, { backgroundColor: '#FFF' }]}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={[styles.infoContainer, { backgroundColor: theme.surface }]}>
          <Typography color="primary" font="titleMediumBold">
            {product.category.toUpperCase()}
          </Typography>
          <Typography color="textPrimary" font="displaySmallBold" style={{ marginVertical: 10 }}>
            {product.title || ''}
          </Typography>
          <Typography color="textSecondary" font="bodyLargeRegular">
            {product.description || ''}
          </Typography>

          <View style={styles.priceSection}>
            <View>
              <Typography color="textSecondary" font="labelLargeBold">Precio total</Typography>
              <Typography color="textPrimary" font="displaySmallBold">${product.price.toFixed(2) + ''}</Typography>
            </View>
            
            <TouchableOpacity 
              style={[styles.buyButton, { backgroundColor: theme.primary }]}
              onPress={() => addToCart(product)}
            >
              <Typography color="textOnPrimary" font="titleMediumBold">Añadir al carrito</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { width: '100%', height: 350, justifyContent: 'center', alignItems: 'center' },
  image: { width: '80%', height: '80%' },
  infoContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
    minHeight: 400
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20
  },
  buyButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 4
  }
});