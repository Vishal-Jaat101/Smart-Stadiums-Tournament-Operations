import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { HelpCircle, Shield, Play } from 'lucide-react';

interface ScenarioViewProps {
  oddsSkew: number;
  setOddsSkew: (val: number) => void;
  weatherSeverity: number;
  setWeatherSeverity: (val: number) => void;
  transitDelay: number;
  setTransitDelay: (val: number) => void;
  prePositionSecurity: (sector: string) => void;
}

export const ScenarioView: React.FC<ScenarioViewProps> = ({
  oddsSkew,
  setOddsSkew,
  weatherSeverity,
  setWeatherSeverity,
  transitDelay,
  setTransitDelay,
  prePositionSecurity
}) => {
  
  // Calculate simulated probability data based on sliders
  const calculateData = () => {
    // Generate a distribution centered around Gates C and D (the natural bottlenecks)
    const baseVariance = (oddsSkew / 10) + (weatherSeverity / 15) + (transitDelay / 8);
    return [
      { gate: 'Gate A', probability: Math.max(5, Math.round(15 + baseVariance * 0.4)) },
      { gate: 'Gate B', probability: Math.max(10, Math.round(35 + baseVariance * 0.8)) },
      { gate: 'Gate C', probability: Math.min(99, Math.round(65 + baseVariance * 1.5)) },
      { gate: 'Gate D', probability: Math.min(95, Math.round(55 + baseVariance * 1.3)) },
      { gate: 'Gate E', probability: Math.max(8, Math.round(25 + baseVariance * 0.6)) },
      { gate: 'Gate F', probability: Math.max(5, Math.round(15 + baseVariance * 0.3)) },
    ];
  };

  const chartData = calculateData();
  const maxProbabilityItem = chartData.reduce((prev, current) => (prev.probability > current.probability) ? current : prev);

  return (
    <div className="w-full bg-[#12151a] p-5 border border-[#2e3748] rounded-xl flex flex-col gap-5 select-none">
      <div className="border-b border-[#2e3748] pb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-display font-bold uppercase tracking-wider text-stadiumFloodlight">
            Monte Carlo Scenario Explorer
          </h3>
          <p className="text-[10px] font-mono text-zinc-400 uppercase">
            Run 10,000 simulated tournament egress scenarios to predict crowd congestions
          </p>
        </div>

        <span className="text-[10px] font-mono bg-stadiumCyan/15 border border-stadiumCyan/30 text-stadiumCyan px-2 py-0.5 rounded font-bold uppercase">
          10,000 RUNS COMPLETE
        </span>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Col: Sliders Control Panel */}
        <div className="lg:col-span-1 bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl space-y-4">
          <h4 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest border-b border-[#2e3748] pb-2">
            Sim Parameters
          </h4>

          {/* Slider 1: Odds Skew */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400 uppercase">Score Odds Skew:</span>
              <span className="text-stadiumFloodlight font-bold">{oddsSkew}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={oddsSkew}
              onChange={(e) => setOddsSkew(parseInt(e.target.value))}
              className="w-full accent-stadiumCyan bg-[#12151a] h-1.5 rounded-lg cursor-pointer"
              title="Odds skew slider"
            />
            <span className="text-[8px] font-mono text-zinc-500 uppercase block mt-1">
              Balanced Match &lt;-&gt; Heavy Landslide Outcome
            </span>
          </div>

          {/* Slider 2: Weather severity */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400 uppercase">Weather Severity:</span>
              <span className="text-stadiumFloodlight font-bold">{weatherSeverity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={weatherSeverity}
              onChange={(e) => setWeatherSeverity(parseInt(e.target.value))}
              className="w-full accent-stadiumCyan bg-[#12151a] h-1.5 rounded-lg cursor-pointer"
              title="Weather severity slider"
            />
            <span className="text-[8px] font-mono text-zinc-500 uppercase block mt-1">
              Clear Skies &lt;-&gt; Torrential Rain/Severe Heat
            </span>
          </div>

          {/* Slider 3: Transit delay */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400 uppercase">Transit Disruption %:</span>
              <span className="text-stadiumFloodlight font-bold">{transitDelay}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={transitDelay}
              onChange={(e) => setTransitDelay(parseInt(e.target.value))}
              className="w-full accent-stadiumCyan bg-[#12151a] h-1.5 rounded-lg cursor-pointer"
              title="Transit delay slider"
            />
            <span className="text-[8px] font-mono text-zinc-500 uppercase block mt-1">
              Optimal Rail Schedules &lt;-&gt; Rail Delays / Outages
            </span>
          </div>
        </div>

        {/* Right Col: Monte Carlo Chart & Pre-positioning Actions */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Chart Display */}
          <div className="bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl">
            <h4 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest mb-3">
              Bottleneck Probability Distribution
            </h4>
            
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3FA9D6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3FA9D6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="gate" stroke="#a1a1aa" fontSize={10} tickLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={10} domain={[0, 100]} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#12151a', borderColor: '#2e3748', color: '#F5F7FA' }}
                    itemStyle={{ color: '#F5F7FA' }}
                  />
                  <Area type="monotone" dataKey="probability" stroke="#3FA9D6" strokeWidth={2} fillOpacity={1} fill="url(#probGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pre-positioning dynamic checklist */}
          <div className="bg-[#1b1f28] border border-[#2e3748] p-4 rounded-xl flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 border-b border-[#2e3748] pb-2">
              <div>
                <h4 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest">
                  AI Recommended Pre-Positioning
                </h4>
                <p className="text-[8px] font-mono text-zinc-400 uppercase">
                  Deploy personnel before bottleneck forms
                </p>
              </div>
              <span className="text-[10px] font-mono text-stadiumRed uppercase font-bold animate-pulse">
                Hotspot: {maxProbabilityItem.gate} ({maxProbabilityItem.probability}%)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="flex items-center justify-between bg-[#12151a] p-2.5 rounded-lg border border-[#2e3748]">
                <span>Deploy medical to Sec 120-130</span>
                <button
                  onClick={() => prePositionSecurity('Sec 120-130 (Gate C)')}
                  className="bg-stadiumCyan hover:bg-stadiumCyan/95 text-stadiumCharcoal font-display font-semibold uppercase px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer"
                >
                  Deploy
                </button>
              </div>

              <div className="flex items-center justify-between bg-[#12151a] p-2.5 rounded-lg border border-[#2e3748]">
                <span>Pre-position security to {maxProbabilityItem.gate}</span>
                <button
                  onClick={() => prePositionSecurity(`${maxProbabilityItem.gate} Area`)}
                  className="bg-stadiumCyan hover:bg-stadiumCyan/95 text-stadiumCharcoal font-display font-semibold uppercase px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer"
                >
                  Deploy
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
