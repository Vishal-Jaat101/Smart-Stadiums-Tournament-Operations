import React from 'react';
import { GateStatus, Venue } from '../data/mockData';
import { AlertCircle, ToggleLeft, ToggleRight, ArrowUpRight, ArrowDownLeft, ShieldAlert } from 'lucide-react';

interface CrowdViewProps {
  selectedVenue: Venue;
  gateList: GateStatus[];
  toggleGate: (gateId: string) => void;
  triggerSimulationBottleneck: () => void;
  isEgressMode: boolean;
  setIsEgressMode: (mode: boolean) => void;
  selectedGateId: string | null;
  setSelectedGateId: (id: string | null) => void;
}

export const CrowdView: React.FC<CrowdViewProps> = ({
  selectedVenue,
  gateList,
  toggleGate,
  triggerSimulationBottleneck,
  isEgressMode,
  setIsEgressMode,
  selectedGateId,
  setSelectedGateId
}) => {
  const activeGate = gateList.find(g => g.id === selectedGateId);

  return (
    <div className="w-full bg-[#12151a] p-5 border border-[#2e3748] rounded-xl flex flex-col gap-5 select-none">
      {/* Simulation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#2e3748] pb-4">
        <div>
          <h3 className="text-sm font-display font-bold uppercase tracking-wider text-stadiumFloodlight">
            Crowd Dynamics Controls
          </h3>
          <p className="text-[10px] font-mono text-zinc-400 uppercase">
            Toggle global flow variables & test edge scenarios
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Flow state toggle */}
          <button
            onClick={() => setIsEgressMode(!isEgressMode)}
            className="flex items-center gap-2 bg-[#1b1f28] border border-[#2e3748] px-3.5 py-1.5 rounded-lg text-xs font-mono text-stadiumFloodlight"
          >
            <span>Flow Phase:</span>
            {isEgressMode ? (
              <span className="text-stadiumRed font-bold flex items-center gap-1">
                EGRESS (EXIT) <ArrowDownLeft className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="text-stadiumTurf font-bold flex items-center gap-1">
                INGRESS (ENTER) <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            )}
          </button>

          {/* Trigger Alert simulation */}
          <button
            onClick={triggerSimulationBottleneck}
            className="bg-stadiumRed/20 hover:bg-stadiumRed/35 border border-stadiumRed text-stadiumFloodlight font-display font-semibold uppercase px-4 py-1.5 rounded-lg text-xs tracking-wider transition-colors cursor-pointer"
          >
            Trigger Bottleneck
          </button>
        </div>
      </div>

      {/* Grid: Selected Gate Control Detail & Gates Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Col: Selected Gate Detailed Control */}
        <div className="lg:col-span-1 bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-stadiumCyan uppercase">Gate Controller</span>
              {activeGate?.isClosed && (
                <span className="bg-stadiumRed/20 text-stadiumRed border border-stadiumRed/40 text-[9px] px-2 py-0.5 rounded font-mono uppercase font-bold animate-pulse">
                  Force Closed
                </span>
              )}
            </div>

            <h4 className="text-2xl font-display font-bold text-stadiumFloodlight uppercase">
              {activeGate ? activeGate.name : 'Select a Gate'}
            </h4>
            <p className="text-xs font-mono text-zinc-400 uppercase">
              Associated Section: {activeGate?.section}
            </p>

            {activeGate ? (
              <div className="mt-4 space-y-2.5">
                {/* Density Bar */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-zinc-500 uppercase">Zone Density:</span>
                    <span className="font-bold text-stadiumFloodlight">{activeGate.occupancy}%</span>
                  </div>
                  <div className="w-full bg-[#12151a] h-2.5 rounded-full overflow-hidden border border-[#2e3748]">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${activeGate.occupancy}%`,
                        backgroundColor: activeGate.isClosed ? '#D9483C' : activeGate.occupancy > 90 ? '#D9483C' : activeGate.occupancy > 75 ? '#E8A93D' : '#2F8F5B'
                      }}
                    />
                  </div>
                </div>

                {/* Flow Speed Rate */}
                <div className="flex items-center justify-between text-xs font-mono border-t border-[#2e3748] pt-2 mt-2">
                  <span className="text-zinc-500 uppercase">Flow Rate:</span>
                  <span className="text-stadiumFloodlight font-bold">
                    {activeGate.isClosed ? 0 : isEgressMode ? activeGate.ingressRate * 1.2 : activeGate.ingressRate} fans / min
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-500 mt-4">
                Click a sector on the stadium bowl visualization to load its real-time telemetry and access crowd-override gates.
              </p>
            )}
          </div>

          {activeGate && (
            <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-[#2e3748]">
              <button
                onClick={() => toggleGate(activeGate.id)}
                className={`w-full py-2 rounded-lg font-display font-semibold uppercase text-xs tracking-wider transition-colors cursor-pointer text-center ${
                  activeGate.isClosed
                    ? 'bg-stadiumTurf hover:bg-stadiumTurf/85 text-stadiumFloodlight'
                    : 'bg-stadiumRed/90 hover:bg-stadiumRed text-stadiumFloodlight'
                }`}
              >
                {activeGate.isClosed ? 'Open Gate (Clear Redirect)' : 'Close Gate (Force Redirect)'}
              </button>
            </div>
          )}
        </div>

        {/* Right Col: Gates Summary Overview Table */}
        <div className="lg:col-span-2 bg-[#1b1f28] border border-[#2e3748] rounded-xl overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-[#12151a] border-b border-[#2e3748] text-stadiumCyan uppercase">
                  <th className="p-3">Gate</th>
                  <th className="p-3">Sectors</th>
                  <th className="p-3">Density</th>
                  <th className="p-3">Flow Rate</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2e3748]">
                {gateList.map((g) => {
                  const isSelected = selectedGateId === g.id;
                  return (
                    <tr 
                      key={g.id}
                      onClick={() => setSelectedGateId(g.id)}
                      className={`hover:bg-[#12151a]/40 cursor-pointer transition-colors ${
                        isSelected ? 'bg-stadiumCyan/10 border-l-2 border-stadiumCyan' : ''
                      }`}
                    >
                      <td className="p-3 font-display font-bold uppercase">{g.name}</td>
                      <td className="p-3 text-zinc-400">{g.section}</td>
                      <td className="p-3 font-semibold text-stadiumFloodlight">{g.isClosed ? 'N/A' : `${g.occupancy}%`}</td>
                      <td className="p-3">{g.isClosed ? '0 / min' : `${g.ingressRate} / min`}</td>
                      <td className="p-3">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                          style={{
                            backgroundColor: g.isClosed ? '#D9483C22' : g.status === 'critical' ? '#D9483C22' : g.status === 'warning' ? '#E8A93D22' : '#2F8F5B22',
                            color: g.isClosed ? '#D9483C' : g.status === 'critical' ? '#D9483C' : g.status === 'warning' ? '#E8A93D' : '#2F8F5B',
                            border: `1px solid ${g.isClosed ? '#D9483C44' : g.status === 'critical' ? '#D9483C44' : g.status === 'warning' ? '#E8A93D44' : '#2F8F5B44'}`
                          }}
                        >
                          {g.isClosed ? 'CLOSED' : g.status}
                        </span>
                      </td>
                      <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleGate(g.id)}
                          className="text-[10px] font-mono text-stadiumCyan hover:underline uppercase"
                        >
                          {g.isClosed ? 'Reopen' : 'Close'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* AI Pre-positioned alerts */}
          {gateList.some(g => g.status === 'critical') && (
            <div className="p-3 bg-stadiumRed/10 border-t border-stadiumRed/30 flex items-center gap-2 text-stadiumRed text-[10px] font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0 animate-bounce" />
              <span>AI PREDICTIVE CRITIQUE: GATE C DENSITY OVERLOADED. REDIRECT PATTERN TRIGGERED.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
