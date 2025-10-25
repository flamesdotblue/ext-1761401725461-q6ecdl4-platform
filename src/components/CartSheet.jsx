import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { checkout } from '../lib/api';

export default function CartSheet({ open, onClose }) {
  const { items, removeItem, clear, total } = useCart();

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') onClose?.(); };
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l border-neutral-200 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="h-full flex flex-col">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h3 className="font-semibold">Your Cart</h3>
            <button onClick={onClose} className="text-sm text-neutral-500 hover:text-neutral-900">Close</button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {items.length === 0 ? (
              <p className="text-sm text-neutral-600">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center border border-neutral-200 rounded-lg p-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-neutral-600">Qty {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">${((item.price * item.quantity) / 100).toFixed(2)}</div>
                  <button onClick={() => removeItem(item.id)} className="text-xs text-rose-600 hover:underline">Remove</button>
                </div>
              ))
            )}
          </div>
          <div className="p-5 border-t border-neutral-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">${(total / 100).toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={clear} className="flex-1 px-4 py-2 border border-neutral-200 rounded-md text-sm hover:bg-neutral-50">Clear</button>
              <button
                onClick={async () => {
                  try {
                    const res = await checkout(items);
                    if (res?.url) {
                      window.location.href = res.url;
                    } else {
                      alert('Order placed! A confirmation has been sent.');
                      clear();
                    }
                  } catch (e) {
                    alert('Checkout failed. Please try again.');
                  }
                }}
                className="flex-1 px-4 py-2 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700"
                disabled={items.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
