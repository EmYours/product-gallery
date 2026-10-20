import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiUrl}/products`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load the collection.');
        return response.json();
      })
      .then((items) => { setProducts(items); setStatus('ready'); })
      .catch((error) => { if (error.name !== 'AbortError') setStatus('error'); });
    return () => controller.abort();
  }, []);

  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], [products]);
  const visibleProducts = useMemo(() => products.filter((product) => (activeCategory === 'All' || product.category === activeCategory) && product.name.toLowerCase().includes(search.toLowerCase())), [activeCategory, products, search]);
  const addToCart = () => setCartCount((count) => count + 1);

  return <main id="top"><Header search={search} setSearch={setSearch} cartCount={cartCount} /><section className="intro"><p className="eyebrow">Object studies / 2026</p><h1>Objects with<br /><em>quiet presence.</em></h1><p className="intro-copy">A considered collection of furniture, light, and useful forms for the spaces you return to every day.</p><a href="#collection" className="text-link">Explore the collection ↓</a></section><section className="collection" id="collection"><div className="section-heading"><p className="eyebrow">The collection</p><h2>Made for living,<br />kept for longer.</h2></div><FilterBar categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} total={visibleProducts.length} />{status === 'loading' && <p className="empty-state">Loading the collection…</p>}{status === 'error' && <p className="empty-state">The collection is unavailable. Start the API and confirm its database connection.</p>}{status === 'ready' && (visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product._id} product={product} onView={setSelectedProduct} onAdd={addToCart} />)}</div> : <p className="empty-state">No pieces match your search.</p>)}</section><section className="about" id="about"><p className="eyebrow">Our approach</p><p>We choose honest materials, useful proportions, and details that reward a second look.</p></section><footer><span>© 2026 Atelier</span><span>Designed for everyday rituals</span></footer><ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} /></main>;
}
