import { useState, useEffect } from 'react';
import { 
  VENUES, 
  Venue, 
  GateStatus, 
  MATCH_TIMELINE, 
  CYBER_THREATS, 
  TRANSIT_LINES, 
  MULTILINGUAL_SCENARIOS, 
  TransitLine, 
  MultilingualScenario 
} from '../data/mockData';

export interface AgentLogItem {
  id: string;
  timestamp: string;
  agentType: 'LLM' | 'Workflow' | 'Custom';
  agentName: string;
  message: string;
  status: 'idle' | 'thinking' | 'success' | 'alert';
}

export function useConcourseState() {
  // Theme & Accessibility State
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('concourse-theme') as 'dark' | 'light') || 'dark';
  });
  const [accessibilityMode, setAccessibilityMode] = useState<boolean>(() => {
    return localStorage.getItem('concourse-contrast') === 'high';
  });
  const [accessibleRouting, setAccessibleRouting] = useState<boolean>(() => {
    return localStorage.getItem('concourse-routing') === 'accessible';
  });

  useEffect(() => {
    localStorage.setItem('concourse-theme', themeMode);
    if (themeMode === 'light' && !accessibilityMode) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [themeMode, accessibilityMode]);

  useEffect(() => {
    localStorage.setItem('concourse-contrast', accessibilityMode ? 'high' : 'normal');
    if (accessibilityMode) {
      document.documentElement.setAttribute('data-contrast', 'high');
      document.documentElement.classList.add('high-contrast-mode');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.removeAttribute('data-contrast');
      document.documentElement.classList.remove('high-contrast-mode');
      if (themeMode === 'light') {
        document.documentElement.classList.add('light-theme');
      }
    }
  }, [accessibilityMode, themeMode]);

  useEffect(() => {
    localStorage.setItem('concourse-routing', accessibleRouting ? 'accessible' : 'normal');
  }, [accessibleRouting]);

  // Venue Selector State
  const [selectedVenue, setSelectedVenue] = useState<Venue>(VENUES[0]); // Default to Dallas AT&T
  const [gateStatusList, setGateStatusList] = useState<GateStatus[]>(VENUES[0].initialGates);

  // Layout and Tab navigation
  const [activeTab, setActiveTab] = useState<string>('crowd');
  const [selectedGateId, setSelectedGateId] = useState<string | null>('C'); // Default selection Gate C (critical)

  // Simulation parameters
  const [isEgressMode, setIsEgressMode] = useState<boolean>(false);
  
  // Transit state (local copies for interaction)
  const [transitLines, setTransitLines] = useState<TransitLine[]>(TRANSIT_LINES);
  const [freightQueueCount, setFreightQueueCount] = useState<number>(14);

  // Multilingual assistant simulator
  const [activeSpeechScenario, setActiveSpeechScenario] = useState<MultilingualScenario | null>(null);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [micStateText, setMicStateText] = useState<string>('Press Mic to start simulator...');
  const [transcriptLogs, setTranscriptLogs] = useState<{ speaker: 'operator' | 'fan' | 'agent'; text: string; lang?: string }[]>([]);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [voiceToneScore, setVoiceToneScore] = useState<number>(0);

  // Monte Carlo parameters
  const [oddsSkew, setOddsSkew] = useState<number>(50); // Sliders (0-100)
  const [weatherSeverity, setWeatherSeverity] = useState<number>(45);
  const [transitDelay, setTransitDelay] = useState<number>(30);

  // Agent activity rail log feed
  const [agentLogs, setAgentLogs] = useState<AgentLogItem[]>([
    { 
      id: 'log-1', 
      timestamp: new Date(Date.now() - 60000 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
      agentType: 'LLM', 
      agentName: 'Ops Analyzer', 
      message: 'Monitoring stadium sensors. Ingress speed nominal.', 
      status: 'success' 
    },
    { 
      id: 'log-2', 
      timestamp: new Date(Date.now() - 60000 * 4).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
      agentType: 'Workflow', 
      agentName: 'Pre-Match Orchestrator', 
      message: 'Gate occupancy monitoring active. Directing fans to low-density channels.', 
      status: 'success' 
    }
  ]);

  // Synchronize gates list when venue changes
  useEffect(() => {
    setGateStatusList(selectedVenue.initialGates);
    setSelectedGateId('C'); // Default to C for newly selected venue
    
    // Add LLM Agent alert when switching venue
    addAgentLog('LLM', 'Ops Analyzer', `Loaded digital twin parameters for ${selectedVenue.name} (${selectedVenue.location}). Setting risk coefficients.`, 'success');
  }, [selectedVenue]);

  // Add a log to the Agent Activity feed
  const addAgentLog = (
    type: 'LLM' | 'Workflow' | 'Custom',
    name: string,
    message: string,
    status: 'idle' | 'thinking' | 'success' | 'alert' = 'success'
  ) => {
    const newLog: AgentLogItem = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentType: type,
      agentName: name,
      message,
      status
    };
    setAgentLogs(prev => [newLog, ...prev].slice(0, 30)); // Cap at 30 items
  };

  // Close or Open a Gate (Crowd Management Interactive Action)
  const toggleGate = (gateId: string) => {
    const targetGate = gateStatusList.find(g => g.id === gateId);
    if (!targetGate) return;

    const nextClosed = !targetGate.isClosed;

    // Dispatch LLM Agent / Workflow Agents to react to the manual gate override outside the updater
    addAgentLog(
      'LLM', 
      'Congestion Evaluator', 
      `Operator manually requested ${nextClosed ? 'closure' : 'opening'} of ${targetGate.name}. Evaluating flow distribution.`, 
      'thinking'
    );

    setTimeout(() => {
      addAgentLog(
        'Workflow',
        'Traffic Redirector',
        `${targetGate.name} is now ${nextClosed ? 'CLOSED' : 'OPENED'}. Recalculating route matrices for adjacent sectors.`,
        nextClosed ? 'alert' : 'success'
      );

      if (nextClosed) {
        // Suggest rerouting to another gate
        const alternateGate = gateId === 'C' ? 'D' : 'A';
        addAgentLog(
          'Custom',
          'Router Tool',
          `Traffic rerouted from Gate ${gateId} to Gate ${alternateGate}. Updated stadium wayfinding signage.`,
          'success'
        );
      }
    }, 1200);

    setGateStatusList(prev => prev.map(gate => {
      if (gate.id === gateId) {
        return { 
          ...gate, 
          isClosed: nextClosed, 
          status: nextClosed ? 'critical' : (gate.occupancy > 90 ? 'critical' : gate.occupancy > 75 ? 'warning' : 'safe')
        };
      }
      return gate;
    }));
  };

  // Trigger a sudden crowd bottleneck simulation to demonstrate prediction alert
  const triggerSimulationBottleneck = () => {
    addAgentLog('LLM', 'Predictive Forecaster', 'Running fast-forward crowd density simulation...', 'thinking');
    
    setTimeout(() => {
      setGateStatusList(prev => prev.map(gate => {
        if (gate.id === 'C') {
          return { ...gate, occupancy: 98, status: 'critical', ingressRate: 580 };
        }
        if (gate.id === 'B') {
          return { ...gate, occupancy: 88, status: 'warning', ingressRate: 420 };
        }
        return gate;
      }));

      addAgentLog('LLM', 'Predictive Forecaster', 'ALERT: Bottleneck warning at Gate C! Occupancy reached 98% (threshold 90% exceeded). Ingress rate 580/min.', 'alert');
      
      // Auto workflow agent dispatch
      addAgentLog('Workflow', 'Incident Manager', 'Flow threshold breached. Recommending immediate rerouting or gate throttle.', 'alert');
    }, 1000);
  };

  // Perform voice scenario simulation (Multilingual Assist)
  const triggerVoiceScenario = (scenarioId: string) => {
    const scenario = MULTILINGUAL_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    setActiveSpeechScenario(scenario);
    setIsMicActive(true);
    setMicStateText('Streaming audio input...');
    setVoiceToneScore(scenario.stressLevel);
    
    // Simulate translation flow
    setTranscriptLogs([
      { speaker: 'fan', text: scenario.fanQuery, lang: scenario.sourceLanguage }
    ]);

    addAgentLog('LLM', 'Language Translator', `Incoming stream. Detected: ${scenario.sourceLanguage}. Running translation...`, 'thinking');

    setTimeout(() => {
      setTranscriptLogs(prev => [
        ...prev,
        { speaker: 'agent', text: `[English Translation]: "${scenario.translation}"` }
      ]);
      setMicStateText('Affective analysis completed.');
      addAgentLog('LLM', 'Acoustic Analyzer', `Tone matching complete: ${scenario.affectiveTone} (Stress score: ${scenario.stressLevel}%)`, 'success');
    }, 1500);
  };

  // Dispatch Custom Agent from Speech Simulator
  const dispatchSpeechAgent = () => {
    if (!activeSpeechScenario || isDispatching) return; // Prevent double trigger!
    setIsDispatching(true);

    addAgentLog('Workflow', 'Incident dispatcher', `Initiating dispatch sequence for incident type: ${activeSpeechScenario.title}`, 'thinking');

    setTimeout(() => {
      addAgentLog('Custom', activeSpeechScenario.dispatchAgentType, `Custom dispatch confirmed. Dispatching responders to coordinate near Gate C/D area.`, 'success');
      setIsDispatching(false);
      
      // Add response transcript
      setTranscriptLogs(prev => [
        ...prev,
        { speaker: 'agent', text: `[Operations Command]: "${activeSpeechScenario.dispatchAgentType} dispatched. Emergency status log: Active."` }
      ]);
    }, 1500);
  };

  // Reset speech simulator
  const resetSpeechSimulator = () => {
    setActiveSpeechScenario(null);
    setIsMicActive(false);
    setMicStateText('Press Mic to start simulator...');
    setTranscriptLogs([]);
    setVoiceToneScore(0);
  };

  // Trigger pre-positioning checklist action in Monte Carlo Decision Support
  const prePositionSecurity = (sector: string) => {
    addAgentLog('Workflow', 'Resources Coordinator', `Pre-positioning mobile security team at ${sector}.`, 'thinking');
    setTimeout(() => {
      addAgentLog('Custom', 'Personnel Tracker', `Deploy confirmed: 15 staff members pre-positioned at ${sector}.`, 'success');
    }, 1000);
  };

  return {
    themeMode,
    setThemeMode,
    accessibilityMode,
    setAccessibilityMode,
    accessibleRouting,
    setAccessibleRouting,
    
    selectedVenue,
    setSelectedVenue,
    gateStatusList,
    setGateStatusList,

    activeTab,
    setActiveTab,
    selectedGateId,
    setSelectedGateId,

    isEgressMode,
    setIsEgressMode,

    transitLines,
    setTransitLines,
    freightQueueCount,
    setFreightQueueCount,

    activeSpeechScenario,
    isMicActive,
    micStateText,
    transcriptLogs,
    isDispatching,
    voiceToneScore,
    triggerVoiceScenario,
    dispatchSpeechAgent,
    resetSpeechSimulator,

    oddsSkew,
    setOddsSkew,
    weatherSeverity,
    setWeatherSeverity,
    transitDelay,
    setTransitDelay,

    agentLogs,
    addAgentLog,
    toggleGate,
    triggerSimulationBottleneck,
    prePositionSecurity
  };
}
