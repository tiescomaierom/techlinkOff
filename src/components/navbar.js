import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';
import { CartContext } from '../contexts/CartContext';
import AddProductPanel from './AddProductPanel';

function Navbar(props) {
  const { cart = [] } = useContext(CartContext) || {};
  const count = cart.length || 0;
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12 }}>
      <div className="navbar-brand">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }} aria-label="Ir para a página inicial">
          <h1 style={{ margin: 0 }}>TECHLINK</h1>
        </Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Encontre aparelhos e periféricos usados..." />
        <button type="submit">🔍</button>
      </div>
      <div className="navbar-actions" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setShowAddProduct(true)}
          style={{ padding: '8px 12px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Adicionar produtos
        </button>

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
      </div>

      {/* modal do formulário */}
      {showAddProduct && (
        <AddProductPanel
          onClose={() => setShowAddProduct(false)}
          defaultCategory={props.defaultCategory}
          addOptions={props.addOptions}
        />
      )}
    </nav>
  );
}

export default Navbar;