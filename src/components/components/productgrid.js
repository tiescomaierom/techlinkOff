import React, { useState, useContext } from 'react';
import ProductCard from './productcard';
import './../styles/ProductGrid.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductsContext';
import AddProductPanel from './AddProductPanel'; // adicionado

export default function ProductGrid(props) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const { addToCart, items: cartItems = [] } = useContext(CartContext); // ajustado para obter itens do carrinho
  const { products: ctxProducts = [] } = useProducts() || {};
  const products = props.products || ctxProducts || [];

  const [showAddProduct, setShowAddProduct] = useState(false); // estado para abrir o painel

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
      {/* Barra superior: categorias à esquerda, carrinho + botão Adicionar à direita */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => navigate('/cart')}
            title="Ver carrinho"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            🛒 Carrinho ({cartItems.length})
          </button>

          <button
            onClick={() => setShowAddProduct(true)}
            title="Adicionar produto"
            style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 4 }}
          >
            + Adicionar Produto
          </button>
        </div>
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

      {showAddProduct && (
        <AddProductPanel onClose={() => setShowAddProduct(false)} />
      )}
    </main>
  );
}