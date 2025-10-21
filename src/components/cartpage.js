import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div>
      <h2>Seu Carrinho</h2>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map(item => (
            <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img
                src={item.imageUrl || 'https://via.placeholder.com/80'}
                alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '16px', borderRadius: '8px' }}
              />
              <span style={{ flex: 1 }}>{item.name}</span>
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={clearCart}>Limpar Carrinho</button>
      )}
    </div>
  );
}

export default CartPage;