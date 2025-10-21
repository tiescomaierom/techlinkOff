import React from 'react';
import './../styles/Navbar.css'; // Adjust path as needed

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>TECHLINK</h1>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Encontre aparelhos e periféricos usados..." />
        <button type="submit">🔍</button>
      </div>
      <div className="navbar-actions">
        <button className="sell-device-button">Venda seu aparelho</button>
        <a href="#" className="cart-icon">🛒</a>
        <a href="#" className="login-button">Entrar</a>
      </div>
    </nav>
  );
}

export default Navbar;