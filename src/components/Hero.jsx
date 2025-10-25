import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white pointer-events-none" />
      <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Delightful cakes, baked to perfection</h1>
          <p className="mt-4 text-neutral-600">Order handcrafted cakes with secure checkout. Fresh ingredients, elegant designs, delivered to your door.</p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#products" className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-rose-600 text-white shadow-sm hover:bg-rose-700 transition">Shop cakes</a>
            <a href="#learn" className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-neutral-300 text-neutral-900 hover:bg-neutral-50 transition">Learn more</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
