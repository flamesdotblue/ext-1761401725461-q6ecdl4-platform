import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getProducts } from '../lib/api';

const fallbackProducts = [
  {
    id: 'cake-1',
    name: 'Chocolate Velvet',
    price: 3400,
    image: 'https://images.unsplash.com/photo-1690584176786-d3401cfa165f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDaG9jb2xhdGUlMjBWZWx2ZXR8ZW58MHwwfHx8MTc2MTM4MDM2NXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description: 'Rich cocoa layers with silky ganache.'
  },
  {
    id: 'cake-2',
    name: 'Strawberry Bliss',
    price: 2990,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop',
    description: 'Fresh strawberries and vanilla cream.'
  },
  {
    id: 'cake-3',
    name: 'Lemon Zest',
    price: 2790,
    image: 'https://images.unsplash.com/photo-1559079810-d5c52f077bee?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxMZW1vbiUyMFplc3R8ZW58MHwwfHx8MTc2MTM3ODU1M3ww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description: 'Tangy lemon sponge with buttercream.'
  },
  {
    id: 'cake-4',
    name: 'Red Velvet Classic',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop',
    description: 'Iconic red velvet with cream cheese.'
  }
];

export default function ProductGrid() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { addItem } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getProducts();
        if (mounted) setProducts(res || fallbackProducts);
      } catch {
        if (mounted) setProducts(fallbackProducts);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="products">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-4 animate-pulse h-72" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="products">
      {products.map((p) => (
        <div key={p.id} className="group rounded-xl border border-neutral-200 overflow-hidden bg-white hover:shadow-md transition">
          <div className="aspect-[4/3] overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
          </div>
          <div className="p-4">
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-neutral-600 line-clamp-2 mt-1">{p.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold">${(p.price / 100).toFixed(2)}</span>
              <button
                onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
                className="px-3 py-1.5 rounded-md bg-neutral-900 text-white text-sm hover:bg-neutral-800"
              >
                {user ? 'Add to cart' : 'Add (guest)'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
