import React from 'react';
import { TransitLine } from '../data/mockData';
import { Truck, Train, Compass, Plus, Minus, CheckCircle } from 'lucide-react';

interface TransitViewProps {
  transitLines: TransitLine[];
  setTransitLines: React.Dispatch<React.SetStateAction<TransitLine[]>>;
  freightQueueCount: number;
  setFreightQueueCount: (count: number) => void;
  addAgentLog: (type: 'LLM' | 'Workflow' | 'Custom', name: string, message: string, status?: 'idle' | 'thinking' | 'success' | 'alert') => void;
}

export const TransitView: React.FC<TransitViewProps> = ({
  transitLines,
  setTransitLines,
  freightQueueCount,
  setFreightQueueCount,
  addAgentLog
}) => {
  // Simulate dispatching a transit shuttle bus
  const dispatchShuttleBus = (lineId: string) => {
    const targetLine = transitLines.find(l => l.id === lineId);
    if (!targetLine) return;

    addAgentLog('Workflow', 'Transit Coordinator', `Dispatching emergency backup shuttle to relieve load on ${targetLine.name}`, 'thinking');
    
    setTimeout(() => {
      addAgentLog('Custom', 'Bus Dispatch Tool', `Backup bus arrived at ${targetLine.name}. Reducing passenger load.`, 'success');
      
      setTransitLines(prev => prev.map(line => {
        if (line.id === lineId) {
          return {
            ...line,
            load: Math.max(1000, line.load - 1200),
            status: 'normal',
            etaMinutes: 1
          };
        }
        return line;
      }));
    }, 1500);
  };

  return (
    <div className="w-full bg-[#12151a] p-5 border border-[#2e3748] rounded-xl flex flex-col gap-5 select-none">
      <div className="border-b border-[#2e3748] pb-4">
        <h3 className="text-sm font-display font-bold uppercase tracking-wider text-stadiumFloodlight">
          Transit Capacity & Freight Logistics
        </h3>
        <p className="text-[10px] font-mono text-zinc-400 uppercase">
          Coordinating rapid-egress trains, rideshare queues, and logistics truck bays
        </p>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Col: Transit Lines Loads */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest flex items-center gap-1.5">
            <Train className="w-4 h-4" />
            Active Transit Corridor Matrix
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transitLines.map(line => {
              const loadPercent = Math.min(100, Math.round((line.load / line.capacity) * 100));
              const isOverloaded = line.status === 'overloaded' || loadPercent >= 100;

              return (
                <div key={line.id} className="bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-display font-bold text-stadiumFloodlight uppercase">
                        {line.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        ETA: {line.etaMinutes} MIN
                      </span>
                    </div>

                    {/* Progress Bar Load */}
                    <div className="space-y-1 mt-2">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-500 uppercase">Cap load: {line.load}/{line.capacity}</span>
                        <span className={`font-bold ${isOverloaded ? 'text-stadiumRed' : 'text-stadiumTurf'}`}>{loadPercent}%</span>
                      </div>
                      <div className="w-full bg-[#12151a] h-2 rounded-full overflow-hidden border border-[#2e3748]">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${loadPercent}%`,
                            backgroundColor: isOverloaded ? '#D9483C' : loadPercent > 80 ? '#E8A93D' : '#2F8F5B'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#2e3748] pt-2">
                    <span 
                      className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                        isOverloaded 
                          ? 'bg-stadiumRed/20 text-stadiumRed border border-stadiumRed/30' 
                          : 'bg-stadiumTurf/20 text-stadiumTurf border border-stadiumTurf/30'
                      }`}
                    >
                      {line.status}
                    </span>

                    <button
                      onClick={() => dispatchShuttleBus(line.id)}
                      className="bg-stadiumCyan/15 hover:bg-stadiumCyan/30 border border-stadiumCyan/40 text-stadiumCyan font-display font-semibold uppercase text-[10px] px-2.5 py-1 rounded transition-colors cursor-pointer"
                    >
                      Inject Shuttle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Logistics / Freight Truck Staging */}
        <div className="lg:col-span-1 bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest flex items-center gap-1.5 border-b border-[#2e3748] pb-2 mb-3">
              <Truck className="w-4 h-4" />
              Freight & Delivery Staging
            </h4>

            <div className="space-y-4">
              {/* Staging Bays */}
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                  Active Staging Yards (Staging Bay E)
                </span>
                <div className="flex items-center justify-between bg-[#12151a] border border-[#2e3748] p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-stadiumAmber animate-pulse" />
                    <span className="text-xs font-mono font-bold text-stadiumFloodlight">14 TRUCKS REGISTERED</span>
                  </div>
                  <span className="text-[9px] font-mono text-stadiumAmber uppercase font-bold">Queue Backlog</span>
                </div>
              </div>

              {/* Adjust queue count controls */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Modify Queue:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setFreightQueueCount(Math.max(0, freightQueueCount - 1))}
                    className="p-1 rounded bg-[#12151a] border border-[#2e3748] text-zinc-300 hover:text-stadiumFloodlight cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold px-2.5 text-stadiumFloodlight">{freightQueueCount}</span>
                  <button
                    onClick={() => {
                      setFreightQueueCount(freightQueueCount + 1);
                      if (freightQueueCount + 1 >= 18) {
                        addAgentLog('LLM', 'Logistics Optimizer', 'Warning: Freight staging queue exceeding capacity threshold. Dispatching rerouting directions to incoming trucks.', 'alert');
                      }
                    }}
                    className="p-1 rounded bg-[#12151a] border border-[#2e3748] text-zinc-300 hover:text-stadiumFloodlight cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Staging status readout */}
              <div className="bg-[#12151a] p-3 rounded-lg border border-[#2e3748] space-y-1 text-[10px] font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Bay A, B, C:</span>
                  <span className="text-stadiumTurf font-bold uppercase">Nominal / Empty</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Bay D (Broadcasting):</span>
                  <span className="text-stadiumTurf font-bold uppercase flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Locked
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Bay E (Tournament Supplies):</span>
                  <span className={freightQueueCount >= 18 ? 'text-stadiumRed font-bold animate-pulse' : 'text-stadiumAmber font-bold'}>
                    {freightQueueCount >= 18 ? 'CRITICAL GRIDLOCK' : 'Caution (Heavy)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2e3748] pt-3 mt-4 text-[10px] font-mono text-zinc-500">
            *Broadcasting satellite staging areas are synchronized with FIFA central logistics logs.
          </div>
        </div>

      </div>
    </div>
  );
};
