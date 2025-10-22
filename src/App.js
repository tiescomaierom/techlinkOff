import React from 'react';
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


function App() {

  


  const filterOptions = {
    'Placa Mãe': ['Nvidia', 'GeForce', 'Asus', 'Kabum!' ],
    'Placa de Video': ['Msi', 'GeForce', 'Nvidia'],
    'Processador': ['Amd', 'Intel', 'Zeon'],
    'Fonte': ['Msi', 'C3', 'ATX'],
    'Memória Ram': ['HyperX', 'GeForce', 'Asus'],
    'Gabinete': ['Kabum!'],
  };

   
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
              <Sidebar filterOptions={filterOptions} />
              <Routes>
                <Route path="/" element={<ProductGrid />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}
export default App;