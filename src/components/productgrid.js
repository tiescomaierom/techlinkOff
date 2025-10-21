import React, { useState, useContext } from 'react';
import ProductCard from './productcard';
import './../styles/ProductGrid.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function ProductGrid({ products }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const { addToCart } = useContext(CartContext);

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

  // Filtra produtos pela categoria selecionada
  const filteredProducts = selectedCategory === 'Todas'
    ? products
    : products.filter(product => product.categoria === selectedCategory);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <main className="product-grid">
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
      <div className="products-container">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="product-item"
            style={{ cursor: 'pointer' }}
            onClick={() => handleCardClick(product.id)}
          >
            <ProductCard product={product} />
            <div className="product-actions">
              <button
                onClick={e => {
                  e.stopPropagation();
                  alert(`Comprar: ${product.name}`);
                }}
              >
                Comprar
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  addToCart(product);
                  alert(`Adicionado ao carrinho: ${product.name}`);
                }}
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

export default ProductGrid;