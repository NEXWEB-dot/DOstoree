import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="portable-p">{children}</p>,
    h1: ({ children }) => <h1 className="portable-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="portable-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="portable-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="portable-h4">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="portable-quote">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="product-feature-list">{children}</ul>,
    number: ({ children }) => <ol className="product-number-list">{children}</ol>,
  },
  types: {
    image: ({ value }) => {
      if (!value) return null;
      const imgUrl = urlFor(value).width(800).auto('format').url();
      return (
        <figure className="portable-img">
          <img src={imgUrl} alt={value.alt || ''} loading="lazy" />
          {value.alt && <figcaption>{value.alt}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function ProductDescription({ description }) {
  if (!description) return null;

  return (
    <div className="product-description" id="productDescription">
      <PortableText value={description} components={portableTextComponents} />
    </div>
  );
}
