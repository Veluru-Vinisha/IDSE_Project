import React, { useState } from 'react';
import { Volume2, VolumeX, HelpCircle, RotateCcw, ShieldCheck, Award, BookOpen } from 'lucide-react';
import { sound } from '../utils/sound.js';

export function Header({
  score,
  completedCount,
  totalCases,
  currentScreen,
  onNavigateHome,
  onNavigateBoard,
  onOpenHowToPlay,
  onOpenGlossary,
  onResetProgress,
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all agency investigation records and start fresh?')) {
      onResetProgress();
      sound.playWarning();
    }
  };

  return (
    <header className="agency-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          title="Data Detective Home"
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
              fontSize: '1.2rem',
            }}
          >
            🔍
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#f8fafc' }}>
              DATA DETECTIVE
            </div>
            <div style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 600, letterSpacing: '0.04em' }}>
              AGENCY HEADQUARTERS
            </div>
          </div>
        </button>

        {currentScreen !== 'landing' && (
          <button
            onClick={() => {
              sound.playClick();
              onNavigateBoard();
            }}
            className="btn btn-secondary btn-sm"
            style={{ marginLeft: '0.5rem' }}
          >
            Case Board
          </button>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Progress Tracker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0a1222', padding: '0.35rem 0.8rem', borderRadius: '8px', border: '1px solid #1c2b42' }}>
          <ShieldCheck size={16} color="#06b6d4" />
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Cases Solved:</span>
          <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#f1f5f9' }} className="mono">
            {completedCount}/{totalCases}
          </span>
        </div>

        {/* Score Meter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: '#0a1222', padding: '0.35rem 0.8rem', borderRadius: '8px', border: '1px solid #1c2b42' }}>
          <Award size={16} color="#f59e0b" />
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Score:</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24' }} className="mono">
            {score} pts
          </span>
        </div>

        {/* Plain English Dictionary / Jargon Buster */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenGlossary();
          }}
          className="btn btn-secondary btn-sm"
          title="Simple Plain-English Explanations"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderColor: '#06b6d4', color: '#22d3ee' }}
        >
          <BookOpen size={14} color="#22d3ee" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>📖 Simple Words</span>
        </button>

        {/* How to Play */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenHowToPlay();
          }}
          className="btn btn-ghost btn-sm"
          title="How to Play & Field Guide"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <HelpCircle size={16} />
          <span style={{ fontSize: '0.78rem' }}>How to Play</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={handleToggleSound}
          className="btn btn-ghost btn-sm"
          style={{ padding: '0.4rem', color: isMuted ? '#64748b' : '#38bdf8' }}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Reset Game */}
        <button
          onClick={handleReset}
          className="btn btn-ghost btn-sm"
          style={{ padding: '0.4rem', color: '#64748b' }}
          title="Reset All Progress"
          aria-label="Reset Progress"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </header>
  );
}
