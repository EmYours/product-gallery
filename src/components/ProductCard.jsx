import { ArrowUpRight, Check, Plus } from 'lucide-react';

export default function ProductCard({ product, onView, onAdd, recentlyAdded }) {
  return (
    <article className="product-card">
      <button className="product-image" onClick={() => onView(product)} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} />
        <span className="view-product">View <ArrowUpRight size={16} /></span>
      </button>
      <div className="product-meta">
        <div>
          <p>{product.category}</p>
          <h3>{product.name}</h3>
          <span>{product.material}</span>
        </div>
        <div className="price-action">
          <strong>${product.price}</strong>
          <button
            className={recentlyAdded ? 'add-icon is-added' : 'add-icon'}
            onClick={() => onAdd(product)}
            aria-label={recentlyAdded ? `${product.name} added to bag` : `Add ${product.name} to bag`}
            title={recentlyAdded ? 'Added to bag' : 'Add to bag'}
          >
            {recentlyAdded ? <Check size={17} /> : <Plus size={19} />}
          </button>
        </div>
      </div>
    </article>
  );
}
