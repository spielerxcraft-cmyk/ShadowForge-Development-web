import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-gray-900 to-gray-800 border-b-8 border-amber-900 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-md mx-auto px-2 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition active:scale-95">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 border-4 border-green-500 flex items-center justify-center text-yellow-300 font-bold text-xl pixelated drop-shadow-lg" style={{
            fontSize: '20px',
            lineHeight: '1',
            textShadow: '2px 2px 0 rgba(0,0,0,0.8)'
          }}>
            C
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-green-400 pixelated" style={{ fontSize: '11px', textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>⛏️ CRAFTFORGE</span>
            <span className="text-xs text-amber-300 pixelated" style={{ fontSize: '9px', textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>Dev Server</span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-700 active:bg-gray-600 border-2 border-green-700 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} className="text-green-400" /> : <Menu size={24} className="text-green-400" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="bg-gray-800 border-t-4 border-amber-900 p-2 space-y-2">
          <Link to="/" className="block text-center bg-green-700 hover:bg-green-600 active:bg-green-800 text-white px-3 py-2 border-4 border-green-600 font-bold text-sm transition" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
            🏠 HOME
          </Link>
          <Link to="/faq" className="block text-center bg-green-700 hover:bg-green-600 active:bg-green-800 text-white px-3 py-2 border-4 border-green-600 font-bold text-sm transition" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
            ❓ FAQ
          </Link>
          <a href="#pricing" className="block text-center bg-green-700 hover:bg-green-600 active:bg-green-800 text-white px-3 py-2 border-4 border-green-600 font-bold text-sm transition" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
            💰 PRICING
          </a>
          <Link to="/admin" className="block text-center bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white px-3 py-2 border-4 border-amber-600 font-bold text-sm transition" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
            🔐 ADMIN
          </Link>
        </div>
      )}
    </header>
  );
}