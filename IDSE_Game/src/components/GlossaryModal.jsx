import React from 'react';
import { X, BookOpen, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';
import { GLOSSARY } from '../data/glossary.js';
import { sound } from '../utils/sound.js';

export function GlossaryModal({ isOpen, onClose, highlightKey }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px', padding: '1.75rem', maxHeight: '85vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: '#0e7490', padding: '0.4rem', borderRadius: '8px' }}>
              <BookOpen size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Plain-English Detective Glossary
              </h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>
                No complicated math jargon—just simple real-life analogies!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn btn-ghost btn-sm"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(GLOSSARY).map(([key, item]) => {
            const isTarget = highlightKey === key;
            return (
              <div
                key={key}
                style={{
                  background: isTarget ? '#0d2238' : '#0e172a',
                  border: isTarget ? '2px solid #06b6d4' : '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  boxShadow: isTarget ? '0 0 20px rgba(6, 182, 212, 0.2)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={16} color={isTarget ? '#22d3ee' : '#38bdf8'} />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: isTarget ? '#38bdf8' : '#f1f5f9', margin: 0 }}>
                    {item.term}
                  </h3>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.6rem', fontWeight: 500 }}>
                  👉 <strong>What it means:</strong> {item.short}
                </p>

                {/* Real Life Analogy Box */}
                <div style={{ background: '#131e33', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '0.6rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                    <Lightbulb size={14} /> REAL LIFE STORY:
                  </div>
                  <div style={{ fontSize: '0.825rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                    {item.analogy}
                  </div>
                </div>

                {/* Quick Rules */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {item.simpleRules.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.775rem', color: '#94a3b8' }}>
                      <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn btn-primary"
            style={{ padding: '0.6rem 2rem' }}
          >
            Got it, back to the Case!
          </button>
        </div>
      </div>
    </div>
  );
}
