import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { client, GROQ_QUERIES } from '../../lib/sanity';
import ProductGallery from '../../components/ProductGallery';
import ProductDescription from '../../components/ProductDescription';

export default function ProductDetailPage({ product }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>Product not found</div>;
  }

  const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const priceFormatted = `Rs.${Number(product.price || 0).toLocaleString()}.00`;
  const oldPriceFormatted = product.oldPrice && product.oldPrice > product.price 
    ? `Rs.${Number(product.oldPrice).toLocaleString()}.00` 
    : null;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Head>
        <title>{`${product.title} | DO Store — Premium Football Jerseys`}</title>
        <meta name="description" content={`Buy ${product.title} at DO Store Pakistan. Premium quality football shirts with nationwide cash on delivery.`} />
      </Head>

      <main className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb fade-in">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <div className="product-detail-container">
          {/* Left: Gallery with @sanity/image-url */}
          <ProductGallery product={product} />

          {/* Right: Product Info */}
          <div className="product-info fade-in-right">
            <div className="product-info-header">
              <span className="product-brand">{product.brand || 'DO Store Official'}</span>
              <h1 className="product-title-large">{product.title}</h1>
              <div className="product-rating">
                <div className="product-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" style={{ fill: i < (product.rating || 5) ? 'var(--clr-star)' : 'var(--clr-gray)' }}>
                      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.28l-4.77 2.51.91-5.33L2.27 6.62l5.34-.78L10 1z" />
                    </svg>
                  ))}
                </div>
                <span className="product-reviews">{product.reviewsCount || 12} Reviews</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="product-price-wrap">
              <span className="product-price-large">{priceFormatted}</span>
              {oldPriceFormatted && (
                <span className="product-price-old-large">{oldPriceFormatted}</span>
              )}
            </div>

            {/* Rich Text Description with @portabletext/react */}
            <ProductDescription description={product.description} />

            {/* Form */}
            <div className="product-form">
              <div className="form-group">
                <div className="form-group-flex">
                  <label>Select Size</label>
                  <span className="size-guide-link">Size Guide</span>
                </div>
                <div className="size-selector">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <div className="qty-cart-wrap">
                  <div className="qty-selector">
                    <button type="button" className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                    <input type="number" className="qty-input" value={quantity} readOnly />
                    <button type="button" className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button 
                    type="button" 
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    style={added ? { background: 'var(--clr-success)', color: 'var(--clr-white)', borderColor: 'var(--clr-success)' } : {}}
                  >
                    {added ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>

              <Link href="/checkout" className="checkout-now-btn">
                Buy Now — Checkout
              </Link>
            </div>

            {/* Specifications Accordion */}
            {product.details && product.details.length > 0 && (
              <div className="product-accordion-wrap">
                <div className="accordion-item open">
                  <button className="accordion-header">
                    Product Details
                    <span className="accordion-icon" />
                  </button>
                  <div className="accordion-content" style={{ maxHeight: '500px' }}>
                    <div className="accordion-inner">
                      <ul>
                        {product.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const products = await client.fetch(`*[_type == "product"]{ "slug": slug.current }`);
  const paths = (products || []).map((p) => ({
    params: { slug: p.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const product = await client.fetch(GROQ_QUERIES.PRODUCT_BY_SLUG, {
    slug: params.slug,
  });

  return {
    props: {
      product: product || null,
    },
    revalidate: 60,
  };
}
