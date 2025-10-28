import React, { useState } from 'react';
import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import ProductGrid from './components/productgrid';
import ProductDetail from './components/productdetail'; // Novo componente
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import CartPage from './components/cartpage';
import { ProductsProvider } from './contexts/ProductsContext'; // ADICIONADO


function App(props) {
  const openProductManager = () => {
    window.open('/product-manager', '_blank', 'noopener,noreferrer');
  };

  const filterOptions = {
    'Placa Mãe': ['Nvidia', 'GeForce', 'Asus', 'Kabum!' ],
    'Placa de Video': ['Msi', 'GeForce', 'Nvidia'],
    'Processador': ['Amd', 'Intel', 'Zeon'],
    'Fonte': ['Msi', 'C3', 'ATX'],
    'Memória Ram': ['HyperX', 'GeForce', 'Asus'],
    'Gabinete': ['Kabum!'],
  };

  // estado/handlers de filtro
  const [filters, setFilters] = useState({ category: null, option: null });

  const handleSelectFilter = (category, option = null) => {
    setFilters({ category, option });
  };

  const clearFilters = () => setFilters({ category: null, option: null });

  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <div className="header-cabecalho">
              <Header />
              <Navbar />
            </div>
            <div className="main-content">
              <Sidebar
                filterOptions={filterOptions}
                selectedCategory={filters.category}
                selectedOption={filters.option}
                onSelect={handleSelectFilter}
                onClear={clearFilters}
              />
              <Routes>
                <Route path="/" element={<ProductGrid filters={filters} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </div>

            {/* Botão para abrir o Gerenciador de Produtos (não altera CSS existente) */}
            <div style={{ display: 'inline-block' }}>
             
            </div>
          </div>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;