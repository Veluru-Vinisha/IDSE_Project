import React, { useState } from 'react';
import { BookOpen, Bookmark, Plus, FileText, CheckCircle, Tag } from 'lucide-react';
import { sound } from '../utils/sound.js';

export function DetectiveNotebook({
  clues = [],
  onAddNote,
  activeCaseId,
}) {
  const [activeTab, setActiveTab] = useState('clues');
  const [customNote, setCustomNote] = useState('');

  const glossary = [
    {
      term: 'Population vs Sample',
      def: 'The population is the complete group of interest; a sample is a measurable subset observed to make inferences about the whole.',
    },
    {
      term: 'Selection Bias',
      def: 'Systematic error occurring when some members of the population have a lower or higher chance of being sampled than others.',
    },
    {
      term: 'Pearson Correlation (r)',
      def: 'A measure between -1 and +1 indicating the strength and direction of linear association between two continuous variables.',
    },
    {
      term: 'Confounding Variable',
      def: 'An unmeasured third variable that correlates with both the independent and dependent variables, creating a false causal appearance.',
    },
    {
      term: 'Training Set vs Test Set',
      def: 'Training data is used to fit model weights; holdout test data is kept strictly unseen to measure real-world generalization.',
    },
    {
      term: 'Overfitting',
      def: 'When a model learns the random noise and idiosyncrasies of training data, causing high training accuracy but terrible test performance.',
    },
    {
      term: 'Underfitting',
      def: 'When a model is too rigid to capture the genuine underlying patterns in data, resulting in poor performance on both train and test sets.',
    },
    {
      term: 'Bias-Variance Tradeoff',
      def: 'Total error is the sum of Bias² (rigid assumptions) + Variance (sensitivity to training data variation) + Irreducible Noise.',
    },
    {
      term: 'K-Means Clustering',
      def: 'An unsupervised algorithm that iteratively groups points into K clusters by minimizing Euclidean distance to cluster centroids.',
    },
    {
      term: 'Feature Normalization',
      def: 'Scaling features to a common scale (e.g. Z-score) so features with large numerical magnitudes do not artificially dominate distance calculations.',
    },
  ];

  const handleAddCustomNote = (e) => {
    e.preventDefault();
    if (!customNote.trim()) return;
    sound.playClue();
    onAddNote({
      id: Date.now(),
      caseId: activeCaseId,
      text: customNote.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setCustomNote('');
  };

  return (
    <div className="card" style={{ background: '#0e172a', borderColor: '#223452', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Notebook Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} color="#f59e0b" />
          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f8fafc' }}>
            Detective Notebook
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('clues');
            }}
            className={`btn btn-sm ${activeTab === 'clues' ? 'btn-accent' : 'btn-ghost'}`}
            style={{ fontSize: '0.725rem', padding: '0.25rem 0.55rem' }}
          >
            Clues ({clues.length})
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('glossary');
            }}
            className={`btn btn-sm ${activeTab === 'glossary' ? 'btn-accent' : 'btn-ghost'}`}
            style={{ fontSize: '0.725rem', padding: '0.25rem 0.55rem' }}
          >
            Glossary
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '420px', paddingRight: '0.25rem' }}>
        {activeTab === 'clues' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {clues.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', padding: '2rem 1rem' }}>
                <Bookmark size={24} style={{ margin: '0 auto 0.5rem auto', opacity: 0.5 }} />
                No clues collected yet. Run experiments or click "Collect Evidence" to add notes here!
              </div>
            ) : (
              clues.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: '#131e33',
                    border: '1px solid #1e2d47',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.8rem',
                    lineHeight: 1.45,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#38bdf8', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    <span>EVIDENCE ENTRY</span>
                    <span className="mono">{c.timestamp || 'Logged'}</span>
                  </div>
                  <div style={{ color: '#e2e8f0' }}>{c.text}</div>
                </div>
              ))
            )}

            {/* Custom Note Input */}
            <form onSubmit={handleAddCustomNote} style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem' }}>
              <input
                type="text"
                placeholder="Log observation..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="text-input"
                style={{ fontSize: '0.775rem', padding: '0.4rem 0.6rem' }}
              />
              <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem' }}>
                <Plus size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {glossary.map((g, idx) => (
              <div key={idx} style={{ background: '#0a1222', border: '1px solid #1c2b42', borderRadius: '8px', padding: '0.65rem', fontSize: '0.775rem' }}>
                <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: '0.2rem' }}>{g.term}</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.4 }}>{g.def}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
