import React from 'react';
import { GateStatus } from '../data/mockData';
import { AlertCircle, Accessibility, Compass } from 'lucide-react';

interface StadiumBowlProps {
  gateList: GateStatus[];
  selectedGateId: string | null;
  setSelectedGateId: (id: string | null) => void;
  accessibleRouting: boolean;
  activeTab: string;
}

export const StadiumBowl: React.FC<StadiumBowlProps> = ({
  gateList,
  selectedGateId,
  setSelectedGateId,
  accessibleRouting,
  activeTab
}) => {
  // SVG Center point
  const CX = 250;
  const CY = 250;
  const R_INNER = 85;
  const R_OUTER = 175;

  // Arc path generator
  const describeArc = (
    x: number,
    y: number,
    rInner: number,
    rOuter: number,
    startAngle: number,
    endAngle: number
  ) => {
    const rad = Math.PI / 180;
    // Rotate 90 degrees to start at twelve o'clock
    const sAngle = startAngle - 90;
    const eAngle = endAngle - 90;

    const x1Inner = x + rInner * Math.cos(sAngle * rad);
    const y1Inner = y + rInner * Math.sin(sAngle * rad);
    const x2Inner = x + rInner * Math.cos(eAngle * rad);
    const y2Inner = y + rInner * Math.sin(eAngle * rad);

    const x1Outer = x + rOuter * Math.cos(sAngle * rad);
    const y1Outer = y + rOuter * Math.sin(sAngle * rad);
    const x2Outer = x + rOuter * Math.cos(eAngle * rad);
    const y2Outer = y + rOuter * Math.sin(eAngle * rad);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', x1Outer, y1Outer,
      'A', rOuter, rOuter, 0, largeArcFlag, 1, x2Outer, y2Outer,
      'L', x2Inner, y2Inner,
      'A', rInner, rInner, 0, largeArcFlag, 0, x1Inner, y1Inner,
      'Z'
    ].join(' ');
  };

  // Get color based on occupancy status
  const getGateColor = (gate: GateStatus) => {
    if (gate.isClosed) return '#D9483C'; // Red
    if (gate.status === 'critical') return '#D9483C'; // Red
    if (gate.status === 'warning') return '#E8A93D'; // Amber
    return '#2F8F5B'; // Turf Green
  };

  // Coordinate helper for rendering labels
  const getLabelCoords = (angle: number, radius: number) => {
    const rad = Math.PI / 180;
    const offsetAngle = angle - 90;
    return {
      x: CX + radius * Math.cos(offsetAngle * rad),
      y: CY + radius * Math.sin(offsetAngle * rad)
    };
  };

  // Define wedge angles
  const wedges = [
    { id: 'A', start: 0, end: 60, mid: 30 },
    { id: 'B', start: 60, end: 120, mid: 90 },
    { id: 'C', start: 120, end: 180, mid: 150 },
    { id: 'D', start: 180, end: 240, mid: 210 },
    { id: 'E', start: 240, end: 300, mid: 270 },
    { id: 'F', start: 300, end: 360, mid: 330 }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#161a23] border border-[#2e3748] rounded-xl relative select-none w-full max-w-[460px] mx-auto shadow-xl">
      {/* Interactive Compass HUD overlay */}
      <div className="absolute top-3 left-4 flex items-center gap-1.5 text-stadiumCyan font-mono text-[10px]">
        <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '30s' }} />
        <span>RADIAL GRID LIVE</span>
      </div>

      <div className="absolute top-3 right-4 flex items-center gap-1 bg-[#12151a] px-2 py-0.5 rounded border border-[#2e3748] text-zinc-400 font-mono text-[9px]">
        <span className="w-1.5 h-1.5 rounded-full bg-stadiumCyan animate-ping" />
        <span>LIDAR 16kHz</span>
      </div>

      {/* Hero Stadium SVG */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-auto max-w-[340px] md:max-w-[360px]"
        aria-label="Stadium Bowl Map Screen"
      >
        {/* Ambient Grid Rings */}
        <circle cx={CX} cy={CY} r={230} fill="none" stroke="#2e3748" strokeWidth="0.5" strokeDasharray="3,3" />
        <circle cx={CX} cy={CY} r={190} fill="none" stroke="#2e3748" strokeWidth="1" />
        <circle cx={CX} cy={CY} r={175} fill="none" stroke="#2e3748" strokeWidth="0.5" />
        <circle cx={CX} cy={CY} r={85} fill="none" stroke="#2e3748" strokeWidth="0.5" />
        
        {/* Dynamic Sector Wedges */}
        {wedges.map((w, idx) => {
          const gate = gateList.find(g => g.id === w.id) || gateList[idx];
          const isSelected = selectedGateId === w.id;
          const fillColor = getGateColor(gate);

          return (
            <g key={w.id} className="group cursor-pointer">
              {/* Main Wedge Block */}
              <path
                d={describeArc(CX, CY, R_INNER, R_OUTER, w.start, w.end)}
                fill={fillColor}
                fillOpacity={isSelected ? 0.35 : 0.18}
                stroke={isSelected ? '#3FA9D6' : fillColor}
                strokeWidth={isSelected ? 2.5 : 1}
                className={`transition-all duration-300 hover:fill-opacity-40 ${
                  gate.status === 'critical' ? 'pulse-critical' : ''
                }`}
                onClick={() => setSelectedGateId(w.id)}
              />

              {/* Outer boundary indicator arc */}
              <path
                d={describeArc(CX, CY, R_OUTER + 2, R_OUTER + 8, w.start, w.end)}
                fill={fillColor}
                fillOpacity={isSelected ? 0.9 : 0.4}
                onClick={() => setSelectedGateId(w.id)}
              />

              {/* Text Labels inside sectors */}
              {(() => {
                const textCoords = getLabelCoords(w.mid - 12, 130);
                return (
                  <text
                    x={textCoords.x}
                    y={textCoords.y}
                    fill={isSelected ? '#3FA9D6' : '#F5F7FA'}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="font-display text-[14px] font-bold pointer-events-none uppercase select-none"
                  >
                    {gate.name}
                  </text>
                );
              })()}

              {/* Occupancy Indicator Percentages */}
              {(() => {
                const subCoords = getLabelCoords(w.mid - 12, 150);
                return (
                  <text
                    x={subCoords.x}
                    y={subCoords.y}
                    fill="#a1a1aa"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="font-mono text-[9px] font-semibold pointer-events-none select-none"
                  >
                    {gate.isClosed ? 'CLOSED' : `${gate.occupancy}%`}
                  </text>
                );
              })()}
            </g>
          );
        })}

        {/* Spatial LiDAR Point Cloud Cyan Dots (Active only in Crowd / Threat Views) */}
        {(activeTab === 'crowd' || activeTab === 'threat') && (
          <g opacity="0.75" className="pointer-events-none">
            {/* Generate static concentric pseudo-point-cloud details using rings of dots */}
            {[105, 120, 160].map((radius, rIdx) => 
              Array.from({ length: 24 }).map((_, dotIdx) => {
                const angle = (dotIdx * 15) + (rIdx * 7.5);
                const coords = getLabelCoords(angle, radius);
                // Randomly skip some dots for cloud density appearance
                if ((dotIdx + rIdx) % 3 === 0) return null;
                return (
                  <circle
                    key={`dot-${radius}-${dotIdx}`}
                    cx={coords.x}
                    cy={coords.y}
                    r={1}
                    fill="#3FA9D6"
                    opacity="0.6"
                  />
                );
              })
            )}
          </g>
        )}

        {/* Center Soccer Pitch representing stadium ground */}
        <g>
          <rect x={CX - 35} y={CY - 25} width={70} height={50} rx={4} fill="#2F8F5B" fillOpacity="0.8" stroke="#F5F7FA" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={15} fill="none" stroke="#F5F7FA" strokeWidth="0.8" />
          <line x1={CX} y1={CY - 25} x2={CX} y2={CY + 25} stroke="#F5F7FA" strokeWidth="0.8" />
          {/* Inner operations booth marker */}
          <circle cx={CX} cy={CY} r={3} fill="#3FA9D6" />
        </g>

        {/* Egress Flow Arrows (Fades in if in Egress Simulation Mode) */}
        {gateList.some(g => g.occupancy > 50) && (
          <g opacity="0.6" className="pointer-events-none">
            {wedges.map((w, idx) => {
              const coordsStart = getLabelCoords(w.mid + 12, 85);
              const coordsEnd = getLabelCoords(w.mid + 12, 170);
              return (
                <line
                  key={`arrow-${idx}`}
                  x1={coordsStart.x}
                  y1={coordsStart.y}
                  x2={coordsEnd.x}
                  y2={coordsEnd.y}
                  stroke="#3FA9D6"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
          </g>
        )}

        {/* SVG Definitions for arrowhead markers and radar sweeps */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="4"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill="#3FA9D6" />
          </marker>
        </defs>

        {/* Radar Sweep Effect (Semi-transparent sector rotater) */}
        <g className="radar-sweep-effect pointer-events-none" opacity="0.15">
          <path
            d={describeArc(CX, CY, 5, 235, 0, 45)}
            fill="url(#radarGradient)"
          />
          <line
            x1={CX}
            y1={CY}
            x2={CX}
            y2={CY - 235}
            stroke="#3FA9D6"
            strokeWidth="1.5"
          />
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#3FA9D6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3FA9D6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </g>

        {/* Navigation Wayfinding Paths (Active when gate selected) */}
        {selectedGateId && (
          <g>
            {(() => {
              const targetWedge = wedges.find(w => w.id === selectedGateId);
              if (!targetWedge) return null;

              // Check if Gate C is selected. Gate C is critical!
              const isGateCSelected = selectedGateId === 'C';
              const targetCoords = getLabelCoords(targetWedge.mid + 15, 145);
              
              if (isGateCSelected) {
                // Gate C is overloaded. Show RED WARNING Route, and GREEN ALTERNATIVE route to Gate D!
                const gateDCoords = getLabelCoords(210 + 15, 145); // Gate D mid is 210
                
                return (
                  <>
                    {/* Primary path to C (Overloaded - Red Exclamation path) */}
                    <path
                      d={`M ${CX} ${CY} Q 200 300 ${targetCoords.x} ${targetCoords.y}`}
                      fill="none"
                      stroke="#D9483C"
                      strokeWidth="3"
                      strokeDasharray="4,4"
                      className="animate-pulse"
                    />
                    <circle cx={targetCoords.x} cy={targetCoords.y} r={10} fill="#D9483C" />
                    <text x={targetCoords.x} y={targetCoords.y + 3} fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">!</text>

                    {/* AI Reroute recommendation path to Gate D */}
                    <path
                      d={`M ${CX} ${CY} Q 180 280 ${gateDCoords.x} ${gateDCoords.y}`}
                      fill="none"
                      stroke="#2F8F5B"
                      strokeWidth="4"
                      className="animate-bounce"
                    />
                    {/* Pulsing indicator on Gate D redirect */}
                    <circle cx={gateDCoords.x} cy={gateDCoords.y} r={10} fill="#2F8F5B" className="animate-ping" style={{ animationDuration: '2s' }} />
                    <circle cx={gateDCoords.x} cy={gateDCoords.y} r={6} fill="#2F8F5B" />
                  </>
                );
              } else {
                // Normal path (Direct vs Accessible)
                const routeStroke = accessibleRouting ? '#E8A93D' : '#3FA9D6';
                const routeDash = accessibleRouting ? '5,5' : '0';
                const pathString = accessibleRouting
                  ? `M ${CX} ${CY} L ${CX - 40} ${CY} L ${targetCoords.x - 30} ${targetCoords.y + 10} L ${targetCoords.x} ${targetCoords.y}` // Multi-node accessible path
                  : `M ${CX} ${CY} Q ${(CX + targetCoords.x) / 2} ${(CY + targetCoords.y) / 2 - 30} ${targetCoords.x} ${targetCoords.y}`; // direct bezier curve
                
                return (
                  <>
                    <path
                      d={pathString}
                      fill="none"
                      stroke={routeStroke}
                      strokeWidth="3.5"
                      strokeDasharray={routeDash}
                    />
                    <circle cx={targetCoords.x} cy={targetCoords.y} r={6} fill={routeStroke} />
                  </>
                );
              }
            })()}
          </g>
        )}
      </svg>

      {/* SVG Map Legend */}
      <div className="mt-4 flex items-center flex-wrap justify-center gap-3 text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-stadiumTurf bg-opacity-20 border border-stadiumTurf" />
          Normal (&lt;75%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-stadiumAmber bg-opacity-20 border border-stadiumAmber" />
          Caution (75-90%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-stadiumRed bg-opacity-20 border border-stadiumRed" />
          Critical (&gt;90%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-stadiumCyan bg-opacity-20 border border-stadiumCyan" />
          LiDAR Cloud
        </span>
      </div>

      {/* Selected Gate HUD Details */}
      {selectedGateId && (
        <div className="mt-4 w-full bg-[#12151a] p-3 rounded-lg border border-[#2e3748] flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono text-stadiumCyan block uppercase">Selected Gate Focus</span>
            <span className="text-sm font-display font-bold text-stadiumFloodlight uppercase">
              {gateList.find(g => g.id === selectedGateId)?.name}
            </span>
          </div>
          
          <div className="text-right">
            {selectedGateId === 'C' ? (
              <span className="text-[10px] font-mono text-stadiumRed flex items-center gap-1 justify-end animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                AI RE-ROUTE DISPATCHED
              </span>
            ) : (
              <span className="text-[10px] font-mono text-stadiumTurf uppercase">
                Flow Nominal
              </span>
            )}
            <span className="text-[9px] font-mono text-zinc-500 block">
              {accessibleRouting ? 'Accessible Ramping Mode Active' : 'Direct Stairway Mode'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
