// ...existing code...
import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductsContext';

export default function AddProductPanel({ onClose, defaultCategory = null, addOptions = [] }) {
  const { addProduct } = useProducts() || {};
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(defaultCategory || '');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(null);

  const validateImageUrl = (url) => {
    if (!url) return true;
    try {
      const u = new URL(url);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setImageError(null);

    if (!name.trim()) {
      setError('Nome é obrigatório.');
      return;
    }

    if (imageUrl && !validateImageUrl(imageUrl)) {
      setImageError('URL de imagem inválida.');
      return;
    }

    const product = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parseFloat(price) || 0,
      category: category || null,
      // grava a URL em várias chaves comuns para compatibilidade com ProductCard/Context
      image: imageUrl || null,
      imageUrl: imageUrl || null,
      img: imageUrl || null,
      imagem: imageUrl || null,
      foto: imageUrl || null
    };

    if (typeof addProduct === 'function') {
      addProduct(product);
    } else {
      console.info('Produto criado (local):', product);
    }
    onClose?.();
  };

  return (
    <div style={{
      position: 'fixed',
      left: 0, top: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200
    }}>
      <div style={{ width: 520, background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 6px 24px rgba(0,0,0,0.2)' }}>
        <h3>Adicionar Produto</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 8 }}>
            <label>Nome</label><br />
            <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Preço</label><br />
            <input value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>URL da imagem</label><br />
            <input
              value={imageUrl}
              onChange={e => { setImageUrl(e.target.value); setImageError(null); }}
              placeholder="https://exemplo.com/imagem.jpg"
              style={{ width: '100%' }}
            />
            {imageError && <div style={{ color: 'red', marginTop: 6 }}>{imageError}</div>}
            {imageUrl && validateImageUrl(imageUrl) && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12, color: '#444', marginBottom: 6 }}>Preview:</div>
                <img src={imageUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 6, border: '1px solid #eee' }} onError={() => setImageError('Não foi possível carregar a imagem.')} />
              </div>
            )}
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Categoria</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
              {addOptions.map(opt => (
                <label key={opt} style={{ cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="category"
                    value={opt}
                    checked={category === opt}
                    onChange={() => setCategory(opt)}
                    style={{ marginRight: 8 }}
                  />
                  {opt}
                </label>
              ))}
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={!category}
                  onChange={() => setCategory('')}
                  style={{ marginRight: 8 }}
                />
                Sem categoria
              </label>
            </div>
          </div>

          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 4 }}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
// ...existing code...