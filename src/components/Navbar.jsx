import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenCart, onOpenAuth }) {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500" />
          <span>CakeCraft</span>
        </a>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-neutral-200 hover:bg-neutral-50"
                aria-label="Logout"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-neutral-200 hover:bg-neutral-50"
              aria-label="Sign in"
            >
              <User size={18} />
              <span className="hidden sm:inline">Sign in</span>
            </button>
          )}
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-neutral-200 hover:bg-neutral-50"
            aria-label="Open cart"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-rose-600 text-white">
                {count}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
