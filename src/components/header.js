import React from 'react';
import './../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-top-bar">
        <span className="header-message">Especialistas em aparelhos seminovos!</span>
        <div className="header-links">
          <a href="#">Sobre nós</a>
        </div>
      </div>
    </header>
  );
}

export default Header;