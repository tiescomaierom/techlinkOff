import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';
import { CartContext } from '../contexts/CartContext';

function Navbar() {
  const { cart = [] } = useContext(CartContext) || {};
  const count = cart.length || 0;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }} aria-label="Ir para a página inicial">
          <h1 style={{ margin: 0 }}>TECHLINK</h1>
        </Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Encontre aparelhos e periféricos usados..." />
        <button type="submit">🔍</button>
      </div>
      <div className="navbar-actions">
        <button className="sell-device-button">Venda seu aparelho</button>

        <Link
          to="/cart"
          className="cart-icon"
          style={{ textDecoration: 'none', position: 'relative', display: 'inline-block' }}
          aria-label="Ver carrinho"
        >
          <span aria-hidden="true">🛒</span>
          {count > 0 && (
            <span
              className="cart-count"
              aria-live="polite"
              style={{
                position: 'absolute',
                top: -6,
                right: -6,
                background: '#ff3b30',
                color: '#fff',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: 12,
                lineHeight: '12px',
                minWidth: 20,
                textAlign: 'center'
              }}
            >
              {count}
            </span>
          )}
        </Link>

        <Link to="/login" className="login-button" style={{ textDecoration: 'none' }} aria-label="Entrar">Entrar</Link>
      </div>
    </nav>
  );
}

export default Navbar;