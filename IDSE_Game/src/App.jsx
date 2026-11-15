import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { BriefingModal } from './components/BriefingModal.jsx';
import { CaseBoard } from './components/CaseBoard.jsx';
import { CaseWorkspace } from './components/CaseWorkspace.jsx';
import { CaseDebrief } from './components/CaseDebrief.jsx';
import { FinalReport } from './components/FinalReport.jsx';
import { HowToPlayModal } from './components/HowToPlayModal.jsx';
import { GlossaryModal } from './components/GlossaryModal.jsx';
import { CASES } from './data/casesData.js';
import { loadGameState, saveGameState, resetGameState } from './utils/storage.js';

export function App() {
  const [gameState, setGameState] = useState(() => loadGameState());
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [activeCaseId, setActiveCaseId] = useState(1);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [lastDebriefResult, setLastDebriefResult] = useState(null);

  // Auto-save state changes to localStorage
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const handleStartInvestigation = () => {
    if (!gameState.hasSeenBriefing) {
      setIsBriefingOpen(true);
    } else {
      setCurrentScreen('caseBoard');
    }
  };

  const handleFinishBriefing = () => {
    setIsBriefingOpen(false);
    setGameState((prev) => ({ ...prev, hasSeenBriefing: true }));
    setActiveCaseId(1);
    setCurrentScreen('workspace');
  };

  const handleSelectCase = (caseId) => {
    setActiveCaseId(caseId);
    setCurrentScreen('workspace');
  };

  const handleCaseSolved = ({ caseId, score, badge, isPerfect }) => {
    setLastDebriefResult({ score, badge, isPerfect });

    setGameState((prev) => {
      const nextUnlocked = [...prev.unlockedCases];
      if (caseId < CASES.length && !nextUnlocked.includes(caseId + 1)) {
        nextUnlocked.push(caseId + 1);
      }

      const updatedBadges = [...prev.badges];
      if (badge && !updatedBadges.includes(badge)) {
        updatedBadges.push(badge);
      }

      const prevCaseScore = prev.completedCases[caseId]?.score || 0;
      const scoreDiff = Math.max(0, score - prevCaseScore);

      return {
        ...prev,
        unlockedCases: nextUnlocked,
        totalScore: prev.totalScore + scoreDiff,
        badges: updatedBadges,
        completedCases: {
          ...prev.completedCases,
          [caseId]: {
            score,
            badge,
            completedAt: new Date().toISOString(),
          },
        },
      };
    });

    setCurrentScreen('debrief');
  };

  const handleAddNotebookClue = (clue) => {
    setGameState((prev) => ({
      ...prev,
      notebookEntries: [clue, ...prev.notebookEntries],
    }));
  };

  const handleResetProgress = () => {
    const fresh = resetGameState();
    setGameState(fresh);
    setCurrentScreen('landing');
  };

  const completedCount = Object.keys(gameState.completedCases || {}).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Universal Top Header */}
      <Header
        score={gameState.totalScore}
        completedCount={completedCount}
        totalCases={CASES.length}
        currentScreen={currentScreen}
        onNavigateHome={() => setCurrentScreen('landing')}
        onNavigateBoard={() => setCurrentScreen('caseBoard')}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* Screen Routing */}
      <main style={{ flex: 1 }}>
        {currentScreen === 'landing' && (
          <LandingPage
            onStartInvestigation={handleStartInvestigation}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
            onResetProgress={handleResetProgress}
            completedBadges={gameState.badges}
            casesSolved={completedCount}
          />
        )}

        {currentScreen === 'caseBoard' && (
          <CaseBoard
            unlockedCases={gameState.unlockedCases}
            completedCases={gameState.completedCases}
            onSelectCase={handleSelectCase}
            onViewFinalReport={() => setCurrentScreen('finalReport')}
          />
        )}

        {currentScreen === 'workspace' && (
          <CaseWorkspace
            caseId={activeCaseId}
            notebookClues={gameState.notebookEntries}
            onAddNotebookClue={handleAddNotebookClue}
            onNavigateBoard={() => setCurrentScreen('caseBoard')}
            onCaseSolved={handleCaseSolved}
          />
        )}

        {currentScreen === 'debrief' && (
          <CaseDebrief
            caseId={activeCaseId}
            result={lastDebriefResult}
            onReplayCase={(id) => {
              setActiveCaseId(id);
              setCurrentScreen('workspace');
            }}
            onNextCase={(nextId) => {
              setActiveCaseId(nextId);
              setCurrentScreen('workspace');
            }}
            onNavigateBoard={() => setCurrentScreen('caseBoard')}
          />
        )}

        {currentScreen === 'finalReport' && (
          <FinalReport
            completedCases={gameState.completedCases}
            totalScore={gameState.totalScore}
            badges={gameState.badges}
            onReplayCase={(id) => {
              setActiveCaseId(id);
              setCurrentScreen('workspace');
            }}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onNavigateBoard={() => setCurrentScreen('caseBoard')}
          />
        )}
      </main>

      {/* Briefing Modal (Screen 2) */}
      <BriefingModal
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
        onStartFirstCase={handleFinishBriefing}
      />

      {/* In-Game How to Play Guide Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      {/* Beginner Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}
export default App;
