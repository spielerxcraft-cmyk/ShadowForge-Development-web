import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Lock, LogOut } from 'lucide-react';

export const Route = createFileRoute('/admin')({});

type Tab = 'settings' | 'pricing' | 'features' | 'announcements' | 'server-info';

const TABS: Tab[] = ['settings', 'pricing', 'features', 'announcements', 'server-info'];
const TAB_LABELS: Record<Tab, string> = {
  settings: '⚙️ SETTINGS',
  pricing: '💰 PRICING',
  features: '🛠️ FEATURES',
  announcements: '📢 ANNOUNCE',
  'server-info': 'ℹ️ STATS',
};

export function Component() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [activeTab, setActiveTab] = useState<Tab>('settings');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
      loadData();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const result = await res.json();
        localStorage.setItem('admin_token', result.token);
        setToken(result.token);
        setAuthenticated(true);
        setPassword('');
      } else {
        setMessage('❌ WRONG!');
      }
    } catch (err) {
      setMessage('⚠️ ERROR!');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [settings, pricing, features, announcements, serverInfo] = await Promise.all([
        fetch(`/api/admin/settings`, { headers: { 'x-admin-token': token || '' } }).then(r => r.json()),
        fetch(`/api/admin/pricing`, { headers: { 'x-admin-token': token || '' } }).then(r => r.json()),
        fetch(`/api/admin/features`, { headers: { 'x-admin-token': token || '' } }).then(r => r.json()),
        fetch(`/api/admin/announcements`, { headers: { 'x-admin-token': token || '' } }).then(r => r.json()),
        fetch(`/api/admin/server-info`, { headers: { 'x-admin-token': token || '' } }).then(r => r.json()),
      ]);
      setData({ settings, pricing, features, announcements, serverInfo });
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setToken(null);
    localStorage.removeItem('admin_token');
    setData(null);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-red-950 to-gray-950 flex items-center justify-center px-2 py-4">
        <div className="bg-gray-900 border-6 border-red-700 p-4 max-w-sm w-full">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock size={28} className="text-red-400" />
            <h1 className="text-2xl font-bold text-red-400 pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)', fontSize: '16px' }}>🔐 ADMIN</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-red-300 font-bold mb-2 text-xs pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>PASSWORD:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-gray-800 border-4 border-red-700 text-white focus:outline-none focus:border-red-400 text-sm pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}
                disabled={loading}
              />
            </div>
            {message && <p className="text-red-400 text-xs font-bold pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-600 active:bg-red-800 text-white px-4 py-2 border-4 border-red-600 font-bold text-sm transition active:scale-95 pixelated disabled:opacity-50" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}
            >
              {loading ? '⏳' : '✓'} {loading ? 'LOGIN...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-amber-950 to-gray-950 py-3 px-2">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-amber-400 pixelated" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)', fontSize: '14px' }}>🔐 ADMIN PANEL</h1>
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-600 active:bg-red-800 text-white px-2 py-1 border-3 border-red-600 font-bold flex items-center gap-1 text-xs active:scale-95 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}
          >
            <LogOut size={14} /> OUT
          </button>
        </div>

        <div className="flex flex-wrap gap-1 mb-3 border-b-4 border-amber-700 pb-2">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 border-3 font-bold text-xs transition active:scale-95 pixelated ${
                activeTab === tab
                  ? 'bg-amber-700 text-white border-amber-600'
                  : 'bg-gray-800 text-amber-400 border-amber-700 hover:bg-amber-900'
              }`}
              style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 font-bold pixelated text-sm" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>⏳ LOADING...</div>
        ) : data ? (
          <div className="bg-gray-800 border-4 border-amber-700 p-2 space-y-2 max-h-96 overflow-y-auto">
            {activeTab === 'settings' && (
              <div className="space-y-2 text-xs">
                {Object.entries(data.settings).map(([key, value]: any) => (
                  <div key={key} className="bg-gray-700 border-2 border-amber-700 p-2">
                    <p className="font-bold text-amber-300 mb-1 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>{key}:</p>
                    <p className="text-gray-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>{value}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'pricing' && (
              <div className="space-y-2 text-xs">
                {data.pricing.map((tier: any) => (
                  <div key={tier.id} className="bg-gray-700 border-2 border-amber-700 p-2">
                    <p className="font-bold text-green-400 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>💰 {tier.name}</p>
                    <p className="text-amber-300 font-bold pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>{tier.price}</p>
                    <p className="text-gray-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>{tier.description}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'features' && (
              <div className="space-y-2 text-xs">
                {data.features.map((feature: any) => (
                  <div key={feature.id} className="bg-gray-700 border-2 border-amber-700 p-2">
                    <p className="font-bold text-green-400 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>🛠️ {feature.title}</p>
                    <p className="text-gray-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'announcements' && (
              <div className="space-y-2 text-xs">
                {data.announcements.map((ann: any) => (
                  <div key={ann.id} className={`border-2 p-2 ${
                    ann.active ? 'bg-yellow-900 border-yellow-700' : 'bg-gray-700 border-gray-600'
                  }`}>
                    <p className="font-bold text-yellow-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>📢 {ann.title}</p>
                    <p className="text-gray-300 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>{ann.content}</p>
                    <p className="text-xs mt-1 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>{ann.active ? '✓ ACTIVE' : '✗ OFF'}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'server-info' && (
              <div className="space-y-2 text-xs">
                {data.serverInfo.map((item: any) => (
                  <div key={item.id} className="bg-gray-700 border-2 border-amber-700 p-2">
                    <p className="font-bold text-green-400 pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>ℹ️ {item.label}</p>
                    <p className="text-green-300 font-bold text-lg pixelated" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}