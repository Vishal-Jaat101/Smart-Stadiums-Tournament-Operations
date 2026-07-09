import React from 'react';
import { Users, Truck, ShieldAlert, Leaf, BarChart3 } from 'lucide-react';

interface ScoreboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ScoreboardTabs: React.FC<ScoreboardTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'crowd', name: 'Crowd Flow', icon: Users },
    { id: 'transit', name: 'Transit & Logistics', icon: Truck },
    { id: 'threat', name: 'Threat Matrix', icon: ShieldAlert },
    { id: 'sustainability', name: 'Sustainability', icon: Leaf },
    { id: 'scenario', name: 'Monte Carlo', icon: BarChart3 },
  ];

  return (
    <nav className="w-full bg-[#1b1f28] border border-[#2e3748] rounded-xl p-1.5 flex flex-wrap md:flex-nowrap gap-1 select-none" aria-label="Command Center Modules">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2.5 font-display font-semibold uppercase tracking-wider text-xs md:text-sm transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-stadiumCyan text-stadiumCharcoal font-bold shadow-lg shadow-stadiumCyan/15 transform scale-[1.01]'
                : 'text-zinc-400 hover:text-stadiumFloodlight bg-[#12151a] border border-transparent hover:border-[#2e3748]'
            }`}
            aria-selected={isActive}
            role="tab"
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-stadiumCharcoal' : 'text-stadiumCyan'}`} />
            <span>{tab.name}</span>
          </button>
        );
      })}
    </nav>
  );
};
