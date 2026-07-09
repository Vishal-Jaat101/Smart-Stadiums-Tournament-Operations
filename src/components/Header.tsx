import React, { useState, useEffect } from 'react';
import { Shield, Eye, Accessibility, Clock, Sun, Moon } from 'lucide-react';
import { VENUES, Venue } from '../data/mockData';

interface HeaderProps {
  selectedVenue: Venue;
  setSelectedVenue: (venue: Venue) => void;
  accessibilityMode: boolean;
  setAccessibilityMode: (mode: boolean) => void;
  accessibleRouting: boolean;
  setAccessibleRouting: (routing: boolean) => void;
  themeMode: 'dark' | 'light';
  setThemeMode: (theme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedVenue,
  setSelectedVenue,
  accessibilityMode,
  setAccessibilityMode,
  accessibleRouting,
  setAccessibleRouting,
  themeMode,
  setThemeMode
}) => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVenueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const venue = VENUES.find(v => v.id === e.target.value);
    if (venue) setSelectedVenue(venue);
  };

  return (
    <header className="w-full bg-[#1b1f28] border-b border-[#2e3748] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-20">
      {/* Title & Brand */}
      <div className="flex items-center gap-3">
        <div className="bg-stadiumRed p-2 rounded-lg text-stadiumFloodlight flex items-center justify-center">
          <Shield className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-stadiumFloodlight uppercase leading-none">
            CONCOURSE
          </h1>
          <p className="text-xs font-mono text-stadiumCyan tracking-widest uppercase">
            2026 FIFA World Cup • Stadium Command Center
          </p>
        </div>
      </div>

      {/* Venue Info Banner & Selector */}
      <div className="flex items-center gap-3 bg-[#12151a] border border-[#2e3748] px-4 py-2 rounded-xl w-full md:w-auto">
        <label htmlFor="venue-picker" className="text-xs font-mono text-stadiumCyan uppercase whitespace-nowrap">
          Twin Node:
        </label>
        <select
          id="venue-picker"
          value={selectedVenue.id}
          onChange={handleVenueChange}
          className="bg-transparent text-sm font-display font-semibold text-stadiumFloodlight focus:outline-none cursor-pointer uppercase tracking-wide border-0 py-0 pr-8"
        >
          {VENUES.map(v => (
            <option key={v.id} value={v.id} className="bg-stadiumCharcoal text-stadiumFloodlight uppercase">
              {v.name} ({v.location})
            </option>
          ))}
        </select>
        {selectedVenue.altitude && (
          <span className="hidden lg:inline bg-stadiumRed/20 text-stadiumRed text-[10px] font-mono px-2 py-0.5 rounded border border-stadiumRed/40 uppercase">
            {selectedVenue.altitude}
          </span>
        )}
      </div>

      {/* Accessibilities, Digital Clock & System Controls */}
      <div className="flex items-center flex-wrap gap-4 justify-between w-full md:w-auto">
        {/* Clock */}
        <div className="flex items-center gap-2 text-stadiumFloodlight font-mono text-sm bg-[#12151a] px-3 py-1.5 rounded-lg border border-[#2e3748]">
          <Clock className="w-4 h-4 text-stadiumCyan" />
          <span>{time}</span>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-2">
          {/* Light/Dark Mode Toggle */}
          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-mono bg-[#12151a] border-[#2e3748] text-zinc-400 hover:text-stadiumFloodlight cursor-pointer"
            title="Toggle Light / Dark Theme"
            aria-label="Toggle light dark theme"
          >
            {themeMode === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-stadiumAmber" />
                <span className="hidden sm:inline">LIGHT MODE</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-stadiumCyan" />
                <span className="hidden sm:inline">DARK MODE</span>
              </>
            )}
          </button>

          {/* Accessible Routing Toggle */}
          <button
            onClick={() => setAccessibleRouting(!accessibleRouting)}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-mono ${
              accessibleRouting
                ? 'bg-stadiumCyan/20 border-stadiumCyan text-stadiumCyan font-bold'
                : 'bg-[#12151a] border-[#2e3748] text-zinc-400 hover:text-stadiumFloodlight'
            }`}
            title="Toggle Accessibility Wayfinding Routes (Ramps & Elevators)"
            aria-label="Toggle accessible routing mode"
          >
            <Accessibility className="w-4 h-4" />
            <span className="hidden sm:inline">ACC ROUTING</span>
          </button>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={() => setAccessibilityMode(!accessibilityMode)}
            aria-pressed={accessibilityMode}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-mono ${
              accessibilityMode
                ? 'bg-stadiumAmber text-stadiumCharcoal border-stadiumAmber font-bold shadow-md ring-2 ring-stadiumAmber'
                : 'bg-[#12151a] border-[#2e3748] text-zinc-400 hover:text-stadiumFloodlight'
            }`}
            title="Toggle Accessibility High Contrast Mode"
            aria-label="Toggle high contrast accessibility mode"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">HIGH CONTRAST</span>
          </button>
        </div>
      </div>
    </header>
  );
};
