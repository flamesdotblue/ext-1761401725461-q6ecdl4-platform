import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSheet from './components/CartSheet';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function AppShell() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar onOpenCart={() => setCartOpen(true)} onOpenAuth={() => setAuthOpen(true)} />
      <main>
        <Hero />
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Popular Cakes</h2>
            <p className="text-sm text-neutral-500">{user ? `Welcome, ${user.name}` : 'Sign in to save your favorites'}</p>
          </div>
          <ProductGrid />
        </section>
      </main>
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  );
}
