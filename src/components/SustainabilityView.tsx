import React, { useState } from 'react';
import { Venue } from '../data/mockData';
import { Leaf, Recycle, Gauge, RefreshCw, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface SustainabilityViewProps {
  selectedVenue: Venue;
}

export const SustainabilityView: React.FC<SustainabilityViewProps> = ({ selectedVenue }) => {
  // Sorter simulation states
  const [conveyorSpeed, setConveyorSpeed] = useState<number>(1.2); // m/s
  const [sortersCount, setSortersCount] = useState<number>(8);

  // Waste breakdown data
  const diversionRate = parseFloat(selectedVenue.wasteDiversionRate);
  const landfillRate = 100 - diversionRate;

  const data = [
    { name: 'Diverted (Compost/Recycled)', value: diversionRate, color: '#2F8F5B' },
    { name: 'Sent to Landfill', value: landfillRate, color: '#D9483C' }
  ];

  return (
    <div className="w-full bg-[#12151a] p-5 border border-[#2e3748] rounded-xl flex flex-col gap-5 select-none">
      <div className="border-b border-[#2e3748] pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-display font-bold uppercase tracking-wider text-stadiumFloodlight">
            Sustainability & Zero-Waste Analytics
          </h3>
          <p className="text-[10px] font-mono text-zinc-400 uppercase">
            Resource recovery logs modeled on Mercedes-Benz Stadium 90%+ Diversion Room
          </p>
        </div>

        <div className="bg-stadiumTurf/10 border border-stadiumTurf/30 text-stadiumTurf px-3 py-1 rounded text-xs font-mono font-bold uppercase flex items-center gap-1.5 animate-pulse">
          <Recycle className="w-4 h-4" />
          <span>Diversion active: {selectedVenue.wasteDiversionRate}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Col: Diversion Chart */}
        <div className="lg:col-span-1 bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <h4 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest text-left border-b border-[#2e3748] pb-2 mb-2">
              Diversion Split
            </h4>

            {/* Recharts Pie Chart */}
            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#12151a', borderColor: '#2e3748', color: '#F5F7FA' }}
                    itemStyle={{ color: '#F5F7FA' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full space-y-1 text-left text-xs font-mono mt-2">
            <div className="flex justify-between">
              <span className="text-zinc-500">Recycled / Composted:</span>
              <span className="text-stadiumTurf font-bold">{diversionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Landfill Waste:</span>
              <span className="text-stadiumRed font-bold">{landfillRate}%</span>
            </div>
            <div className="flex justify-between border-t border-[#2e3748] pt-1 mt-1 text-[10px] text-zinc-400">
              <span>Primary source:</span>
              <span>On-site Sortation Booth</span>
            </div>
          </div>
        </div>

        {/* Right Col: Resource Recovery Room Controls */}
        <div className="lg:col-span-2 bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest flex items-center gap-1.5 border-b border-[#2e3748] pb-2 mb-3">
              <Gauge className="w-4 h-4" />
              Resource Sortation Room Telemetry
            </h4>

            <div className="space-y-4">
              {/* Slider Conveyor speed */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400 uppercase">Sort Belt Speed:</span>
                  <span className="text-stadiumCyan font-bold">{conveyorSpeed} m/s</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={conveyorSpeed}
                  onChange={(e) => setConveyorSpeed(parseFloat(e.target.value))}
                  className="w-full accent-stadiumCyan bg-[#12151a] h-2 rounded-lg cursor-pointer border border-[#2e3748]"
                  title="Conveyor belt speed controller"
                />
              </div>

              {/* Sorters Count */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400 uppercase">Active Sorting Personnel:</span>
                  <span className="text-stadiumCyan font-bold">{sortersCount} staff</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={sortersCount}
                  onChange={(e) => setSortersCount(parseInt(e.target.value))}
                  className="w-full accent-stadiumCyan bg-[#12151a] h-2 rounded-lg cursor-pointer border border-[#2e3748]"
                  title="Sorting staff capacity controller"
                />
              </div>

              {/* Dynamic Recovery Rate feedback */}
              <div className="bg-[#12151a] border border-[#2e3748] p-3 rounded-lg grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Sort Efficiency</span>
                  <span className="text-sm font-display font-bold text-stadiumFloodlight">
                    {Math.min(99.8, Math.round((sortersCount * 9.5) / (conveyorSpeed * 1.1) * 10) / 10)}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Capture Flow Rate</span>
                  <span className="text-sm font-display font-bold text-stadiumTurf">
                    {Math.round(sortersCount * 45 * conveyorSpeed)} kg / hr
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2e3748] pt-3 mt-4 text-[10px] font-mono text-zinc-500">
            *Mercedes-Benz Stadium zero-waste operations are powered by circular resource recovery processes.
          </div>
        </div>

      </div>
    </div>
  );
};
