import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Sword, Shield, MapPin, Zap, Heart, TrendingUp, MessageCircle, Mail, Send, Pickaxe, Hammer, Wand2 } from 'lucide-react';

export const Route = createFileRoute('/')({});

const ICON_MAP: Record<string, React.ReactNode> = {
  sword: <Sword size={40} />,
  shield: <Shield size={40} />,
  map: <MapPin size={40} />,
  lightning: <Zap size={40} />,
  heart: <Heart size={40} />,
  server: <Pickaxe size={40} />,
  puzzle: <Hammer size={40} />,
  clock: <TrendingUp size={40} />,
};

interface ContentData {
  settings: Record<string, string>;
  pricing: any[];
  features: any[];
  announcements: any[];
  serverInfo: any[];
}

export function Component() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load content:', err);
        setLoading(false);
      });
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 via-green-950 to-gray-950">
        <div className="text-center animate-bounce">
          <div className="text-6xl font-bold text-green-400 mb-4 pixelated" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.8)' }}>⛏️</div>
          <p className="text-lg text-green-300 font-bold pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>LOADING...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 via-green-950 to-gray-950">
        <div className="text-center">
          <p className="text-lg text-red-400 font-bold pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>❌ ERROR!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-950 via-green-950 to-gray-950 text-gray-100 min-h-screen" style={{
      backgroundImage: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(34, 197, 94, 0.05) 2px,
          rgba(34, 197, 94, 0.05) 4px
        ),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(34, 197, 94, 0.05) 2px,
          rgba(34, 197, 94, 0.05) 4px
        )
      `
    }}>
      {/* Announcements */}
      {content.announcements.filter(a => a.active).length > 0 && (
        <div className="bg-yellow-900 border-b-4 border-yellow-700 px-3 py-2 mx-2 mt-2 border-l-4 border-r-4 border-t-4">
          <div className="max-w-md mx-auto">
            {content.announcements.filter(a => a.active).map(ann => (
              <div key={ann.id} className="text-center">
                <p className="font-bold text-yellow-300 text-sm pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>⚠️ {ann.title}</p>
                <p className="text-yellow-100 text-xs pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.6)' }}>{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-900 to-gray-900 border-b-6 border-amber-900 py-6 px-2 mt-2">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-3 text-5xl animate-pulse" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.8)' }}>🎮</div>
          <h1 className="text-2xl font-bold mb-3 text-green-300 pixelated leading-tight" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)', fontSize: '18px' }}>
            {content.settings.hero_title}
          </h1>
          <p className="text-xs text-green-200 mb-4 pixelated leading-relaxed" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.6)' }}>
            {content.settings.hero_subtitle}
          </p>
          <div className="flex flex-col gap-2">
            <button className="bg-green-700 hover:bg-green-600 active:bg-green-800 text-white px-4 py-2 border-4 border-green-600 font-bold text-sm transition transform active:scale-95" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
              ▶️ START NOW
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-green-400 px-4 py-2 border-4 border-green-700 font-bold text-sm transition transform active:scale-95" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
              📖 LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Server Stats */}
      <section className="bg-gray-900 border-b-6 border-amber-900 py-4 px-2 mt-2">
        <h2 className="text-center text-xl font-bold text-green-400 mb-4 pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)', fontSize: '16px' }}>⭐ OUR STATS ⭐</h2>
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
          {content.serverInfo.map(item => (
            <div key={item.id} className="bg-gray-800 border-4 border-green-700 p-3 text-center hover:bg-green-900 transition active:scale-95 cursor-pointer">
              <div className="text-3xl mb-1">{ICON_MAP[item.icon as keyof typeof ICON_MAP]}</div>
              <p className="text-lg font-bold text-green-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)', fontSize: '14px' }}>{item.value}</p>
              <p className="text-gray-400 text-xs pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-950 border-b-6 border-green-700 py-4 px-2 mt-2">
        <h2 className="text-center text-xl font-bold text-green-400 mb-4 pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)', fontSize: '16px' }}>🛠️ SERVICES 🛠️</h2>
        <div className="max-w-md mx-auto space-y-2">
          {content.features.map(feature => (
            <div key={feature.id} className="bg-gray-800 border-4 border-green-700 p-3 hover:bg-green-900 transition active:scale-95 cursor-pointer">
              <div className="text-3xl mb-2 text-amber-400" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>{ICON_MAP[feature.icon as keyof typeof ICON_MAP]}</div>
              <h3 className="text-sm font-bold text-green-300 mb-1 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>{feature.title}</h3>
              <p className="text-xs text-gray-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-900 border-b-6 border-amber-900 py-4 px-2 mt-2">
        <h2 className="text-center text-xl font-bold text-green-400 mb-4 pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)', fontSize: '16px' }}>💰 PRICING 💰</h2>
        <div className="max-w-md mx-auto space-y-2">
          {content.pricing.map(tier => (
            <div
              key={tier.id}
              className={`border-4 p-3 transition active:scale-95 ${
                tier.highlighted
                  ? 'bg-green-800 border-green-500 ring-4 ring-green-500 shadow-lg'
                  : 'bg-gray-800 border-green-700 hover:bg-green-900'
              }`}
            >
              {tier.highlighted && (
                <div className="bg-green-500 text-black font-bold px-2 py-1 w-fit mb-2 border-2 border-green-400 text-xs pixelated" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}>⭐ BEST ⭐</div>
              )}
              <h3 className="text-lg font-bold text-green-300 mb-1 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>{tier.name}</h3>
              <p className="text-2xl font-bold text-green-400 mb-2 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)', fontSize: '18px' }}>{tier.price}</p>
              <p className="text-gray-400 mb-2 text-xs pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>{tier.description}</p>
              <ul className="space-y-1 mb-3">
                {(typeof tier.features === 'string' ? JSON.parse(tier.features) : tier.features).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1 text-xs text-gray-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>
                    <span className="text-green-400 font-bold mt-0.5">■</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 border-4 font-bold text-sm transition active:scale-95 pixelated ${
                  tier.highlighted
                    ? 'bg-green-500 text-black border-green-400 hover:bg-green-600 active:bg-green-700'
                    : 'bg-green-700 text-white border-green-600 hover:bg-green-600 active:bg-green-800'
                }`}
              >
                ✓ SELECT
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-950 border-b-6 border-green-700 py-4 px-2 mt-2">
        <h2 className="text-center text-lg font-bold text-green-400 mb-3 pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)', fontSize: '14px' }}>📬 NEWSLETTER 📬</h2>
        <div className="max-w-md mx-auto">
          <p className="text-center text-gray-300 mb-3 text-xs pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>Get updates on server dev!</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="px-3 py-2 bg-gray-800 border-4 border-green-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 text-sm pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 active:bg-green-800 text-white px-4 py-2 border-4 border-green-600 font-bold text-sm transition active:scale-95 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}
            >
              ➤ SUBSCRIBE
            </button>
          </form>
          {submitted && <p className="text-center text-green-400 mt-2 font-bold text-sm pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>✓ SUCCESS!</p>}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 border-b-6 border-amber-900 py-4 px-2 mt-2">
        <h2 className="text-center text-lg font-bold text-green-400 mb-4 pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)', fontSize: '14px' }}>📞 CONTACT 📞</h2>
        <div className="max-w-md mx-auto space-y-2">
          <a href={`mailto:${content.settings.contact_email}`} className="bg-gray-800 border-4 border-green-700 p-3 text-center hover:bg-green-900 transition active:scale-95 block">
            <Mail size={32} className="mx-auto mb-2 text-green-400" />
            <p className="text-xs font-bold text-green-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>EMAIL</p>
            <p className="text-xs text-green-400 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>{content.settings.contact_email}</p>
          </a>
          <a href={content.settings.discord_url} target="_blank" rel="noopener noreferrer" className="bg-gray-800 border-4 border-green-700 p-3 text-center hover:bg-green-900 transition active:scale-95 block">
            <MessageCircle size={32} className="mx-auto mb-2 text-green-400" />
            <p className="text-xs font-bold text-green-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>DISCORD</p>
            <p className="text-xs text-green-400 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>JOIN</p>
          </a>
          <div className="bg-gray-800 border-4 border-green-700 p-3 text-center">
            <Zap size={32} className="mx-auto mb-2 text-green-400" />
            <p className="text-xs font-bold text-green-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>SERVER IP</p>
            <p className="text-xs text-green-400 font-mono pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>{content.settings.server_ip}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t-6 border-green-700 py-3 px-2 mt-4 mb-2">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-green-400 font-bold mb-2 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>⛏️ {content.settings.site_title} ⛏️</p>
          <p className="text-xs text-gray-400 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>{content.settings.footer_text}</p>
          <p className="text-xs text-gray-500 mt-2 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>© 2024 CraftForge Dev</p>
        </div>
      </footer>
    </div>
  );
}