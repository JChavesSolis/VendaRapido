import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '~themes/colors'; 

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadStorage = async () => {
      try {
        const savedSession = await AsyncStorage.getItem('@VendaRapido_IsLogged');
        const savedCart = await AsyncStorage.getItem('@VendaRapido_Cart');
        const savedTheme = await AsyncStorage.getItem('@VendaRapido_Theme');
        
        if (savedSession === 'true') setIsLogged(true);
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedTheme) setIsDarkMode(savedTheme === 'dark');
      } catch (error) {
        console.error('Error al cargar persistencia:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStorage();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('@VendaRapido_Theme', newMode ? 'dark' : 'light');
  };

  const themeColors = isDarkMode ? darkTheme : lightTheme;

  const login = async () => {
    await AsyncStorage.setItem('@VendaRapido_IsLogged', 'true');
    setIsLogged(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['@VendaRapido_IsLogged', '@VendaRapido_Cart']);
    setIsLogged(false);
    setCart([]);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      const newCart = exists 
        ? prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item)
        : [...prev, {...product, qty: 1}];
      AsyncStorage.setItem('@VendaRapido_Cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const item = prev.find(i => i.id === productId);
      let newCart;

      if (item && item.qty > 1) {
        newCart = prev.map(i => i.id === productId ? { ...i, qty: i.qty - 1 } : i);
      } else {
        newCart = prev.filter(i => i.id !== productId);
      }
      
      AsyncStorage.setItem('@VendaRapido_Cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = async () => {
    setCart([]);
    await AsyncStorage.removeItem('@VendaRapido_Cart');
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount: cart.reduce((acc, item) => acc + item.qty, 0),
        cartTotal: cart.reduce((acc, item) => acc + (item.price * item.qty), 0),
        loading,
        theme: themeColors, 
        isDarkMode,
        toggleTheme
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);