import React, { useRef, useEffect } from 'react';
import { Bot, GitBranch, Cpu, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { AgentLogItem } from '../hooks/useConcourseState';

interface AgentRailProps {
  agentLogs: AgentLogItem[];
}

export const AgentRail: React.FC<AgentRailProps> = ({ agentLogs }) => {
  const railContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (railContainerRef.current) {
      railContainerRef.current.scrollTop = 0;
    }
  }, [agentLogs]);

  return (
    <aside className="w-full md:w-80 bg-[#161a23] border-y md:border-y-0 md:border-r border-[#2e3748] flex flex-col h-[350px] md:h-full shrink-0 overflow-hidden select-none order-2 md:order-1" aria-label="Agent Activity Feed">
      {/* Rail Header */}
      <div className="p-4 border-b border-[#2e3748] bg-[#1b1f28]">
        <h2 className="text-sm font-display font-bold tracking-widest text-stadiumFloodlight uppercase flex items-center gap-2">
          <Bot className="w-5 h-5 text-stadiumCyan animate-pulse" />
          Multi-Agent Grid (ADK)
        </h2>
        <p className="text-[10px] font-mono text-zinc-400 mt-1 uppercase">
          Cooperating Reasoning & Action Nodes
        </p>
      </div>

      {/* Nodes Status Swatch */}
      <div className="p-3 bg-[#12151a] border-b border-[#2e3748] grid grid-cols-3 gap-1.5 text-[9px] font-mono text-center">
        <div className="p-1 rounded bg-[#1e293b] border border-blue-500/30 text-blue-400 flex flex-col items-center">
          <Bot className="w-3.5 h-3.5 mb-0.5" />
          <span>LLM COG</span>
        </div>
        <div className="p-1 rounded bg-[#3b0764]/20 border border-purple-500/30 text-purple-400 flex flex-col items-center">
          <GitBranch className="w-3.5 h-3.5 mb-0.5" />
          <span>WF ORCH</span>
        </div>
        <div className="p-1 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 flex flex-col items-center">
          <Cpu className="w-3.5 h-3.5 mb-0.5" />
          <span>CUST TOOL</span>
        </div>
      </div>

      {/* Log Feed List */}
      <div ref={railContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {agentLogs.length === 0 ? (
          <div className="text-center text-zinc-500 font-mono text-xs py-8">
            Waiting for agent telemetry...
          </div>
        ) : (
          agentLogs.map((log) => {
            // Determine styling based on agent type
            let badgeBg = '';
            let badgeBorder = '';
            let badgeText = '';
            let AgentIcon = Bot;

            if (log.agentType === 'LLM') {
              badgeBg = 'bg-blue-950/30';
              badgeBorder = 'border-blue-500/30';
              badgeText = 'text-blue-400';
              AgentIcon = Bot;
            } else if (log.agentType === 'Workflow') {
              badgeBg = 'bg-purple-950/30';
              badgeBorder = 'border-purple-500/30';
              badgeText = 'text-purple-400';
              AgentIcon = GitBranch;
            } else {
              badgeBg = 'bg-emerald-950/30';
              badgeBorder = 'border-emerald-500/30';
              badgeText = 'text-emerald-400';
              AgentIcon = Cpu;
            }

            return (
              <div 
                key={log.id} 
                className={`p-2.5 rounded-lg border transition-all duration-300 ${badgeBg} ${badgeBorder} flex flex-col gap-1.5`}
              >
                {/* Agent Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AgentIcon className={`w-3.5 h-3.5 ${badgeText}`} />
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${badgeText}`}>
                      {log.agentName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono text-zinc-500">
                      {log.timestamp}
                    </span>
                    {log.status === 'thinking' && (
                      <span className="w-2 h-2 rounded-full bg-stadiumAmber animate-ping" />
                    )}
                    {log.status === 'alert' && (
                      <AlertTriangle className="w-3.5 h-3.5 text-stadiumRed" />
                    )}
                    {log.status === 'success' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-stadiumTurf" />
                    )}
                  </div>
                </div>

                {/* Agent Message */}
                <p className="text-xs font-sans text-stadiumFloodlight leading-relaxed">
                  {log.message}
                </p>
                
                {/* Visual Thinking Telemetry Mock */}
                {log.status === 'thinking' && (
                  <div className="flex gap-1 items-center mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-stadiumCyan animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-stadiumCyan animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-stadiumCyan animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[8px] font-mono text-stadiumCyan ml-1 uppercase">Resolving matrix...</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* System Status footer */}
      <div className="p-3 border-t border-[#2e3748] bg-[#12151a] flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-stadiumTurf animate-pulse" />
          ADK GRID ONLINE
        </span>
        <span className="text-[9px]">v1.0.4-LIVECAD</span>
      </div>
    </aside>
  );
};
