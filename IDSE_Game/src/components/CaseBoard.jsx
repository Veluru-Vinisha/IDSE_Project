import React from 'react';
import { CASES } from '../data/casesData.js';
import { Lock, CheckCircle2, ChevronRight, Award, Compass, FileText, Sparkles, Play, Star, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound.js';

// Case-specific playful theme styling
const CASE_THEMES = {
  1: {
    accent: '#06b6d4',
    accentLight: '#22d3ee',
    bgGradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
    borderGlow: '0 0 25px rgba(6, 182, 212, 0.25)',
    emoji: '🏢',
    difficulty: 'Level 1: Novice',
  },
  2: {
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
    borderGlow: '0 0 25px rgba(245, 158, 11, 0.25)',
    emoji: '🍦',
    difficulty: 'Level 2: Apprentice',
  },
  3: {
    accent: '#ec4899',
    accentLight: '#f472b6',
    bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
    borderGlow: '0 0 25px rgba(236, 72, 153, 0.25)',
    emoji: '🚀',
    difficulty: 'Level 3: Expert',
  },
  4: {
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
    borderGlow: '0 0 25px rgba(139, 92, 246, 0.25)',
    emoji: '⚖️',
    difficulty: 'Level 4: Master',
  },
  5: {
    accent: '#10b981',
    accentLight: '#34d399',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
    borderGlow: '0 0 25px rgba(16, 185, 129, 0.25)',
    emoji: '🛍️',
    difficulty: 'Level 5: Grandmaster',
  },
};

export function CaseBoard({
  unlockedCases = [1],
  completedCases = {},
  onSelectCase,
  onViewFinalReport,
}) {
  const allSolved = CASES.every((c) => completedCases[c.id]);
  const solvedCount = Object.keys(completedCases).length;

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Board Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #101c36 0%, #0c1424 100%)',
          border: '1px solid #1e365d',
          borderRadius: '20px',
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
              MISSION CONTROL
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              • Progress: {solvedCount} of 5 Mysteries Cracked
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.03em', margin: 0 }}>
            Choose Your Mystery Case
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Click any unlocked case below to launch the interactive investigation lab!
          </p>
        </div>

        {allSolved && (
          <button
            onClick={() => {
              sound.playSuccess();
              onViewFinalReport();
            }}
            className="btn btn-accent glow-amber"
            style={{ padding: '0.85rem 1.8rem', fontSize: '1rem', fontWeight: 900, borderRadius: '12px' }}
          >
            <Sparkles size={20} />
            <span>View Agency Final Trophy Report</span>
          </button>
        )}
      </div>

      {/* Grid of Case Cards */}
      <div className="grid-cases">
        {CASES.map((c) => {
          const isUnlocked = unlockedCases.includes(c.id);
          const isSolved = !!completedCases[c.id];
          const scoreEarned = completedCases[c.id]?.score || 0;
          const theme = CASE_THEMES[c.id] || CASE_THEMES[1];

          return (
            <div
              key={c.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: isUnlocked ? 1 : 0.6,
                borderColor: isSolved ? '#10b981' : isUnlocked ? theme.accent : '#1e293b',
                background: isSolved
                  ? 'linear-gradient(180deg, #0e2229 0%, #0a171d 100%)'
                  : isUnlocked
                  ? theme.bgGradient
                  : '#0b1220',
                boxShadow: isUnlocked ? theme.borderGlow : 'none',
                transform: isUnlocked ? 'scale(1)' : 'scale(0.98)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: '1.4rem',
                borderRadius: '18px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle Ambient Icon Backdrop */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  fontSize: '4.5rem',
                  opacity: 0.12,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {theme.emoji}
              </div>

              <div>
                {/* Status Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.35rem' }}>{theme.emoji}</span>
                    <span
                      className={`badge ${
                        isSolved ? 'badge-emerald' : isUnlocked ? 'badge-cyan' : 'badge-rose'
                      }`}
                      style={{ fontWeight: 800 }}
                    >
                      {isSolved ? (
                        <>
                          <CheckCircle2 size={12} /> Solved
                        </>
                      ) : isUnlocked ? (
                        'Ready to Play'
                      ) : (
                        <>
                          <Lock size={12} /> Locked
                        </>
                      )}
                    </span>
                  </div>

                  <span className="mono" style={{ fontSize: '0.75rem', color: theme.accentLight, fontWeight: 700 }}>
                    CASE #{String(c.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Case Title */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc', marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '0.825rem', color: theme.accentLight, fontWeight: 600, fontStyle: 'italic', marginBottom: '0.75rem' }}>
                  "{c.tagline}"
                </p>

                <p style={{ fontSize: '0.825rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1.1rem' }}>
                  {c.brief.slice(0, 140)}...
                </p>

                {/* Concept Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>TOPIC:</span>
                  <span className="badge badge-amber" style={{ fontSize: '0.725rem', fontWeight: 700 }}>
                    {c.conceptShort}
                  </span>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {isSolved ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Award size={20} color="#10b981" />
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399' }}>
                        Badge: {c.badge}
                      </div>
                      <div className="mono" style={{ fontSize: '0.725rem', color: '#94a3b8' }}>
                        +{scoreEarned} pts
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                    Reward: 100 pts + Badge
                  </div>
                )}

                {isUnlocked ? (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectCase(c.id);
                    }}
                    className={`btn ${isSolved ? 'btn-secondary' : 'btn-primary'} btn-sm glow-cyan`}
                    style={{ fontWeight: 800, padding: '0.55rem 1.15rem' }}
                  >
                    <span>{isSolved ? 'Re-examine ➔' : 'Play Case ➔'}</span>
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.75rem' }}>
                    <Lock size={14} />
                    <span>Solve Case {c.id - 1} First</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
