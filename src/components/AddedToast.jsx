import { Check, ShoppingBag } from 'lucide-react';

export default function AddedToast({ notice, onOpenCart }) {
  if (!notice) return null;
  return (
    <div className="added-toast" key={notice.id} role="status" aria-live="polite">
      <span className="toast-check"><Check size={15} /></span>
      <span><strong>{notice.name}</strong> added to your bag</span>
      <button onClick={onOpenCart}><ShoppingBag size={15} /> View bag</button>
    </div>
  );
}
