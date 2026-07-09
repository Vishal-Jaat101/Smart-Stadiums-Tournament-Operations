import React, { useState, useEffect } from 'react';
import { AlertCircle, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Venue } from '../data/mockData';

interface AlertTickerProps {
  selectedVenue: Venue;
}

export const AlertTicker: React.FC<AlertTickerProps> = ({ selectedVenue }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const alerts = [
    { 
      text: `WEATHER WATCH: ${selectedVenue.weatherDetails} • PHYSIOLOGICAL DENSITY RISK: ${selectedVenue.environmentalRisk}`, 
      color: 'text-stadiumAmber',
      icon: AlertTriangle
    },
    { 
      text: `HOST NODE ACTIVE: ${selectedVenue.location.toUpperCase()} (${selectedVenue.capacity.toLocaleString()} SEATS)`, 
      color: 'text-stadiumCyan',
      icon: AlertCircle
    },
    { 
      text: `CYBER THREAT PROFILE ACTIVE: BASE RISK INDEX ${selectedVenue.cyberRiskScore} (PEAK WINDOW: ${selectedVenue.peakIncidentWindow})`, 
      color: 'text-stadiumRed',
      icon: ShieldAlert
    },
    { 
      text: `SUSTAINABILITY METRIC: ${selectedVenue.name} DIVERTING ${selectedVenue.wasteDiversionRate} WASTE FROM LANDFILL`, 
      color: 'text-stadiumTurf',
      icon: AlertCircle
    }
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % alerts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [alerts.length]);

  return (
    <div className="w-full bg-stadiumCharcoal border-t-2 border-stadiumRed py-2.5 px-4 overflow-hidden relative z-10 flex items-center select-none" role="region" aria-label="System Alert Ribbon">
      {/* Ticker title */}
      <div className="bg-stadiumRed text-stadiumFloodlight px-2.5 py-0.5 rounded font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 z-20 shadow-md">
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>LED OP TICKER:</span>
      </div>

      {/* Scrolling Text container */}
      <div className="w-full overflow-hidden flex items-center pl-4 relative h-5">
        {prefersReducedMotion ? (
          <div className="flex items-center gap-2 text-xs font-mono tracking-wide uppercase transition-opacity duration-500 ease-in-out">
            {React.createElement(alerts[activeIndex].icon, { className: `w-3.5 h-3.5 shrink-0 ${alerts[activeIndex].color}` })}
            <span className={alerts[activeIndex].color}>
              {alerts[activeIndex].text}
            </span>
          </div>
        ) : (
          <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-mono text-stadiumFloodlight tracking-wide uppercase">
            {/* Scroll items repeated twice for seamless looping */}
            {alerts.map((a, i) => (
              <span key={`first-${i}`} className={`flex items-center gap-2 ${a.color}`}>
                {React.createElement(a.icon, { className: "w-3.5 h-3.5 shrink-0" })}
                {a.text}
              </span>
            ))}
            {alerts.map((a, i) => (
              <span key={`second-${i}`} className={`flex items-center gap-2 ${a.color}`}>
                {React.createElement(a.icon, { className: "w-3.5 h-3.5 shrink-0" })}
                {a.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
