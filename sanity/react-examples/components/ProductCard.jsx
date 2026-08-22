import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/sanity';

export default function ProductCard({ product }) {
  const imageUrl = urlFor(product.mainImage)
    .width(600)
    .auto('format')
    .url();

  const priceFormatted = `Rs.${Number(product.price || 0).toLocaleString()}.00 PKR`;
  const oldPriceFormatted = product.oldPrice
    ? `Rs.${Number(product.oldPrice).toLocaleString()}.00 PKR`
    : null;

  return (
    <div className="product-card fade-in visible" id={`product-${product._id}`}>
      <Link 
        href={`/products/${product.slug?.current || product.slug}`} 
        className="product-card-link"
        aria-label={product.title}
      >
        <div className="product-card-img">
          {product.badge && (
            <span className={`product-badge ${product.badge}`}>
              {product.badge === 'sold-out' ? 'Sold out' : product.badge === 'new' ? 'New' : 'Sale'}
            </span>
          )}
          <button 
            className="product-wish" 
            aria-label="Add to wishlist"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <div className="product-quick-shop">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg> Quick View
          </div>
          <img src={imageUrl} alt={product.mainImage?.alt || product.title} loading="lazy" />
        </div>
        <div className="product-card-body">
          <div className="product-rating">
            <div className="product-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  viewBox="0 0 20 20" 
                  style={{ fill: i < (product.rating || 5) ? 'var(--clr-star)' : 'var(--clr-gray)' }}
                >
                  <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.28l-4.77 2.51.91-5.33L2.27 6.62l5.34-.78L10 1z" />
                </svg>
              ))}
            </div>
            <span className="product-reviews">({product.reviewsCount || 0})</span>
          </div>
          <h3 className="product-name">{product.title}</h3>
          <div className="product-pricing">
            {oldPriceFormatted && product.oldPrice > product.price ? (
              <>
                <span className="product-price-old">{oldPriceFormatted}</span>
                <span className="product-price sale-price">{priceFormatted}</span>
              </>
            ) : (
              <span className="product-price">{priceFormatted}</span>
            )}
          </div>
          <span className="product-choose-btn">Choose options</span>
        </div>
      </Link>
    </div>
  );
}
