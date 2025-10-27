import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';

export default function ProductDetail(/* props removed */) {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find(p => String(p.id) === String(id));

  if (!product) return <div style={{ padding: 16 }}>Produto não encontrado.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.name} style={{ width: 400, height: 300, objectFit: 'cover' }} />
      <p>Categoria: {product.category}</p>
      <p>Preço: R$ {product.price}</p>
      {/* restante do detalhe */}
    </div>
  );
}