import axios from 'axios';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { environments } from '~data/constants/environment.constants';

/**
 * Servicio para el Demo de VendaRapidoApp usando FakeStoreAPI
 * Documentación de la API: https://fakestoreapi.com/docs
 */

// Obtener todos los productos (Simula listar productos)
const getStatusProducts = async () => {
  try {
    const response = await axios.get(`${environments.apiUrl}/products`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos demo:', error);
    return false;
  }
};

const getCategories = async () => {
  try {
    const response = await axios.get(`${environments.apiUrl}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías demo:', error);
    return false;
  }
};


const getProduct = async (pid: Int32) => {
  try {
    const response = await axios.get(`${environments.apiUrl}/products/${pid}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${pid}:`, error);
    return false;
  }
};



const getProductsByCategory = async (categoryName: string) => {
  try {
    const response = await axios.get(`${environments.apiUrl}/products/category/${categoryName}`);
    return response.data;
  } catch (error: any) {
    console.error('Error filtrando por categoría:', error);
    return false;
  }
};

export const productService = {
  getStatusProducts,
  getCategories,
  getProduct,
  getProductsByCategory,
};