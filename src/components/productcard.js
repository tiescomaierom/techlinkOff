import React from 'react';
import './../styles/ProductCard.css'; // Adjust path as needed

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} />
      <div className="product-info">
        <div className="rating">★★★★★</div> {/* Placeholder for rating */}
        <p className="product-name">{product.name}</p>
      </div>
    </div>
  );
}

export default ProductCard;