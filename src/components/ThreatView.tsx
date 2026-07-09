import React from 'react';
import { Venue, CYBER_THREATS } from '../data/mockData';
import { ShieldAlert, AlertOctagon, RefreshCw } from 'lucide-react';

interface ThreatViewProps {
  selectedVenue: Venue;
}

export const ThreatView: React.FC<ThreatViewProps> = ({ selectedVenue }) => {
  // Get color based on risk score
  const getRiskColor = (score: number) => {
    if (score >= 75) return '#D9483C'; // Red
    if (score >= 60) return '#E8A93D'; // Amber
    return '#2F8F5B'; // Turf Green
  };

  return (
    <div className="w-full bg-[#12151a] p-5 border border-[#2e3748] rounded-xl flex flex-col gap-5 select-none">
      <div className="border-b border-[#2e3748] pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-display font-bold uppercase tracking-wider text-stadiumFloodlight">
            Operational Intelligence & Threat Matrix
          </h3>
          <p className="text-[10px] font-mono text-zinc-400 uppercase">
            Real-time cybersecurity vectors & venue-specific physical threat assessments
          </p>
        </div>

        <button 
          onClick={() => {}}
          className="flex items-center gap-1.5 bg-[#1b1f28] hover:bg-[#202734] border border-[#2e3748] text-xs font-mono text-stadiumCyan px-3 py-1.5 rounded-lg cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>RE-POLL SECTOR NET</span>
        </button>
      </div>

      {/* Main Grid: Azteca Scorecard & Cybersecurity matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Col: Venue Threat Scorecard (Azteca Focus) */}
        <div className="lg:col-span-1 bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-stadiumCyan uppercase">Risk Scorecard</span>
              <span className="text-[9px] font-mono text-zinc-500">ID: TWIN-V-{selectedVenue.id.toUpperCase()}</span>
            </div>

            <h4 className="text-xl font-display font-bold text-stadiumFloodlight uppercase">
              {selectedVenue.name}
            </h4>
            <p className="text-xs font-mono text-zinc-400 uppercase">
              Profile Assessment
            </p>

            {/* Circular Gauge */}
            <div className="my-5 flex flex-col items-center justify-center relative">
              <svg viewBox="0 0 120 120" className="w-32 h-32">
                {/* Background Ring */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="#2e3748" strokeWidth="8" />
                {/* Foreground Arc */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke={getRiskColor(selectedVenue.cyberRiskScore)} 
                  strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - selectedVenue.cyberRiskScore / 100)}`}
                  transform="rotate(-90 60 60)"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-display font-bold text-stadiumFloodlight leading-none">
                  {selectedVenue.cyberRiskScore}
                </span>
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                  Risk Rating
                </span>
              </div>
            </div>

            {/* Risk details */}
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 uppercase">Risk Tier:</span>
                <span 
                  className="font-bold uppercase"
                  style={{ color: getRiskColor(selectedVenue.cyberRiskScore) }}
                >
                  {selectedVenue.cyberRiskScore >= 75 ? 'HIGH RISK TIER' : selectedVenue.cyberRiskScore >= 60 ? 'MEDIUM RISK TIER' : 'LOW RISK TIER'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono border-t border-[#2e3748] pt-2">
                <span className="text-zinc-500 uppercase">Peak Threat Window:</span>
                <span className="text-stadiumFloodlight font-bold">
                  {selectedVenue.peakIncidentWindow}
                </span>
              </div>

              <div className="border-t border-[#2e3748] pt-2 mt-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                  Dominant Incident Categories:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVenue.dominantIncidents.map((incident, idx) => (
                    <span 
                      key={idx}
                      className="bg-stadiumRed/10 border border-stadiumRed/30 text-stadiumRed text-[9px] font-mono px-2 py-0.5 rounded uppercase"
                    >
                      {incident}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 bg-stadiumRed/15 border border-stadiumRed/30 rounded-lg text-[9px] font-mono text-stadiumRed flex gap-1.5 items-start">
            <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
            <span>CAUTION: CROWD DENSITY AND EGRESS TIMELINES OVERLAP THE WINDOW OF ORGANIZED INCIDENTS.</span>
          </div>
        </div>

        {/* Right Col: Cybersecurity threat matrix table */}
        <div className="lg:col-span-2 bg-[#1b1f28] border border-[#2e3748] rounded-xl overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-3 bg-[#12151a] border-b border-[#2e3748] flex justify-between items-center">
              <h4 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Cybersecurity Threat Matrix
              </h4>
              <span className="text-[8px] font-mono bg-stadiumRed/15 text-stadiumRed px-2 py-0.5 rounded border border-stadiumRed/30">
                THREAT STAGE ACTIVE
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-[#12151a]/40 border-b border-[#2e3748] text-zinc-500 uppercase text-[10px]">
                    <th className="p-3">Threat Vector</th>
                    <th className="p-3">Actor Class</th>
                    <th className="p-3">Target Surface</th>
                    <th className="p-3 text-right">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2e3748]">
                  {CYBER_THREATS.map((t, idx) => (
                    <tr key={idx} className="hover:bg-[#12151a]/20 transition-colors">
                      <td className="p-3 font-semibold text-stadiumFloodlight">{t.vector}</td>
                      <td className="p-3 text-zinc-400">{t.actorClass}</td>
                      <td className="p-3 text-zinc-400">{t.targetSurface}</td>
                      <td className="p-3 text-right">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                          style={{
                            backgroundColor: t.severity === 'High' ? '#D9483C22' : t.severity === 'Medium' ? '#E8A93D22' : '#2F8F5B22',
                            color: t.severity === 'High' ? '#D9483C' : t.severity === 'Medium' ? '#E8A93D' : '#2F8F5B',
                            border: `1px solid ${t.severity === 'High' ? '#D9483C44' : t.severity === 'Medium' ? '#E8A93D44' : '#2F8F5B44'}`
                          }}
                        >
                          {t.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-[#12151a] border-t border-[#2e3748] text-[9px] font-mono text-zinc-500 text-center">
            *Cyber threat matrices are populated via secure REST APIs with regional intelligence nodes.
          </div>
        </div>

      </div>
    </div>
  );
};
