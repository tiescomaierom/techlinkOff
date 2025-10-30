import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import AddProductPanel from './AddProductPanel';
import { useProducts } from '../contexts/ProductsContext';

function CartPage() {
  const { cart = [], removeFromCart, clearCart, addToCart } = useContext(CartContext) || {};
  const { products = [] } = useProducts() || {}; // garante array por padrão
  const categories = ['all', 'placa mae', 'memoria RAM', 'placa de vídeo', 'processador'];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showManager, setShowManager] = useState(false);

  function handleAddToCart(product) {
    if (typeof addToCart === 'function') {
      addToCart(product);
    } else {
      alert('A função addToCart não está disponível no CartContext. Implemente addToCart no contexto para adicionar ao carrinho.');
      console.warn('CartContext.addToCart não encontrado. Produto:', product);
    }
  }

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter(p => String(p.category || '').toLowerCase() === String(selectedCategory).toLowerCase());

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2>Produtos e Carrinho</h2>
      </div>

      {/* Painel separado para adicionar produtos */}
      {showManager && (
        <AddProductPanel
          addOptions={categories} // passa as categorias como opções ao painel
          onClose={() => setShowManager(false)}
        />
      )}

      <section style={{ marginBottom: 24 }}>
        <h3>Filtros</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 10px',
                background: selectedCategory === cat ? '#0078d4' : '#eee',
                color: selectedCategory === cat ? '#fff' : '#000',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3>Produtos ({filtered.length})</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filtered.map(prod => (
            <li key={prod.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <img
                src={prod.imageUrl || prod.image || 'https://via.placeholder.com/80'}
                alt={prod.name}
                style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 12, borderRadius: 6 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{prod.name}</div>
                <div style={{ fontSize: 12, color: '#555' }}>{prod.category} — R$ {prod.price}</div>
              </div>
              <button onClick={() => handleAddToCart(prod)}>Adicionar ao carrinho</button>
            </li>
          ))}
        </ul>
      </section>

      <hr />

      <div>
        <h2>Seu Carrinho</h2>
        {(!cart || cart.length) === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <img
                  src={item.imageUrl || item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '16px', borderRadius: '8px' }}
                />
                <span style={{ flex: 1 }}>{item.name}</span>
                <button onClick={() => typeof removeFromCart === 'function' ? removeFromCart(item.id) : alert('removeFromCart não implementado')}>Remover</button>
              </li>
            ))}
          </ul>
        )}
        {cart && cart.length > 0 && (
          <button onClick={() => typeof clearCart === 'function' ? clearCart() : alert('clearCart não implementado')}>Limpar Carrinho</button>
        )}
      </div>
    </div>
  );
}

export default CartPage;