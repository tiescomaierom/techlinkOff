import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ products }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '300px' }} />
      <p>Categoria: {product.categoria}</p>
      {/* Adicione mais detalhes se quiser */}
    </div>
  );
}

export default ProductDetail;