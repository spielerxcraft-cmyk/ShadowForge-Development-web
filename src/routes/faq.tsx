import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Route = createFileRoute('/faq')({});

const FAQ_DATA = [
  {
    id: 1,
    question: '📦 What versions?',
    answer: 'We support 1.16 to latest release. Paper & Spigot compatible.'
  },
  {
    id: 2,
    question: '⏰ How long dev?',
    answer: 'Simple: 1-2 weeks. Complex: 4-8 weeks. We give estimates!'
  },
  {
    id: 3,
    question: '🔧 After launch?',
    answer: 'Yes! Diamond & Netherite tiers get priority support & fixes.'
  },
  {
    id: 4,
    question: '🚨 Existing issues?',
    answer: 'We fix lag, security, plugin conflicts & more!'
  },
  {
    id: 5,
    question: '🚫 Anti-cheat?',
    answer: 'Enterprise anti-cheat + DDoS config + custom detection!'
  },
  {
    id: 6,
    question: '🗺️ Custom worlds?',
    answer: 'Yes! Spawn areas, adventure maps & full custom worlds!'
  },
  {
    id: 7,
    question: '🛡️ DDoS protect?',
    answer: 'BungeeCord/Velocity setup + enterprise hosting tips!'
  },
  {
    id: 8,
    question: '💳 Payment?',
    answer: 'Cards, PayPal, Crypto accepted!'
  }
];

export function Component() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-green-950 to-gray-950 py-3 px-2" style={{
      backgroundImage: `
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(34, 197, 94, 0.05) 2px,
          rgba(34, 197, 94, 0.05) 4px
        )
      `
    }}>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center text-green-400 mb-2 pixelated" style={{
          textShadow: '2px 2px 0 rgba(0,0,0,0.8)',
          fontSize: '18px'
        }}>❓ FAQ ❓</h1>
        <p className="text-center text-gray-400 mb-4 text-xs pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>All your questions answered!</p>

        <div className="space-y-2">
          {FAQ_DATA.map(item => (
            <div key={item.id} className="bg-gray-800 border-4 border-green-700 overflow-hidden">
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-green-900 active:bg-green-800 transition cursor-pointer"
              >
                <span className="font-bold text-left text-green-300 text-sm pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-green-400 transition-transform flex-shrink-0 ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openId === item.id && (
                <div className="px-3 py-2 bg-gray-700 border-t-4 border-green-700 text-gray-300 text-xs pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gray-800 border-4 border-green-700 p-3 text-center">
          <h2 className="text-lg font-bold text-green-400 mb-2 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)', fontSize: '14px' }}>More questions?</h2>
          <p className="text-xs text-gray-300 mb-3 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>Contact us!</p>
          <button className="bg-green-700 hover:bg-green-600 active:bg-green-800 text-white px-4 py-2 border-4 border-green-600 font-bold text-sm w-full transition active:scale-95 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
            ✉️ CONTACT
          </button>
        </div>
      </div>
    </div>
  );
}