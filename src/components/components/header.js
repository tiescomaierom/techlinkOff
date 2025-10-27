import React, { useContext } from 'react';
import './../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function Header() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="header-top-bar">
        <span className="header-message">Especialistas em aparelhos seminovos!</span>
        <div className="header-links">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/cart')}>
            Carrinho ({cart.length}) <span className="icon">🛒</span>
          </button>
          <a href="#">Sobre nós</a>
          <a href="#">Meus pedidos</a>
          <span className="icon">🔔</span>
          <span className="icon">⚙️</span>
        </div>
      </div>
    </header>
  );
}

export default Header;