import React from 'react';

interface ServerStatItem {
  id?: number;
  label: string;
  value: string;
  icon: string;
  sortOrder?: number;
}

interface ServerStatsProps {
  stats: ServerStatItem[];
}

const ICON_MAP: Record<string, string> = {
  clock: '🕐',
  server: '🖥️',
  puzzle: '🧩',
  heart: '❤️',
  diamond: '💎',
  fire: '🔥',
  book: '📚',
  star: '⭐',
  user: '👤',
  trophy: '🏆',
};

export const ServerStats: React.FC<ServerStatsProps> = ({ stats }) => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <h2 className="section-title">📊 Our Track Record</h2>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={stat.id || index} className="stat-card minecraft-block">
              <div className="stat-icon">{ICON_MAP[stat.icon] || '⛏️'}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 60px 20px;
          background: linear-gradient(180deg, rgba(26, 58, 13, 0.5) 0%, rgba(45, 80, 22, 0.5) 100%);
          border-top: 3px solid var(--mc-accent);
          border-bottom: 3px solid var(--mc-accent);
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 42px;
          text-align: center;
          margin-bottom: 50px;
          color: var(--mc-accent);
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
          letter-spacing: 2px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(51, 100, 50, 0.2) 100%);
          border: 2px solid var(--mc-stone);
          border-radius: 4px;
          padding: 30px 20px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          border-color: var(--mc-accent);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3),
                      0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .stat-icon {
          font-size: 48px;
          margin-bottom: 15px;
          display: block;
          filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.2));
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-icon {
          font-size: 56px;
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
        }

        .stat-value {
          font-size: 36px;
          font-weight: bold;
          color: var(--mc-diamond);
          margin: 10px 0;
          text-shadow: 0 0 10px rgba(51, 233, 255, 0.3);
        }

        .stat-label {
          font-size: 14px;
          color: var(--mc-light);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 10px 0 0 0;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 32px;
            margin-bottom: 40px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .stat-card {
            padding: 20px 15px;
          }

          .stat-icon {
            font-size: 40px;
          }

          .stat-value {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default ServerStats;
