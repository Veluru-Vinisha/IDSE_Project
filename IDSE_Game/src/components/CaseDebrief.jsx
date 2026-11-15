import React, { useEffect } from 'react';
import { CASES } from '../data/casesData.js';
import { Award, CheckCircle2, RotateCcw, ArrowRight, BookOpen, Sparkles, Compass, Lightbulb, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound.js';

export function CaseDebrief({
  caseId,
  result,
  onReplayCase,
  onNextCase,
  onNavigateBoard,
}) {
  const caseData = CASES.find((c) => c.id === caseId) || CASES[0];
  const debrief = caseData.debrief;
  const nextCaseExists = caseId < CASES.length;

  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.3 },
      });
    } catch {}
  }, []);

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Debrief Header Banner with Cheering & Animation */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #102a45 0%, #0d1e34 100%)',
          borderColor: '#10b981',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 35px rgba(16, 185, 129, 0.25)',
        }}
      >
        <div
          style={{
            width: '74px',
            height: '74px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
            animation: 'modalEnter 0.4s ease',
          }}
        >
          <Trophy size={40} color="#ffffff" />
        </div>

        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
          🎉 FANTASTIC JOB, DETECTIVE! CASE {caseData.id} SOLVED! 🎉
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          {caseData.title}
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto' }}>
          You cracked the mystery and proved what the real numbers were hiding!
        </p>

        {/* Score & Badge Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <div className="badge badge-emerald" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: 700 }}>
            <Award size={18} /> Official Badge: {caseData.badge}
          </div>
          <div className="badge badge-amber" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: 700 }}>
            <Sparkles size={18} /> +{result?.score || 100} Detective Points
          </div>
        </div>

        {/* Big Cheering Next Case Button */}
        {nextCaseExists && (
          <div style={{ marginTop: '1.75rem' }}>
            <button
              onClick={() => {
                sound.playSuccess();
                onNextCase(caseId + 1);
              }}
              className="btn btn-primary glow-cyan"
              style={{
                fontSize: '1.1rem',
                padding: '0.85rem 2.2rem',
                fontWeight: 900,
                borderRadius: '12px',
                display: 'inline-flex',
                boxShadow: '0 0 25px rgba(6, 182, 212, 0.5)',
              }}
            >
              <span>Ready for Next Mystery? Open Case {caseId + 1}!</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Deep-Dive: What Just Happened? */}
      <div className="card" style={{ background: '#0e172a', marginBottom: '1.5rem', borderLeft: '4px solid #06b6d4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <BookOpen size={20} color="#06b6d4" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
            What Just Happened? — {debrief.conceptName}
          </h2>
        </div>
        <p style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          {debrief.whatJustHappened}
        </p>

        {/* Key Takeaways */}
        <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
          Core Data Science Principles
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {debrief.keyTakeaways.map((item, idx) => (
            <div key={idx} style={{ background: '#131e33', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #1c2b42', fontSize: '0.825rem', color: '#e2e8f0' }}>
              • {item}
            </div>
          ))}
        </div>
      </div>

      {/* "Try Changing This..." Experiment Sandbox Prompt */}
      <div className="card" style={{ background: '#111d33', border: '1px dashed #f59e0b', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Lightbulb size={20} color="#fbbf24" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fbbf24' }}>
            Try Changing This... Replay Experiment
          </h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          {debrief.experimentPrompt}
        </p>
      </div>

      {/* Action Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => {
              sound.playClick();
              onReplayCase(caseId);
            }}
            className="btn btn-secondary"
          >
            <RotateCcw size={16} />
            <span>Replay This Case</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateBoard();
            }}
            className="btn btn-secondary"
          >
            <span>Case Board</span>
          </button>
        </div>

        {nextCaseExists ? (
          <button
            onClick={() => {
              sound.playSuccess();
              onNextCase(caseId + 1);
            }}
            className="btn btn-primary"
            style={{ fontSize: '0.95rem', padding: '0.7rem 1.5rem' }}
          >
            <span>Investigate Case {caseId + 1}</span>
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => {
              sound.playSuccess();
              onNavigateBoard();
            }}
            className="btn btn-accent glow-amber"
          >
            <Sparkles size={18} />
            <span>All Cases Solved! View Final Report</span>
          </button>
        )}
      </div>
    </div>
  );
}
