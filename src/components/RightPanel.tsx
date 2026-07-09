import React, { useRef, useEffect } from 'react';
import { GateStatus, MULTILINGUAL_SCENARIOS, MultilingualScenario } from '../data/mockData';
import { Mic, MicOff, Accessibility, Compass, Send, CheckCircle2, RotateCcw, AlertTriangle, AlertCircle } from 'lucide-react';

interface RightPanelProps {
  selectedGateId: string | null;
  gateList: GateStatus[];
  accessibleRouting: boolean;
  
  // Speech Assistant States
  activeSpeechScenario: MultilingualScenario | null;
  isMicActive: boolean;
  micStateText: string;
  transcriptLogs: { speaker: 'operator' | 'fan' | 'agent'; text: string; lang?: string }[];
  isDispatching: boolean;
  voiceToneScore: number;
  triggerVoiceScenario: (id: string) => void;
  dispatchSpeechAgent: () => void;
  resetSpeechSimulator: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  selectedGateId,
  gateList,
  accessibleRouting,

  activeSpeechScenario,
  isMicActive,
  micStateText,
  transcriptLogs,
  isDispatching,
  voiceToneScore,
  triggerVoiceScenario,
  dispatchSpeechAgent,
  resetSpeechSimulator
}) => {
  const activeGate = gateList.find(g => g.id === selectedGateId);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [transcriptLogs]);

  return (
    <aside className="w-full md:w-80 bg-[#161a23] border-y md:border-y-0 md:border-l border-[#2e3748] flex flex-col h-[450px] md:h-full shrink-0 overflow-hidden select-none order-3" aria-label="Context Detail Panel">
      
      {/* Wayfinding & Navigation Panel Section */}
      <div className="p-4 border-b border-[#2e3748] bg-[#1b1f28] shrink-0">
        <h2 className="text-sm font-display font-bold tracking-widest text-stadiumFloodlight uppercase flex items-center gap-2">
          <Compass className="w-5 h-5 text-stadiumCyan" />
          AI Indoor Wayfinding
        </h2>
        <p className="text-[10px] font-mono text-zinc-400 mt-1 uppercase">
          Dynamic Pathing & Gate Rerouting
        </p>

        {activeGate ? (
          <div className="mt-3 bg-[#12151a] p-3 rounded-lg border border-[#2e3748] text-xs font-mono space-y-2">
            <div className="flex justify-between items-center text-[10px] text-zinc-500">
              <span>TARGET DESTINATION:</span>
              <span className="text-stadiumFloodlight font-bold">{activeGate.name}</span>
            </div>
            
            {/* Route description */}
            <div className="space-y-1">
              <span className="text-[9px] text-zinc-500 block uppercase">Recommended Route:</span>
              {activeGate.id === 'C' ? (
                <div className="text-stadiumRed font-semibold flex items-start gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    DENSITY WARNING: Gate C is overloaded. Rerouting traffic through Gate D tunnel (Elevator 3 path).
                  </span>
                </div>
              ) : accessibleRouting ? (
                <div className="text-stadiumAmber flex items-start gap-1">
                  <Accessibility className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    Step-free Route: Take Elevator Core North to concourse level 2, follow ramp B to Gate {activeGate.id}.
                  </span>
                </div>
              ) : (
                <div className="text-stadiumTurf">
                  <span>
                    Direct Route: Take the west stairwell to {activeGate.section} entrance corridor.
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-3 text-center text-zinc-500 font-mono text-[10px] py-4 uppercase">
            Select a Gate to view routes
          </div>
        )}
      </div>

      {/* Multilingual Voice Assistant Simulator Section */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between bg-[#12151a]/40">
        <div className="space-y-4">
          <div className="border-b border-[#2e3748] pb-2">
            <h3 className="text-xs font-mono text-stadiumCyan uppercase tracking-widest flex items-center gap-1.5">
              <Mic className="w-4 h-4" />
              Gemini Live Translation
            </h3>
            <p className="text-[9px] font-mono text-zinc-400 mt-0.5 uppercase">
              Staff speech-to-speech simulator
            </p>
          </div>

          {/* Scenario Selectors for Demo */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block">Select Fan Inquiry Demo:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {MULTILINGUAL_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => triggerVoiceScenario(sc.id)}
                  className={`py-2 px-2.5 rounded border text-left font-mono text-[9px] uppercase transition-all cursor-pointer leading-tight break-words flex items-center justify-between min-h-[36px] ${
                    activeSpeechScenario?.id === sc.id
                      ? 'bg-stadiumCyan/25 border-stadiumCyan text-stadiumCyan font-bold'
                      : 'bg-[#1b1f28] border-[#2e3748] text-zinc-400 hover:text-stadiumFloodlight'
                  }`}
                  title={sc.title}
                >
                  {sc.title}
                </button>
              ))}
            </div>
          </div>

          {/* Translator Live Output Panel */}
          <div className="bg-[#12151a] border border-[#2e3748] rounded-xl p-3.5 min-h-[160px] flex flex-col justify-between">
            <div className="space-y-3">
              {/* Mic State banner */}
              <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 uppercase pb-1.5 border-b border-[#2e3748]">
                <span>Status: {micStateText}</span>
                {isMicActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-stadiumRed animate-ping" />
                )}
              </div>

              {/* Transcripts */}
              <div ref={transcriptContainerRef} className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                {transcriptLogs.length === 0 ? (
                  <div className="text-center text-zinc-600 font-mono text-[10px] py-8 uppercase">
                    Select a translation scenario above to stream speech audio
                  </div>
                ) : (
                  transcriptLogs.map((t, idx) => (
                    <div key={idx} className="text-xs font-mono space-y-0.5">
                      <span className={`text-[8px] uppercase block font-bold ${
                        t.speaker === 'fan' ? 'text-stadiumAmber' : t.speaker === 'operator' ? 'text-stadiumCyan' : 'text-stadiumTurf'
                      }`}>
                        {t.speaker === 'fan' ? `Fan (${t.lang}):` : t.speaker === 'operator' ? 'Operator:' : 'AI Transcript:'}
                      </span>
                      <p className="text-stadiumFloodlight leading-relaxed select-text">{t.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Vocal stress tone matched display */}
            {activeSpeechScenario && (
              <div className="border-t border-[#2e3748] pt-2 mt-3 flex items-center justify-between text-[9px] font-mono">
                <span className="text-zinc-500 uppercase">Affective Tone:</span>
                <span className="text-stadiumAmber font-bold uppercase animate-pulse">{activeSpeechScenario.affectiveTone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Handoff actions to Left Agent Rail */}
        {activeSpeechScenario && (
          <div className="mt-4 pt-3 border-t border-[#2e3748] space-y-2.5">
            {/* Tone stress score */}
            {voiceToneScore > 0 && (
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-zinc-500 uppercase">Fan Distress Score:</span>
                  <span className="text-stadiumRed font-bold">{voiceToneScore}%</span>
                </div>
                <div className="w-full bg-[#12151a] h-1.5 rounded-full overflow-hidden border border-[#2e3748]">
                  <div 
                    className="h-full rounded-full bg-stadiumRed"
                    style={{ width: `${voiceToneScore}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={resetSpeechSimulator}
                className="flex-1 py-2 bg-[#1b1f28] hover:bg-[#202734] border border-[#2e3748] text-zinc-300 hover:text-stadiumFloodlight font-display font-semibold uppercase text-[10px] rounded-lg tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>

              <button
                onClick={dispatchSpeechAgent}
                disabled={isDispatching}
                className="flex-2 py-2 bg-stadiumCyan hover:bg-stadiumCyan/95 text-stadiumCharcoal font-display font-bold uppercase text-[10px] rounded-lg tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1"
              >
                {isDispatching ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-stadiumCharcoal border-t-transparent animate-spin" />
                    Dispatching...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Dispatch Agent
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="p-3 bg-[#1b1f28] border-t border-[#2e3748] text-[9px] font-mono text-zinc-500 text-center shrink-0">
        REAL-TIME TRANSLATION ENGINES ACTIVE
      </div>
    </aside>
  );
};
