import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';

export default function ProductDetail(/* props removed */) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts() || { products: [] };
  const product = products.find(p => String(p.id) === String(id));

  if (!product) return <div style={{ padding: 16 }}>Produto não encontrado.</div>;

  const imageSrc = product.imageUrl || product.image || product.img || 'https://via.placeholder.com/400x300?text=Sem+imagem';
  const description = product.description || product.descricao || product.desc || product.detalhe || product.detalhes || '';
  const priceFormatted = (typeof product.price === 'number')
    ? product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : product.price;

  return (
    <div style={{ padding: 16, maxWidth: 920, margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Voltar</button>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <img
          src={imageSrc}
          alt={product.name}
          style={{ width: 400, height: 300, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }}
        />

        <div style={{ flex: 1, minWidth: 260 }}>
          <h1 style={{ marginTop: 0 }}>{product.name}</h1>

          <div style={{ margin: '8px 0' }}>
            <strong>Preço:</strong> <span>{priceFormatted}</span>
          </div>

          {product.category ? (
            <div style={{ margin: '8px 0' }}>
              <strong>Categoria:</strong> <span>{product.category}</span>
            </div>
          ) : null}

          <div style={{ marginTop: 12 }}>
            <strong>Descrição</strong>
            <p style={{ whiteSpace: 'pre-wrap', marginTop: 6, lineHeight: 1.5 }}>
              {description || <span style={{ color: '#666' }}>Sem descrição.</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}