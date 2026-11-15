import React, { useState } from 'react';
import { CASES } from '../data/casesData.js';
import { Case1SamplingView } from './workspace/Case1SamplingView.jsx';
import { Case2CorrelationView } from './workspace/Case2CorrelationView.jsx';
import { Case3OverfittingView } from './workspace/Case3OverfittingView.jsx';
import { Case4BiasVarianceView } from './workspace/Case4BiasVarianceView.jsx';
import { Case5ClusteringView } from './workspace/Case5ClusteringView.jsx';
import { DetectiveNotebook } from './DetectiveNotebook.jsx';
import { ConclusionModal } from './ConclusionModal.jsx';
import { GlossaryModal } from './GlossaryModal.jsx';
import {
  FileText,
  ChevronLeft,
  Award,
  Sparkles,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Shield,
  Lightbulb,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { sound } from '../utils/sound.js';

// Case-specific beginner play guides
const CASE_GUIDES = {
  1: {
    glossaryKey: 'sampling_bias',
    simpleTitle: 'The Lazy Survey Trap: Who Did You Actually Ask?',
    missionGoal: 'The college claims 95% of students are happy. Your mission: Check if they only asked happy students!',
    steps: [
      { num: '1', text: 'Look at the Survey Strategy dropdown. It starts on "Engineering Lobby" (the brand new luxury building).' },
      { num: '2', text: 'Notice the score shows ~94%. Even if you slide the size to 250, it stays high because you only asked people in the new building!' },
      { num: '3', text: 'Now switch the strategy to "Simple Random Sample (SRS)" or click "Reveal Ground Truth". Watch the score plummet to ~58%!' },
      { num: '4', text: 'Click "Collect Clue" to save your finding, then click "Submit Case Verdict" to win your badge!' }
    ]
  },
  2: {
    glossaryKey: 'correlation_causation',
    simpleTitle: 'The Ice Cream Myth: Coincidence or Real Cause?',
    missionGoal: 'The town wants to ban ice cream because swimming emergencies also rose. Your mission: Find the hidden weather factor!',
    steps: [
      { num: '1', text: 'Start with "All Weather": The line is slanted upward and the r score is high (+0.90), making it look like ice cream causes rescues!' },
      { num: '2', text: 'Now open the "Filter by Weather" dropdown and switch to "Hot Summer Days Only (>72°F)".' },
      { num: '3', text: 'LOOK AT THE LINE: It flattens completely! The r score drops to almost 0. When heat is fixed, buying ice cream causes ZERO extra rescues!' },
      { num: '4', text: 'Click "Save Detective Clue", then click "Submit Case Verdict" to stop the silly ice cream ban!' }
    ]
  },
  3: {
    glossaryKey: 'overfitting',
    simpleTitle: 'The Trap: Memorizing Practice Tests vs Real Learning',
    missionGoal: 'A computer model scored 99% in testing but failed on real customers. Your mission: Catch the over-memorized model!',
    steps: [
      { num: '1', text: 'Click "Level 3 (Degree 9)". Look at the training error: It is super low (MSE 4.2). It seems perfect!' },
      { num: '2', text: 'Now check the "Unseen Test Data" score: The error explodes to 480+! The model memorized random noise.' },
      { num: '3', text: 'Click "Level 2 (Degree 3)". Notice it gives the lowest error on unseen test customers (~26) without wild swings.' },
      { num: '4', text: 'Save your clue and Submit your verdict recommending the balanced Level 2 model!' }
    ]
  },
  4: {
    glossaryKey: 'bias_variance',
    simpleTitle: 'Too Stubborn vs Too Sensitive (The Balance Game)',
    missionGoal: 'A loan approval model changes its mind every month. Your mission: Find the sweet spot balance!',
    steps: [
      { num: '1', text: 'Click "Model 1 (Rigid Straight Line)". It is too stubborn (High Bias) and misses the real curved trend completely.' },
      { num: '2', text: 'Click "Model 3 (Wild Flexible)". The lines wiggle all over the place across different months (High Variance).' },
      { num: '3', text: 'Drag the Credit Score slider to test applicant risk. Notice how Model 2 gives stable, fair predictions with the lowest total error!' },
      { num: '4', text: 'Submit your verdict to recommend Model 2 for fair loan approvals!' }
    ]
  },
  5: {
    glossaryKey: 'clustering',
    simpleTitle: 'The Shopping Tribes: Grouping Customers Naturally',
    missionGoal: 'We have 180 customers with no labels. Your mission: Find natural shopper groups and fix the big number trap!',
    steps: [
      { num: '1', text: 'Notice the clusters on the scatter plot. Change the number of groups (K) to 3 or 4 to see how they split.' },
      { num: '2', text: 'Look at "Feature Scaling". Turn it OFF to "Raw Unscaled". Notice how $10,000 spending dwarfs 10 monthly visits!' },
      { num: '3', text: 'Turn Feature Scaling back ON. Both spending and visits are now compared fairly on equal ground.' },
      { num: '4', text: 'Give your clusters fun names in the cards below, collect your clue, and Submit your verdict!' }
    ]
  }
};

export function CaseWorkspace({
  caseId,
  notebookClues = [],
  onAddNotebookClue,
  onNavigateBoard,
  onCaseSolved,
}) {
  const [isConclusionOpen, setIsConclusionOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [showHowToPlayCase, setShowHowToPlayCase] = useState(true);

  const caseData = CASES.find((c) => c.id === caseId) || CASES[0];
  const guide = CASE_GUIDES[caseId] || CASE_GUIDES[1];

  const handleOpenConclusion = () => {
    sound.playClick();
    setIsConclusionOpen(true);
  };

  const handleCollectClue = (text) => {
    onAddNotebookClue({
      id: Date.now(),
      caseId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  // Render the specific interactive mechanic view for this case
  const renderCaseView = () => {
    switch (caseId) {
      case 1:
        return <Case1SamplingView onCollectClue={handleCollectClue} />;
      case 2:
        return <Case2CorrelationView onCollectClue={handleCollectClue} />;
      case 3:
        return <Case3OverfittingView onCollectClue={handleCollectClue} />;
      case 4:
        return <Case4BiasVarianceView onCollectClue={handleCollectClue} />;
      case 5:
        return <Case5ClusteringView onCollectClue={handleCollectClue} />;
      default:
        return <Case1SamplingView onCollectClue={handleCollectClue} />;
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Workspace Subheader Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          onClick={() => {
            sound.playClick();
            onNavigateBoard();
          }}
          className="btn btn-secondary btn-sm"
        >
          <ChevronLeft size={16} />
          <span>Exit to Case Board</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={() => {
              sound.playClick();
              setIsGlossaryOpen(true);
            }}
            className="btn btn-secondary btn-sm"
            style={{ borderColor: '#06b6d4', color: '#22d3ee' }}
          >
            <BookOpen size={14} color="#22d3ee" />
            <span>📖 Explain in Plain English</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsNotebookOpen(!isNotebookOpen);
            }}
            className="btn btn-secondary btn-sm"
          >
            <BookOpen size={14} color="#f59e0b" />
            <span>Detective Clues ({notebookClues.length})</span>
          </button>

          <button
            onClick={handleOpenConclusion}
            className="btn btn-primary btn-sm glow-cyan"
            style={{ fontWeight: 700 }}
          >
            <Sparkles size={14} />
            <span>Submit Case Verdict</span>
          </button>
        </div>
      </div>

      {/* Case Brief Banner with Simple English Subtitle */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #0e1c33 0%, #0c1527 100%)',
          borderColor: '#1e3456',
          padding: '1.35rem 1.75rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <span className="badge badge-cyan">CASE #{String(caseData.id).padStart(2, '0')}</span>
              <span className="badge badge-amber">{caseData.concept}</span>
              <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
                💡 In Plain English: {guide.simpleTitle}
              </span>
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
              {caseData.title}
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              {caseData.brief}
            </p>
          </div>

          {/* Quick Objective Callout */}
          <div style={{ background: '#08101d', border: '1px solid #1c2b42', padding: '0.85rem 1rem', borderRadius: '10px', minWidth: '240px' }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Lightbulb size={14} color="#38bdf8" /> Initial Detective Question
            </div>
            <div style={{ fontSize: '0.775rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.4 }}>
              "{caseData.initialHypothesisPrompt}"
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step "How to Solve this Case" Mission Card */}
      <div
        className="card"
        style={{
          background: '#091526',
          border: '1px solid #1d4ed8',
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={18} color="#60a5fa" />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#93c5fd' }}>
              🎮 Quick Game Guide: How to solve this case
            </span>
          </div>
          <button
            onClick={() => setShowHowToPlayCase(!showHowToPlayCase)}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: '#60a5fa' }}
          >
            {showHowToPlayCase ? 'Hide Instructions' : 'Show Instructions'}
          </button>
        </div>

        <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.825rem', color: '#bfdbfe', fontWeight: 600 }}>
          🎯 {guide.missionGoal}
        </p>

        {showHowToPlayCase && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {guide.steps.map((st) => (
              <div
                key={st.num}
                style={{
                  background: '#0d1b30',
                  border: '1px solid #1e3a5f',
                  borderRadius: '8px',
                  padding: '0.65rem 0.8rem',
                  display: 'flex',
                  gap: '0.6rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {st.num}
                </div>
                <div style={{ fontSize: '0.775rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  {st.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Workspace Layout (Investigation Area + Detective Notebook) */}
      <div className="workspace-layout">
        {/* Left Column: Interactive Case View */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {renderCaseView()}

          {/* Bottom Action Bar */}
          <div className="card" style={{ background: '#0e172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f1f5f9' }}>
                Ready to submit your deduction?
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Make sure you've tested the buttons above and noticed the difference in numbers!
              </div>
            </div>

            <button onClick={handleOpenConclusion} className="btn btn-primary glow-cyan" style={{ padding: '0.7rem 1.6rem', fontWeight: 800 }}>
              <span>Submit Final Case Verdict</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Column: Detective Notebook Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Big Prominent "Ready to Solve?" Callout Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #102a45 0%, #0d1e34 100%)',
              border: '2px solid #06b6d4',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: '0 0 25px rgba(6, 182, 212, 0.25)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>⚖️</div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.35rem' }}>
              Finished Testing Data?
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45, marginBottom: '0.85rem' }}>
              Submit your conclusion to complete this case, earn your badge, and unlock the next case!
            </p>
            <button
              onClick={handleOpenConclusion}
              className="btn btn-primary glow-cyan"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontWeight: 800,
                fontSize: '0.9rem',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
              }}
            >
              <Sparkles size={16} />
              <span>Submit Case Verdict & Next ➔</span>
            </button>
          </div>

          <DetectiveNotebook
            clues={notebookClues}
            onAddNote={onAddNotebookClue}
            activeCaseId={caseId}
          />
        </div>
      </div>

      {/* Conclusion Modal */}
      <ConclusionModal
        isOpen={isConclusionOpen}
        onClose={() => setIsConclusionOpen(false)}
        caseData={caseData}
        onCaseSolved={onCaseSolved}
      />

      {/* Plain English Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        highlightKey={guide.glossaryKey}
      />
    </div>
  );
}

