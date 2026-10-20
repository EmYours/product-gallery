import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function CartDrawer({ items, onClose, onChangeQuantity, onRemove }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="drawer-backdrop" onMouseDown={onClose} role="presentation">
      <aside
        className="cart-drawer"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2 id="cart-title">Shopping bag <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close shopping bag"><X /></button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={26} strokeWidth={1.4} />
            <p>Your bag is waiting for something good.</p>
            <button className="continue-button" onClick={onClose}>Continue browsing</button>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map(({ product, quantity }) => (
                <li className="cart-item" key={product._id}>
                  <img src={product.image} alt="" />
                  <div className="cart-item-copy">
                    <p>{product.category}</p>
                    <h3>{product.name}</h3>
                    <span>{money.format(product.price)}</span>
                    <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                      <button onClick={() => onChangeQuantity(product._id, quantity - 1)} aria-label={`Remove one ${product.name}`}><Minus size={14} /></button>
                      <span>{quantity}</span>
                      <button onClick={() => onChangeQuantity(product._id, quantity + 1)} aria-label={`Add one ${product.name}`}><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="cart-item-end">
                    <strong>{money.format(product.price * quantity)}</strong>
                    <button onClick={() => onRemove(product._id)} aria-label={`Remove ${product.name} from bag`}><Trash2 size={16} /></button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{money.format(total)}</strong></div>
              <p>Shipping and any applicable taxes are calculated at checkout.</p>
              <button className="continue-button" onClick={onClose}>Continue browsing</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
