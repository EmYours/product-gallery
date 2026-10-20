import { Search, ShoppingBag } from 'lucide-react';

export default function Header({ search, setSearch, cartCount, bagPulseKey, onOpenCart }) {
  return (
    <header className="header">
      <a className="brand" href="#top">ATELIER<span>—</span></a>
      <nav aria-label="Main navigation">
        <a className="active" href="#collection">Collection</a>
        <a href="#about">About</a>
      </nav>
      <div className="header-actions">
        <label className="search">
          <Search size={17} />
          <span className="sr-only">Search products</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" />
        </label>
        <button className="bag-button" onClick={onOpenCart} aria-label={`Open shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`} title="View shopping bag">
          <ShoppingBag className={bagPulseKey ? 'bag-icon is-pulsing' : 'bag-icon'} key={bagPulseKey} size={19} />
          {cartCount > 0 && <span className="bag-count" key={cartCount}>{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
