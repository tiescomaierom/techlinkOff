// ...existing code...
import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductsContext';

export default function AddProductPanel({ categories = ['placa mae', 'memoria RAM'], onAdd, onClose }) {
  const { addProduct } = useProducts();
  const [form, setForm] = useState({
    name: '',
    category: categories[0] || 'placa mae',
    price: '',
    imageUrl: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name) return;
    const newProduct = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: parseFloat(form.price) || 0,
      imageUrl: form.imageUrl || ''
    };
    if (typeof onAdd === 'function') {
      onAdd(newProduct);
    } else {
      addProduct(newProduct); // garante que vá para a "home" global
    }
    if (typeof onClose === 'function') onClose();
  }

  // ...existing code...
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{ width: 520, background: '#fff', padding: 20, borderRadius: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Adicionar Produto</h3>
          <button onClick={onClose}>Fechar</button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input
            placeholder="Nome do produto"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            placeholder="Preço"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
          <input
            placeholder="URL da imagem (opcional)"
            value={form.imageUrl}
            onChange={e => setForm({ ...form, imageUrl: e.target.value })}
          />
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Adicionar e Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
// ...existing code...