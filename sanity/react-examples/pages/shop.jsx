import React, { useState } from 'react';
import Head from 'next/head';
import { client, GROQ_QUERIES } from '../lib/sanity';
import ProductCard from '../components/ProductCard';

export default function ShopPage({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState('featured');

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    const sorted = [...products];
    if (value === 'low') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (value === 'high') {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (value === 'new') {
      sorted.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    }
    setProducts(sorted);
  };

  return (
    <>
      <Head>
        <title>Shop All Football Jerseys | DO Store</title>
        <meta name="description" content="Shop authentic football shirts at DO Store Pakistan." />
      </Head>

      <div className="shop-header fade-in">
        <div className="container">
          <span className="section-eyebrow">All Products</span>
          <h1 className="shop-header-title">Shop All <strong>Football Jerseys</strong></h1>
          <p className="shop-header-sub">Premium quality kits for every fan — club, national, and retro collections</p>
        </div>
      </div>

      <section className="section section-white" id="products">
        <div className="container">
          <div className="shop-filters fade-in">
            <div className="filter-count">{products.length} Products found</div>
            <div className="filter-controls">
              <select className="filter-select" value={sortBy} onChange={handleSortChange}>
                <option value="featured">Sort by: Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="new">Newest First</option>
              </select>
            </div>
          </div>

          <div className="products-grid stagger-children" id="productsGrid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const products = await client.fetch(GROQ_QUERIES.ALL_PRODUCTS);

  return {
    props: {
      initialProducts: products || [],
    },
    revalidate: 60,
  };
}
