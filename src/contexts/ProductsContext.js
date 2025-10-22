// ...existing code...
import React, { createContext, useContext, useState } from 'react';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Placa Mãe Asus X', category: 'placa mae', price: 450.0, imageUrl: '' },
    { id: 2, name: 'Memoria RAM 8GB', category: 'memoria RAM', price: 120.0, imageUrl: '' },
  ]);

  function addProduct(product) {
    setProducts(prev => [product, ...prev]);
  }

  const value = { products, addProduct, setProducts };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
// ...existing code...