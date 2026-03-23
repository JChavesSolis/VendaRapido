import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ActivityIndicator,
  ScrollView 
} from 'react-native';

import { useAuth } from '~utils/tokenHandling';
import { productService } from '~services/product.service';
import { HeaderCart, Typography } from '~components';

export const HomeScreen = ({ navigation }: any) => {
  const { theme, addToCart } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [categories, setCategories] = useState(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    const [prods, cats] = await Promise.all([
      productService.getStatusProducts(),
      productService.getCategories()
    ]);
   if (prods) {
      setAllProducts(prods);
      setDisplayProducts(prods.slice(0, itemsPerPage));
    }
    if (cats) setCategories(['Todos', ...cats]);
    setLoading(false);
  };

  const loadMoreProducts = () => {
  const nextPage = page + 1;
  const newLimit = nextPage * itemsPerPage;
  if (displayProducts.length < allProducts.length) {
    const nextItems = allProducts.slice(0, newLimit);
    
    setDisplayProducts(nextItems);
    setPage(nextPage);
  }
};

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    setPage(1);
    const filtered = category === 'Todos' 
      ? await productService.getStatusProducts()
      : await productService.getProductsByCategory(category);
    
    if (filtered) {
      setAllProducts(filtered);
      setDisplayProducts(filtered.slice(0, itemsPerPage));
    }
    setLoading(false);
  };

  const renderProduct = ({ item }: any) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.surface }]}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.cardContent}>
        <Typography font="labelSmallBold" color="primary" numberOfLines={1}>
          {item?.category?.toUpperCase() || ''}
        </Typography>
        <Typography font="bodyMediumBold" color="textPrimary" numberOfLines={2} style={{ height: 40 }}>
          {item?.title || ''} 
        </Typography>
        <View style={styles.priceRow}>
          <Typography font="titleMediumBold" color="textPrimary">
            {`$${item?.price?.toFixed(2) ?? '0.00'}`}
          </Typography>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => addToCart(item)}
          >
            <Typography color="textOnPrimary" font="labelSmallBold">+</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderCart title="Tienda Demo" />
      
      <View style={{ height: 60, marginVertical: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => handleCategorySelect(cat)}
              style={[
                styles.catBadge,
                { backgroundColor: selectedCategory === cat ? theme.primary : theme.surface }
              ]}
            >
              <Typography 
                color={selectedCategory === cat ? 'textOnPrimary' : 'textSecondary'}
                font="labelLargeBold"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={displayProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListFooterComponent={() => (
            displayProducts.length < allProducts.length ? (
              <ActivityIndicator size="small" color={theme.primary} style={{ marginVertical: 20 }} />
            ) : null
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingHorizontal: 10, paddingBottom: 100 },
  columnWrapper: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    borderRadius: 15,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: { width: '100%', height: 120, marginBottom: 10 },
  cardContent: { gap: 4 },
  priceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 5 
  },
  addButton: { 
    width: 30, 
    height: 30, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  catBadge: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 10,
    elevation: 2
  }
});