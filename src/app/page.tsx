"use client";

import { useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { ExplanationModal } from "@/components/ExplanationModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LogPanel } from "@/components/LogPanel";
import { MobilePanelTabs, type MobileTab } from "@/components/MobilePanelTabs";
import { SCENARIOS, type Scenario } from "@/data/scenarios";
import { useScenario } from "@/stores/useScenario";

export default function Home() {
  const {
    state,
    startScenario,
    abortScenario,
    openExplanation,
    closeExplanation,
    openDisclaimer,
    acceptDisclaimer,
  } = useScenario();
  const [mobileTab, setMobileTab] = useState<MobileTab>("chat");

  const handleSelect = (scenario: Scenario) => {
    setMobileTab("log");
    startScenario(scenario.id);
  };

  const explanationScenario =
    state.completedScenarioId !== null
      ? SCENARIOS[state.completedScenarioId]
      : null;

  return (
    <>
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">
        <MobilePanelTabs active={mobileTab} onChange={setMobileTab} />
        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
          <ChatPanel
            status={state.status}
            messages={state.messages}
            aiThinking={state.aiThinking}
            onSelect={handleSelect}
            onAbort={abortScenario}
            onShowExplanation={openExplanation}
            className={mobileTab === "chat" ? "" : "hidden md:flex"}
          />
          <LogPanel
            logs={state.logs}
            scenarioId={state.currentScenarioId}
            attackActive={state.attackActive}
            className={mobileTab === "log" ? "" : "hidden md:flex"}
          />
        </div>
      </main>
      <Footer onShowDisclaimer={openDisclaimer} />
      <DisclaimerModal
        open={state.showDisclaimer}
        onAccept={acceptDisclaimer}
      />
      <ExplanationModal
        open={state.showExplanation}
        scenario={explanationScenario}
        onClose={closeExplanation}
      />
    </>
  );
}
