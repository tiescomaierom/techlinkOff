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

function App() {
  const products = [
    { id: 1,
      name: 'Gabinete Mancer', 
      imageUrl: 'https://s2-techtudo.glbimg.com/HkK-EOIeBys8J5v8hiq0onWhcpA=/0x0:695x463/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/V/o/VRLU2iTgAJXPsvZhh3bQ/2015-10-07-processador-da-intel-alcancou-altissima-velocidade.png',
      categoria: 'Processador'},

    { id: 2, 
      name: 'Processador i5-13700k', 
      imageUrl: './assets/processador.png',
      categoria: 'Processador' },

    { id: 3,
      name: 'Fonte Blue Case 500W', 
      imageUrl: 'path/to/fonte.jpg' ,
      categoria: 'Processador' },

    { id: 4, 
      name: 'Cooler para processador', 
      imageUrl: 'path/to/cooler.jpg' ,
      categoria: 'Processador' },

    { id: 5, 
      name: 'Memória RAM 2x 8 DDR5', 
      imageUrl: 'path/to/ram.jpg' ,
      categoria: 'Processador' },

    { id: 6, 
      name: 'Placa Mãe Asus B550M', 
      imageUrl: 'path/to/placamae.jpg' ,
      categoria: 'Processador' },
    
    { id: 7, 
      name: 'Gabinete Mancer', 
      imageUrl: 'path/to/gabinete2.jpg' ,
      categoria: 'Processador' },

    { id: 8, 
      name: 'Gabinete Mancer', 
      imageUrl: 'path/to/gabinete3.jpg' ,
      categoria: 'Processador' }
  ];

  const filterOptions = {
    'Placa Mãe': ['Nvidia', 'GeForce', 'Asus', 'Kabum!' ],
    'Placa de Video': ['Msi', 'GeForce', 'Nvidia'],
    'Processador': ['Amd', 'Intel', 'Zeon'],
    'Fonte': ['Msi', 'C3', 'ATX'],
    'Memória Ram': ['HyperX', 'GeForce', 'Asus'],
    'Gabinete': ['Kabum!'],
  };

    return (
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
              <Route path="/" element={<ProductGrid products={products} />} />
              <Route path="/product/:id" element={<ProductDetail products={products} />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;