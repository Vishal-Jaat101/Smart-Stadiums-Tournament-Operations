import React from 'react';
import { useConcourseState } from './hooks/useConcourseState';
import { Header } from './components/Header';
import { AgentRail } from './components/AgentRail';
import { StadiumBowl } from './components/StadiumBowl';
import { ScoreboardTabs } from './components/ScoreboardTabs';
import { RightPanel } from './components/RightPanel';
import { AlertTicker } from './components/AlertTicker';

// Subviews
import { CrowdView } from './components/CrowdView';
import { TransitView } from './components/TransitView';
import { ThreatView } from './components/ThreatView';
import { SustainabilityView } from './components/SustainabilityView';
import { ScenarioView } from './components/ScenarioView';

const App: React.FC = () => {
  const state = useConcourseState();

  return (
    <div 
      className={`h-screen w-screen flex flex-col overflow-hidden bg-stadiumCharcoal text-stadiumFloodlight font-sans ${
        state.accessibilityMode ? 'high-contrast-mode' : ''
      }`}
    >
      {/* Top Header Row */}
      <Header
        selectedVenue={state.selectedVenue}
        setSelectedVenue={state.setSelectedVenue}
        accessibilityMode={state.accessibilityMode}
        setAccessibilityMode={state.setAccessibilityMode}
        accessibleRouting={state.accessibleRouting}
        setAccessibleRouting={state.setAccessibleRouting}
        themeMode={state.themeMode}
        setThemeMode={state.setThemeMode}
      />

      {/* Main Grid: Left Rail + Center Panel + Right Rail */}
      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden w-full relative">
        
        {/* Left Rail: Persistent Agent Logs Feed */}
        <AgentRail agentLogs={state.agentLogs} />

        {/* Center Panel: Hero Stadium + Module switchers + Module subview */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#12151a] p-4 space-y-4 order-1 md:order-2">
          
          {/* Top Hero: Stadium Bowl visualization */}
          <section aria-label="Stadium Bowl Visualizer">
            <StadiumBowl
              gateList={state.gateStatusList}
              selectedGateId={state.selectedGateId}
              setSelectedGateId={state.setSelectedGateId}
              accessibleRouting={state.accessibleRouting}
              activeTab={state.activeTab}
            />
          </section>

          {/* Module Selector Scoreboard Tabs */}
          <ScoreboardTabs 
            activeTab={state.activeTab} 
            setActiveTab={state.setActiveTab} 
          />

          {/* Sub-view Area */}
          <section className="w-full flex-1" aria-label="Operations Module Panel">
            {state.activeTab === 'crowd' && (
              <CrowdView
                selectedVenue={state.selectedVenue}
                gateList={state.gateStatusList}
                toggleGate={state.toggleGate}
                triggerSimulationBottleneck={state.triggerSimulationBottleneck}
                isEgressMode={state.isEgressMode}
                setIsEgressMode={state.setIsEgressMode}
                selectedGateId={state.selectedGateId}
                setSelectedGateId={state.setSelectedGateId}
              />
            )}

            {state.activeTab === 'transit' && (
              <TransitView
                transitLines={state.transitLines}
                setTransitLines={state.setTransitLines}
                freightQueueCount={state.freightQueueCount}
                setFreightQueueCount={state.setFreightQueueCount}
                addAgentLog={state.addAgentLog}
              />
            )}

            {state.activeTab === 'threat' && (
              <ThreatView selectedVenue={state.selectedVenue} />
            )}

            {state.activeTab === 'sustainability' && (
              <SustainabilityView selectedVenue={state.selectedVenue} />
            )}

            {state.activeTab === 'scenario' && (
              <ScenarioView
                oddsSkew={state.oddsSkew}
                setOddsSkew={state.setOddsSkew}
                weatherSeverity={state.weatherSeverity}
                setWeatherSeverity={state.setWeatherSeverity}
                transitDelay={state.transitDelay}
                setTransitDelay={state.setTransitDelay}
                prePositionSecurity={state.prePositionSecurity}
              />
            )}
          </section>
        </main>

        {/* Right Rail: Context Detail & Translation Assistant */}
        <RightPanel
          selectedGateId={state.selectedGateId}
          gateList={state.gateStatusList}
          accessibleRouting={state.accessibleRouting}
          
          activeSpeechScenario={state.activeSpeechScenario}
          isMicActive={state.isMicActive}
          micStateText={state.micStateText}
          transcriptLogs={state.transcriptLogs}
          isDispatching={state.isDispatching}
          voiceToneScore={state.voiceToneScore}
          triggerVoiceScenario={state.triggerVoiceScenario}
          dispatchSpeechAgent={state.dispatchSpeechAgent}
          resetSpeechSimulator={state.resetSpeechSimulator}
        />

      </div>

      {/* Bottom Scrolling Ribbon Alert Ticker */}
      <AlertTicker selectedVenue={state.selectedVenue} />
    </div>
  );
};

export default App;
