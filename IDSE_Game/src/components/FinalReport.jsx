import React from 'react';
import { CASES } from '../data/casesData.js';
import { Award, Shield, CheckCircle2, RotateCcw, BookOpen, Sparkles, BarChart2, Star } from 'lucide-react';
import { sound } from '../utils/sound.js';

export function FinalReport({
  completedCases = {},
  totalScore = 0,
  badges = [],
  onReplayCase,
  onOpenHowToPlay,
  onNavigateBoard,
}) {
  const totalCasesCount = CASES.length;
  const solvedCount = Object.keys(completedCases).length;
  const percentComplete = Math.round((solvedCount / totalCasesCount) * 100);

  // Determine detective rank based on score
  let rank = 'Junior Detective';
  let rankColor = '#38bdf8';
  if (totalScore >= 450) {
    rank = 'Chief Data Inquisitor';
    rankColor = '#fbbf24';
  } else if (totalScore >= 350) {
    rank = 'Senior Statistical Detective';
    rankColor = '#34d399';
  } else if (totalScore >= 200) {
    rank = 'Data Detective Specialist';
    rankColor = '#06b6d4';
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Agency Dossier Header */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #10213d 0%, #0d1728 100%)',
          borderColor: '#22d3ee',
          padding: '2.25rem',
          textAlign: 'center',
          marginBottom: '1.75rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
          }}
        >
          <Shield size={38} color="#ffffff" />
        </div>

        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          OFFICIAL PERFORMANCE AUDIT
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Final Detective Performance Report
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
          Comprehensive summary of investigated mystery dossiers, empirical deductions, and mastered Data Science concepts.
        </p>

        {/* Rank & Score Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.75rem' }}>
          <div style={{ background: '#0a1222', padding: '1rem', borderRadius: '12px', border: '1px solid #1c2b42' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>OFFICIAL DETECTIVE RANK</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: rankColor, margin: '0.25rem 0' }}>
              {rank}
            </div>
            <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Based on deduction accuracy</div>
          </div>

          <div style={{ background: '#0a1222', padding: '1rem', borderRadius: '12px', border: '1px solid #1c2b42' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>TOTAL INVESTIGATION SCORE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', margin: '0.25rem 0' }} className="mono">
              {totalScore} pts
            </div>
            <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Evidence & Transfer points</div>
          </div>

          <div style={{ background: '#0a1222', padding: '1rem', borderRadius: '12px', border: '1px solid #1c2b42' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>SOLVED MYSTERIES</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '0.25rem 0' }} className="mono">
              {solvedCount} / {totalCasesCount}
            </div>
            <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{percentComplete}% Case Completion</div>
          </div>
        </div>
      </div>

      {/* Badges Earned Section */}
      <div className="card" style={{ background: '#0e172a', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Award size={20} color="#fbbf24" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
            Awarded Specialization Badges ({badges.length} Earned)
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {CASES.map((c) => {
            const hasBadge = badges.includes(c.badge);
            return (
              <div
                key={c.id}
                style={{
                  background: hasBadge ? 'rgba(6, 182, 212, 0.12)' : '#101a2b',
                  border: `1px solid ${hasBadge ? '#06b6d4' : '#1e2b40'}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  opacity: hasBadge ? 1 : 0.5,
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: hasBadge ? 'linear-gradient(135deg, #06b6d4, #0284c7)' : '#19263a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Award size={22} color={hasBadge ? '#ffffff' : '#64748b'} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: hasBadge ? '#f8fafc' : '#94a3b8' }}>
                    {c.badge}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: '#38bdf8' }}>{c.conceptShort}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concepts Mastery Breakdown */}
      <div className="card" style={{ background: '#0e172a', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <BarChart2 size={20} color="#06b6d4" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
            Concepts Mastered Through Hands-On Investigation
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {CASES.map((c) => {
            const isCompleted = !!completedCases[c.id];
            return (
              <div
                key={c.id}
                style={{
                  background: '#131e33',
                  border: '1px solid #1e2b42',
                  borderRadius: '8px',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color={isCompleted ? '#10b981' : '#64748b'} />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f1f5f9' }}>
                      Case {c.id}: {c.concept}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: '#94a3b8', marginTop: '0.2rem', paddingLeft: '1.5rem' }}>
                    {c.tagline}
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    onReplayCase(c.id);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <RotateCcw size={12} />
                  <span>Replay Case {c.id}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          onClick={() => {
            sound.playClick();
            onOpenHowToPlay();
          }}
          className="btn btn-secondary"
        >
          <BookOpen size={16} />
          <span>View Detective Glossary & Field Manual</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigateBoard();
          }}
          className="btn btn-primary"
        >
          <span>Return to Agency Case Board</span>
        </button>
      </div>
    </div>
  );
}
