import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './../styles/Navbar.css';
import { CartContext } from '../contexts/CartContext';
import AddProductPanel from './AddProductPanel';

function Navbar(props) {
  const { cart = [] } = useContext(CartContext) || {};
  const count = cart.length || 0;
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const doSearch = (q) => {
    const trimmed = (q || '').trim();
    if (!trimmed) {
      // remove query se estiver vazia — volta para a home
      navigate('/', { replace: false });
      return;
    }
    // navega para a página de produtos com q no querystring
    navigate(`/product?q=${encodeURIComponent(trimmed)}`, { replace: false });
  };

  // sincroniza o input com a query atual (útil quando já está em /product?q=...)
  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search).get('q') || '';
      setSearch(q);
    } catch (e) { /* ignore */ }
  }, [location.search]);

  return (
    <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12 }}>
      <div className="navbar-brand">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }} aria-label="Ir para a página inicial">
          <h1 style={{ margin: 0 }}>TECHLINK</h1>
        </Link>
      </div>
      <div className="navbar-search" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Encontre aparelhos e periféricos usados..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); doSearch(search); } }}
          aria-label="Pesquisar produtos"
          style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', minWidth: 240 }}
        />
        <button type="button" onClick={() => doSearch(search)} aria-label="Pesquisar" style={{ padding: '6px 10px', cursor: 'pointer' }}>
          🔍
        </button>
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