import React, { useState } from 'react';
import { urlFor } from '../lib/sanity';

export default function ProductGallery({ product }) {
  // Aggregate main image and gallery images
  const images = [];
  if (product.mainImage) images.push(product.mainImage);
  if (product.gallery && Array.isArray(product.gallery)) {
    product.gallery.forEach((g) => {
      const gRef = g.asset?._ref || g.url;
      const mRef = product.mainImage?.asset?._ref || product.mainImage?.url;
      if (!gRef || gRef !== mRef) images.push(g);
    });
  }

  const [activeImage, setActiveImage] = useState(images[0]);

  if (images.length === 0) return null;

  const mainUrl = activeImage ? urlFor(activeImage).width(1000).auto('format').url() : '';
  const mainAlt = activeImage?.alt || product.title;

  return (
    <div className="product-gallery fade-in-left">
      <div className="product-main-img">
        {product.badge && (
          <span className={`product-badge large ${product.badge}`}>
            {product.badge === 'sold-out' ? 'Sold Out' : product.badge === 'new' ? 'New Arrival' : 'Sale'}
          </span>
        )}
        <img src={mainUrl} alt={mainAlt} id="mainProductImg" />
      </div>

      {images.length > 1 && (
        <div className="product-thumbnails">
          {images.map((img, idx) => {
            const thumbUrl = urlFor(img).width(200).height(200).auto('format').url();
            const isActive = img === activeImage;
            return (
              <img
                key={idx}
                src={thumbUrl}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                className={isActive ? 'active' : ''}
                onClick={() => setActiveImage(img)}
                tabIndex={0}
                role="button"
                aria-label={`View image ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
