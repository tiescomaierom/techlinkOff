import React, { useState, useContext } from 'react';
import ProductCard from './productcard';
import './../styles/ProductGrid.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductsContext';

export default function ProductGrid(props) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const { addToCart } = useContext(CartContext);
  const { products: ctxProducts = [] } = useProducts() || {};
  const products = props.products || ctxProducts || [];

  // Lista de categorias
  const categories = [
    'Todas',
    'Placa Mãe',
    'Placa de Vídeo',
    'Processador',
    'Fonte',
    'Memória Ram',
    'Gabinete'
  ];

  // Normaliza campo de categoria dos produtos (suporta 'categoria' ou 'category')
  const getProductCategory = (product) => {
    return (product.category || product.categoria || '').toString();
  };

  // Filtra produtos pela categoria selecionada
  const filteredProducts = selectedCategory === 'Todas'
    ? products
    : products.filter(product =>
        getProductCategory(product).toLowerCase() === selectedCategory.toLowerCase()
      );

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (typeof addToCart === 'function') {
      addToCart(product);
    } else {
      alert('Função addToCart não está disponível no CartContext.');
    }
  };

  return (
    <main className="product-grid" style={{ padding: 16 }}>
      <div className="category-navigation">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="product-item"
            style={{ cursor: 'pointer', border: '1px solid #ddd', padding: 12, borderRadius: 6 }}
            onClick={() => handleCardClick(product.id)}
          >
            <ProductCard product={product} />
            <div className="product-actions" style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <button
                onClick={e => {
                  e.stopPropagation();
                  alert(`Comprar: ${product.name || product.nome || ''}`);
                }}
              >
                Comprar
              </button>
              <button
                onClick={e => handleAddToCart(e, product)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}