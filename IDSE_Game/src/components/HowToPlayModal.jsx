import React from 'react';
import { X, BookOpen, Compass, Award, BarChart2, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound.js';

export function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px', padding: '1.75rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen size={24} color="#06b6d4" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
              Detective Field Manual — How to Play
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.3rem' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
          {/* Section 1: The Detective Role */}
          <div style={{ background: '#131e33', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #06b6d4' }}>
            <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Compass size={18} /> 1. Your Role as a Data Detective
            </h3>
            <p>
              Welcome to the Agency! As an investigator, your duty is to audit deceptive claims, uncover lurking variables, diagnose algorithmic failures, and find natural patterns in raw datasets. You do NOT just answer multiple-choice questions—you actively manipulate data and observe how mathematical computations respond.
            </p>
          </div>

          {/* Section 2: The 8-Step Investigation Loop */}
          <div>
            <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BarChart2 size={18} /> 2. The 8-Step Learning Loop
            </h3>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#94a3b8' }}>
              <li><strong style={{ color: '#f1f5f9' }}>Receive the Mystery:</strong> Read the initial story scenario and suspect claim.</li>
              <li><strong style={{ color: '#f1f5f9' }}>Inspect Evidence:</strong> Browse the raw dataset records and interactive charts.</li>
              <li><strong style={{ color: '#f1f5f9' }}>Formulate Decision:</strong> Choose sampling methods, select features, or adjust model complexity.</li>
              <li><strong style={{ color: '#f1f5f9' }}>Run Analysis:</strong> Execute genuine real-time mathematical computations.</li>
              <li><strong style={{ color: '#f1f5f9' }}>Observe Consequence:</strong> Watch how the charts, error metrics, and sample compositions update.</li>
              <li><strong style={{ color: '#f1f5f9' }}>Reflect:</strong> Record observations into your Detective Notebook.</li>
              <li><strong style={{ color: '#f1f5f9' }}>Submit Conclusion:</strong> Make an evidence-backed final case judgment.</li>
              <li><strong style={{ color: '#f1f5f9' }}>Debrief & Transfer:</strong> Read the deep-dive explanation and solve the transfer challenge.</li>
            </ol>
          </div>

          {/* Section 3: The 5 Core Concepts */}
          <div style={{ background: '#0a1222', padding: '1rem', borderRadius: '10px', border: '1px solid #1c2b42' }}>
            <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#34d399', marginBottom: '0.65rem' }}>
              3. The 5 Mystery Cases & Concepts
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ border: '1px solid #1e293b', padding: '0.6rem', borderRadius: '6px' }}>
                <strong style={{ color: '#38bdf8' }}>Case 01: Sampling Bias</strong>
                <p style={{ color: '#94a3b8', marginTop: '0.2rem' }}>Learn why convenience sampling distorts estimates, even with huge sample sizes.</p>
              </div>
              <div style={{ border: '1px solid #1e293b', padding: '0.6rem', borderRadius: '6px' }}>
                <strong style={{ color: '#fbbf24' }}>Case 02: Correlation vs Causation</strong>
                <p style={{ color: '#94a3b8', marginTop: '0.2rem' }}>Discover confounding lurking variables that create false causal illusions.</p>
              </div>
              <div style={{ border: '1px solid #1e293b', padding: '0.6rem', borderRadius: '6px' }}>
                <strong style={{ color: '#ec4899' }}>Case 03: Overfitting & Underfitting</strong>
                <p style={{ color: '#94a3b8', marginTop: '0.2rem' }}>Discover why 99% training accuracy can be a trap on unseen test data.</p>
              </div>
              <div style={{ border: '1px solid #1e293b', padding: '0.6rem', borderRadius: '6px' }}>
                <strong style={{ color: '#a78bfa' }}>Case 04: Bias-Variance Tradeoff</strong>
                <p style={{ color: '#94a3b8', marginTop: '0.2rem' }}>Decompose model error across resampled cohorts into bias and variance.</p>
              </div>
              <div style={{ border: '1px solid #1e293b', padding: '0.6rem', borderRadius: '6px' }}>
                <strong style={{ color: '#34d399' }}>Case 05: K-Means Clustering</strong>
                <p style={{ color: '#94a3b8', marginTop: '0.2rem' }}>Group unlabeled customers and discover why feature scaling is critical.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Scoring and Badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111d33', padding: '0.85rem 1rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} color="#fbbf24" />
              <span>Earn 5 unique Detective Badges & up to 500 investigation points!</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="btn btn-primary btn-sm"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
