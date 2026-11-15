import React, { useState } from 'react';
import { Compass, Database, Sliders, CheckCircle, ArrowRight, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound.js';

export function BriefingModal({ isOpen, onClose, onStartFirstCase }) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Welcome to the Agency, Detective!',
      subtitle: 'Your Role & Mission',
      icon: Shield,
      color: '#06b6d4',
      content: (
        <div>
          <p style={{ marginBottom: '0.85rem' }}>
            Organizations, media outlets, and automated systems present summaries and charts every day. But numbers can deceive—through biased sampling, false correlation, or brittle machine learning models.
          </p>
          <p>
            Your mission as a <strong>Data Detective</strong> is to inspect raw evidence, perform genuine statistical calculations, uncover lurking anomalies, and submit evidence-backed conclusions.
          </p>
        </div>
      ),
    },
    {
      title: 'Interactive Tools & Evidence Area',
      subtitle: 'How to Investigate',
      icon: Sliders,
      color: '#f59e0b',
      content: (
        <div>
          <p style={{ marginBottom: '0.85rem' }}>
            Inside every case workspace, you will find:
          </p>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1' }}>
            <li><strong>Dataset Table:</strong> Filter, search, and sort individual observations.</li>
            <li><strong>Interactive Visualizations:</strong> Real-time scatter plots, regression fits, and cluster maps.</li>
            <li><strong>Investigation Controls:</strong> Sliders for sample sizes, model complexity toggles, and feature selectors.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Evidence, Scoring & Badges',
      subtitle: 'Discovery & Progress',
      icon: Database,
      color: '#10b981',
      content: (
        <div>
          <p style={{ marginBottom: '0.85rem' }}>
            You earn investigation points by running tests, comparing outcomes, and taking notes in your <strong>Detective Notebook</strong>.
          </p>
          <p style={{ marginBottom: '0.85rem' }}>
            Solving a case awards a prestigious <strong>Detective Badge</strong> and unlocks the next mystery on the Agency Case Board.
          </p>
          <div style={{ background: '#0a1424', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #10b981', fontSize: '0.825rem' }}>
            💡 <strong>Mistakes are part of discovery!</strong> If an initial hypothesis fails, the agency encourages you to tweak parameters, retry, and observe why the math behaves that way.
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const IconComponent = currentStep.icon;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ maxWidth: '640px', padding: '2rem' }}
      >
        {/* Progress Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {steps.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === step ? '28px' : '10px',
                height: '8px',
                borderRadius: '4px',
                background: idx === step ? '#06b6d4' : '#1e293b',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Step Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: `rgba(${currentStep.color === '#06b6d4' ? '6, 182, 212' : currentStep.color === '#f59e0b' ? '245, 158, 11' : '16, 185, 129'}, 0.15)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${currentStep.color}`,
            }}
          >
            <IconComponent size={28} color={currentStep.color} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: currentStep.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {currentStep.subtitle} (Step {step + 1} of {steps.length})
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
              {currentStep.title}
            </h2>
          </div>
        </div>

        {/* Step Body */}
        <div style={{ fontSize: '0.925rem', color: '#cbd5e1', minHeight: '160px', lineHeight: 1.6 }}>
          {currentStep.content}
        </div>

        {/* Navigation Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.75rem', borderTop: '1px solid #1e293b', paddingTop: '1.25rem' }}>
          {step > 0 ? (
            <button
              onClick={() => {
                sound.playClick();
                setStep((s) => s - 1);
              }}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={() => {
                sound.playClick();
                setStep((s) => s + 1);
              }}
              className="btn btn-primary"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playSuccess();
                onStartFirstCase();
              }}
              className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
            >
              <Sparkles size={18} />
              <span>Start First Case</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
